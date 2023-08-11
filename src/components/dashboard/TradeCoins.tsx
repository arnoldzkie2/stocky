/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
interface TradeCoins {
    name: string
    data: {
        close: number
        high: number
        open: number
        low: number
    }
    image: string
    coin_name: string
}

interface CoinSearch {
    name: string
    full_name: string
    image: string
    coin: string
}

const TradeCoins = () => {

    const [listCoins, setListCoins] = useState(['BTC', 'ETH', 'BNB', 'XRP', 'SOl', 'SHIB', 'DOGE', 'APT', 'LTC', 'MATIC', 'OXT', 'BNT'])

    const [allCoins, setAllCoins] = useState<CoinSearch[]>([])

    const [searchQuery, setSearchQuery] = useState('')

    const [currentCoins, setCurrentCoins] = useState<TradeCoins[]>([])

    const filterCoins = allCoins.filter((item) => item.coin.toUpperCase().includes(searchQuery.toUpperCase()))

    const fetchAllCoins = async () => {

        try {

            const { data } = await axios.get('https://min-api.cryptocompare.com/data/all/coinlist')

            const coins = Object.values(data.Data).map((item: any) => ({
                coin: item.Name,
                name: item.CoinName,
                full_name: item.FullName,
                image: `https://www.cryptocompare.com${item.ImageUrl}`
            }))

            localStorage.setItem('coins', JSON.stringify(coins))

        } catch (error) {

            console.error(error);

        }
    }
    const fetchCoinPrice = async () => {

        try {

            const res = await Promise.all(listCoins.map(async (item) => {

                const { data } = await axios.get(`https://min-api.cryptocompare.com/data/v2/histohour?fsym=${item}&tsym=USD&limit=1`)

                const image = await axios.get(`https://data-api.cryptocompare.com/asset/v1/data/by/symbol?asset_symbol=${item}`)

                const coinData = {
                    name: item,
                    data: data.Data.Data[1],
                    image: image.data.Data.LOGO_URL,
                    coin_name: image.data.Data.NAME
                }
                return coinData
            }))

            localStorage.setItem('current', JSON.stringify(res))

            setCurrentCoins(res)

        } catch (error) {

            console.error(error);

        }
    }

    useEffect(() => {

        const current = localStorage.getItem('current')

        if (current) {

            setCurrentCoins(JSON.parse(current))

        } else {

            fetchCoinPrice()

        }

        const coins = localStorage.getItem('coins')

        if (coins) {

            setAllCoins(JSON.parse(coins))

        } else {

            fetchAllCoins()

        }


    }, [])

    useEffect(() => {

        fetchCoinPrice()

    }, [listCoins])

    return (
        <div className='px-5 sm:px-10 md:px-16 lg:px-24 w-screen xl:px-36 2xl:px-44 pt-24 flex flex-col items-center'>
            <div className='w-full my-10 flex items-center'>
                <div className='relative w-full'>
                    <input type="text" id='search' placeholder='Search Coins' value={searchQuery} onChange={(e: any) => setSearchQuery(e.target.value)} className='px-4 py-2 bg-slate-800 text-slate-200 w-full outline-none' />
                    <label htmlFor="search cursor-pointer">
                        <FontAwesomeIcon icon={faSearch} className='absolute right-5 text-slate-200 top-2.5 w-5 h-5 hover:text-white' />
                    </label>
                    <ul className={`bg-slate-800 p-5 top-10 ${filterCoins.length > 0 ? 'h-96' : ''} z-40 overflow-y-auto absolute w-full ${searchQuery ? 'flex' : 'hidden'} flex-col gap-4`}>
                        {filterCoins.length > 0 ? filterCoins.map((item) => (
                            <li key={item.coin} className='flex items-center gap-4 text-slate-300 text-sm cursor-pointer hover:text-white'>
                                <img src={item.image} alt={item.name} width={20} height={20} loading='lazy' />
                                {item.full_name}
                            </li>
                        )) :
                            <li className='text-white flex items-center gap-4'>
                                <FontAwesomeIcon icon={faSpinner} className='animate-spin' />
                                Processing...
                            </li>
                        }
                    </ul>
                </div>
            </div>

            <div className="relative overflow-x-auto w-full">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                high
                            </th>
                            <th scope="col" className="px-6 py-3">
                                low
                            </th>
                            <th scope="col" className="px-6 py-3">
                                open
                            </th>
                            <th scope="col" className="px-6 py-3">
                                close
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCoins.length > 0 ? currentCoins.map(item => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item.coin_name}>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3 whitespace-nowrap dark:text-white">
                                    <img src={item.image} alt={item.name} width={30} height={30} />
                                    <div>{item.coin_name}</div>
                                    <div className='text-slate-300'>{item.name}</div>
                                </th>
                                <td className="px-6 py-4">
                                    ${item.data.close}
                                </td>
                                <td className="px-6 py-4">
                                    ${item.data.high}
                                </td>
                                <td className="px-6 py-4">
                                    ${item.data.low}
                                </td>
                                <td className="px-6 py-4">
                                    ${item.data.open}
                                </td>
                                <td className="px-6 py-4">
                                    ${item.data.close}
                                </td>
                            </tr>
                        ))
                            :
                            <tr>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default TradeCoins