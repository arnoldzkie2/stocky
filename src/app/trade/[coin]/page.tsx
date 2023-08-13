/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import UserHeader from '@/components/dashboard/UserHeader'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

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

    const router = useRouter()

    const { coin } = params

    const [stock, setStock] = useState<Stock>({ stock: [{ x: 0, y: 0 }], symbol: '' })

    const [buyWith, setBuyWith] = useState('USDT')

    const [allCoins, setAllCoins] = useState<AllCoins[]>([])

    const [buyWithSearchQuery, setBuyWithSearchQuery] = useState('')

    const [coinSearchQuery, setCoinSearchQuery] = useState('')

    const filterBuyWithAllCoins = allCoins.map((item) => ({
        ...item, full_name: `${coin.toUpperCase()} / ${item.coin}`
    }))

    const filterAllCoins = allCoins.map((item) => ({
        ...item, full_name: `${item.coin} / ${buyWith.toUpperCase()}`
    }))

    const filterCoins = filterAllCoins.filter((item) => item.coin.toUpperCase().includes(coinSearchQuery.toUpperCase()) && item.coin !== buyWith.toUpperCase()).slice(0, 50)

    const filterBuyWithCoins = filterBuyWithAllCoins.filter((item) => item.coin.toUpperCase().includes(buyWithSearchQuery.toUpperCase()) && item.coin !== coin.toUpperCase()).slice(0, 50)

    const [buyPrice, setBuyPrice] = useState(0)

    const [coinPrice, setCoinPrice] = useState(0)

    const [buyForm, setBuyForm] = useState({
        amount: 0,
        total: 0
    })

    const price = coinPrice * buyPrice

    const [sellForm, setSellForm] = useState({
        amount: 0,
        total: 0
    })

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

            setBuyPrice(data.USD)

        } catch (error) {
            console.error(error);

        }

    }

    const get1DayStock = async () => {

        try {

            setStock({ stock: [{ x: 0, y: 0 }], symbol: '' })

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}histoday?fsym=${coin.toUpperCase()}&tsym=USD&limit=729`)

            const formatData = data.Data.Data.map((item: any) => ({
                x: item.time * 1000,
                y: [item.open, item.high, item.low, item.close]
            }))

            const stockData: Stock = {
                stock: formatData,
                symbol: coin.toUpperCase()
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

            const coinPriceData: any = Object.values(data.RAW)

            setCoinPrice(coinPriceData[0].USD.PRICE)

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

        const buyWithCoin = localStorage.getItem('buyWith')

        if (buyWithCoin) {

            setBuyWith(buyWithCoin)

        }

    }, [])

    useEffect(() => {

        fetchBuy()

        localStorage.setItem('buyWith', buyWith)

    }, [buyWith])

    useEffect(() => {

        setBuyForm(prevState => ({ ...prevState, total: buyForm.amount * price }))
        setSellForm(prevState => ({ ...prevState, total: sellForm.amount * price }))

    }, [buyForm, sellForm])

    return (
        <>
            <UserHeader />
            <div className='text-slate-200 pt-16 px-5 sm:px-10 md:px-16 lg:px-24 xl:px-36 2xl:px-44 flex flex-col w-screen'>
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
                            <li className='h-6 w-40 bg-slate-700 rounded-3xl animate-pulse'></li>
                        }
                        {coinDetails.data.MKTCAP ?
                            <li>Market Cap: {coinDetails.data.MKTCAP}</li>
                            :
                            <li className='h-6 w-40 bg-slate-700 rounded-3xl animate-pulse'></li>
                        }
                    </ul>
                </div>

                <div className='flex w-full px-5 2xl:px-10 py-5 border-x border-slate-800 gap-10'>

                    <div className='flex w-[64%] flex-col gap-4'>
                        <div className=' w-full h-[37rem] text-slate-900 border border-slate-800'>
                            {stock?.symbol && stock.symbol.length > 0 ? <Chart options={{
                                xaxis: {
                                    type: 'datetime',
                                    labels: {
                                        datetimeUTC: false,
                                        style: {
                                            colors: '#FFF'
                                        }
                                    }
                                },
                                yaxis: {
                                    labels: {
                                        style: {
                                            colors: '#FFF'
                                        }
                                    },
                                },
                                tooltip: {
                                    x: {
                                        format: 'MMM dd HH:mm'
                                    }
                                },
                                chart: {
                                    id: stock.symbol,
                                    animations: {
                                        speed: 1000
                                    },
                                },
                                plotOptions: {
                                    candlestick: {
                                        colors: {
                                            upward: '#26C281',
                                            downward: '#ed3419'
                                        }
                                    }
                                },
                                title: {
                                    text: stock?.symbol,
                                    align: 'center',
                                    style: {
                                        fontSize: '20px',
                                        color: '#FFF'
                                    }
                                },
                            }
                            }
                                series={[
                                    {
                                        data: stock.stock,
                                        name: stock.symbol
                                    }
                                ]}
                                type='candlestick'
                            /> :
                                <div className='w-full flex items-center justify-center h-[15rem] sm:h-[25rem] md:h-[32rem] lg:h-[15rem] 2xl:h-[37rem] animate-pulse bg-slate-900 border border-slate-800'>
                                    <div className='text-white flex items-center gap-3'>
                                        <div className='bg-none border-2 w-6 h-6 relative rounded-full animate-spin flex items-center justify-center'>
                                            <div className='absolute bg-slate-950 top-0 w-4 h-4 rounded-none'></div>
                                        </div>
                                        Processing...
                                    </div>
                                </div>
                            }
                        </div>

                        <div className='flex items-center w-full justify-between gap-10 text-slate-300 text-sm'>

                            <div className='flex w-full flex-col gap-2'>
                                <div className='flex items-center w-full'>
                                    <div className='w-full relative'>
                                        <label htmlFor="price" className='absolute top-[5px] left-3 text-slate-400'>Price</label>
                                        <input type="text" value={price ? price.toFixed(2) : ''} readOnly className='outline-none text-right px-20 py-1 w-full bg-slate-900 border border-slate-800' />
                                        <div className='absolute right-3 top-[5px]'>{buyWith}</div>
                                    </div>
                                </div>

                                <div className='flex items-center w-full'>
                                    <div className='w-full relative'>
                                        <label htmlFor="price" className='top-[5px] absolute left-3 text-slate-400'>Amount</label>
                                        <input
                                            type="text"
                                            className='appearance-none text-right outline-none px-20 py-1 w-full bg-slate-900 border border-slate-800'
                                            value={buyForm.amount ? buyForm.amount : ''}
                                            onChange={(e) => {
                                                const input = e.target.value;
                                                const numericInput = input.replace(/[^0-9.]/g, '')
                                                setBuyForm(prevState => ({ ...prevState, amount: Number(numericInput) }));
                                            }}
                                        />
                                        <div className='absolute right-3 top-[5px] uppercase'>{coin}</div>
                                    </div>
                                </div>

                                <div className='flex items-center w-full'>
                                    <div className='w-full relative'>
                                        <label htmlFor="price" className='left-3 top-[5px] absolute text-slate-400'>Total</label>
                                        <input type="text" readOnly className='outline-none px-20 text-right py-1 w-full bg-slate-900 border border-slate-800' value={buyForm.total ? buyForm.total : ''} />
                                        <div className='absolute right-3 top-[5px] uppercase'>{buyWith}</div>
                                    </div>
                                </div>
                                <button className='w-full mt-2.5 hover:bg-green-500 h-10 bg-green-600 uppercase'>BUY {coin}</button>
                            </div>

                            <div className='flex w-full flex-col gap-2'>
                                <div className='flex items-center w-full'>
                                    <div className='w-full relative'>
                                        <label htmlFor="price" className='absolute top-[5px] left-3 text-slate-400'>Price</label>
                                        <input type="text" value={price ? price.toFixed(2) : ''} readOnly className='outline-none text-right px-20 py-1 w-full bg-slate-900 border border-slate-800' />
                                        <div className='absolute right-3 top-[5px]'>{buyWith}</div>
                                    </div>
                                </div>

                                <div className='flex items-center w-full'>
                                    <div className='w-full relative'>
                                        <label htmlFor="price" className='top-[5px] absolute left-3 text-slate-400'>Amount</label>
                                        <input
                                            type="text"
                                            className='appearance-none text-right outline-none px-20 py-1 w-full bg-slate-900 border border-slate-800'
                                            value={sellForm.amount ? sellForm.amount : ''}
                                            onChange={(e) => {
                                                const input = e.target.value;
                                                const numericInput = input.replace(/[^0-9.]/g, '')
                                                setSellForm(prevState => ({ ...prevState, amount: Number(numericInput) }));
                                            }}
                                        />
                                        <div className='absolute right-3 top-[5px] uppercase'>{coin}</div>
                                    </div>
                                </div>

                                <div className='flex items-center w-full'>
                                    <div className='w-full relative'>
                                        <label htmlFor="price" className='left-3 top-[5px] absolute text-slate-400'>Total</label>
                                        <input type="text" readOnly className='outline-none px-20 text-right py-1 w-full bg-slate-900 border border-slate-800' value={sellForm.total ? sellForm.total : ''} />
                                        <div className='absolute right-3 top-[5px] uppercase'>{buyWith}</div>
                                    </div>
                                </div>
                                <button className='w-full mt-2.5 hover:bg-red-500 h-10 bg-red-600 uppercase'>SELL {coin}</button>
                            </div>

                        </div>
                    </div>

                    <div className='w-[34%]'>
                        <div className='w-full flex items-center gap-4 text-sm'>
                            <div className='w-full relative'>
                                <input type="text" id='search' placeholder={coin.toUpperCase()} value={coinSearchQuery} onChange={(e: any) => setCoinSearchQuery(e.target.value)} className='px-4 py-2 bg-slate-900 border border-slate-800 text-slate-200 w-full outline-none' />
                                <ul className={`bg-slate-800 p-5 top-10 ${filterAllCoins.length > 0 ? 'h-96' : ''} z-40 overflow-y-auto absolute w-full ${coinSearchQuery ? 'flex' : 'hidden'} flex-col gap-4`}>
                                    {allCoins.length > 0 && filterAllCoins.length > 0 ? filterAllCoins.map((item) => (
                                        <li key={item.coin} onClick={() => {
                                            router.push(`/trade/${item.coin.toUpperCase()}`)
                                        }} className='flex items-center gap-4 text-slate-300 text-sm cursor-pointer hover:text-white'>
                                            <img src={item.image} alt={item.name} width={20} height={20} loading='lazy' />
                                            {item.full_name}
                                        </li>
                                    )) : filterAllCoins.length < 1 && allCoins.length > 0 ? <li className='text-white flex items-center gap-4'>
                                        No coins found.
                                    </li>
                                        :
                                        <li className='text-white flex items-center gap-4'>
                                            <FontAwesomeIcon icon={faSpinner} className='animate-spin' width={16} height={16} />
                                            Searching...
                                        </li>
                                    }
                                </ul>
                            </div>
                            <div className='text-slate-300 gap-3 w-1/2 uppercase'>
                                {coin} / {buyWith}
                            </div>
                            <div className='w-full relative'>
                                <input type="text" id='search' placeholder={buyWith} value={buyWithSearchQuery} onChange={(e: any) => setBuyWithSearchQuery(e.target.value)} className='px-4 py-2 bg-slate-900 border border-slate-800 text-slate-200 w-full outline-none' />
                                <ul className={`bg-slate-800 p-5 top-10 ${filterBuyWithCoins.length > 0 ? 'h-96' : ''} z-40 overflow-y-auto absolute w-full ${buyWithSearchQuery ? 'flex' : 'hidden'} flex-col gap-4`}>
                                    {allCoins.length > 0 && filterBuyWithCoins.length > 0 ? filterBuyWithCoins.map((item) => (
                                        <li key={item.coin} onClick={() => {
                                            setBuyWith(item.coin.toUpperCase())
                                            setBuyWithSearchQuery('')
                                        }} className='flex items-center gap-4 text-slate-300 text-sm cursor-pointer hover:text-white'>
                                            <img src={item.image} alt={item.name} width={20} height={20} loading='lazy' />
                                            {item.full_name}
                                        </li>
                                    )) : filterBuyWithCoins.length < 1 && allCoins.length > 0 ? <li className='text-white flex items-center gap-4'>
                                        No coins found.
                                    </li>
                                        :
                                        <li className='text-white flex items-center gap-4'>
                                            <FontAwesomeIcon icon={faSpinner} className='animate-spin' width={16} height={16} />
                                            Searching...
                                        </li>
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Page