/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import UserHeader from '@/components/dashboard/UserHeader'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface Props {
    params: {
        coin: string
    }
}

interface Stock {
    stock: {
        x: number,
        y: number
    }[]
    symbol: string;
}

interface AllCoins {
    name: string
    full_name: string
    image: string
    coin: string
}
const Page = ({ params }: Props) => {

    const { coin } = params

    const [stock, setStock] = useState<Stock>({ stock: [{ x: 0, y: 0 }], symbol: '' })

    const [allCoins, setAllCoins] = useState<AllCoins[]>([])

    const [buyWith, setBuyWith] = useState('USDT')

    const [coinDetails, setCoinDetails] = useState<{
        data: {
            PRICE: string
            CHANGE24HOUR: string
            HIGHDAY: string
            OPENDAY: string
            MKTCAP: string
            LOWDAY: string
        }
        image: string;
    }>({ data: { PRICE: '', CHANGE24HOUR: '', HIGHDAY: '', OPENDAY: '', LOWDAY: '', MKTCAP: '' }, image: '' })

    const fetchBuy = async () => {

        try {

            const { data } = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${buyWith}&tsyms=USD`)

        } catch (error) {
            console.error(error);

        }

    }

    const get1DayStock = async () => {

        try {

            setStock({ stock: [{ x: 0, y: 0 }], symbol: '' })

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}histoday?fsym=${coin}&tsym=USD&limit=729`)

            const formatData = data.Data.Data.map((item: any) => ({
                x: item.time * 1000,
                y: [item.open, item.high, item.low, item.close]
            }))

            const stockData: Stock = {
                stock: formatData,
                symbol: coin
            }

            setStock(stockData)

        } catch (error) {

            console.error(error);

        }
    }

    const getCoinDetails = async () => {

        try {

            const { data } = await axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coin}&tsyms=USD`)

            const coinDetails: any = Object.values(data.DISPLAY)

            const coinData = {
                data: coinDetails[0].USD,
                image: `https://www.cryptocompare.com${coinDetails[0].USD.IMAGEURL}`,
            }

            setCoinDetails(coinData)

        } catch (error) {

            console.error(error);

        }
    }

    const fetchAllCoins = async () => {

        try {

            const { data } = await axios.get('https://min-api.cryptocompare.com/data/all/coinlist')

            const coins = Object.values(data.Data).map((item: any) => ({
                coin: item.Name,
                name: item.CoinName,
                full_name: item.FullName,
                image: `https://www.cryptocompare.com${item.ImageUrl}`
            }))

            setAllCoins(coins)

            localStorage.setItem('coins', JSON.stringify(coins))


        } catch (error) {

            console.error(error);

        }
    }


    useEffect(() => {

        getCoinDetails()

        get1DayStock()

        const allCoins = localStorage.getItem('coins')

        if (allCoins) {

            setAllCoins(JSON.parse(allCoins))

        } else {

            fetchAllCoins()

        }

    }, [])

    useEffect(() => {

        fetchBuy()


    }, [buyWith])

    return (
        <div>
            <UserHeader />
            <div className='text-slate-200 pt-24 px-5 sm:px-10 md:px-16 lg:px-24 xl:px-36 2xl:px-44 flex flex-col w-screen'>
                <div className='px-5 xl:px-10 py-5 border-x border-slate-800 w-full flex items-center gap-20'>
                    <div className='flex items-center gap-3'>
                        {coinDetails.image ? <img src={coinDetails.image} alt={coin} width={30} height={30} />
                            : <div className='w-[30px] h-[30px] rounded-full bg-slate-700 animate-pulse'></div>
                        }
                        <span className='font-medium text-white uppercase'>{coin}</span>
                    </div>
                    <ul className='flex items-center justify-between w-full text-sm'>
                        {coinDetails.data.PRICE ?
                            <li>Price: {coinDetails.data.PRICE}</li>
                            :
                            <li className='h-6 w-32 bg-slate-700 rounded-3xl animate-pulse'></li>
                        }
                        {coinDetails.data.HIGHDAY ?
                            <li>High: {coinDetails.data.HIGHDAY}</li>
                            :
                            <li className='h-6 w-32 bg-slate-700 rounded-3xl animate-pulse'></li>
                        }
                        {coinDetails.data.LOWDAY ?
                            <li>Low: {coinDetails.data.LOWDAY}</li>
                            :
                            <li className='h-6 w-32 bg-slate-700 rounded-3xl animate-pulse'></li>
                        }
                        {coinDetails.data.CHANGE24HOUR ?
                            <li>24h Change: <span className={`${coinDetails.data.CHANGE24HOUR.includes('-') ? ' text-red-500' : 'text-green-500'}`}>{coinDetails.data.CHANGE24HOUR}</span></li>
                            :
                            <li className='h-6 w-36 bg-slate-700 rounded-3xl animate-pulse'></li>
                        }
                        {coinDetails.data.MKTCAP ?
                            <li>Market Cap: {coinDetails.data.MKTCAP}</li>
                            :
                            <li className='h-6 w-36 bg-slate-700 rounded-3xl animate-pulse'></li>
                        }
                    </ul>
                </div>
            </div>
            <div>

            </div>

        </div>
    )
}

export default Page