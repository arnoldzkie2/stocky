/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
interface TradeCoins {
    coin: string
    data: {
        PRICE: string
        CHANGE24HOUR: string
        HIGHDAY: string
        OPENDAY: string
        MKTCAP: string
        LOWDAY: string
    }
    image: string
}

interface CoinSearch {
    name: string
    full_name: string
    image: string
    coin: string
}

const TradeCoins = () => {

    const [listCoins, setListCoins] = useState(['BTC', 'ETH', 'BNB', 'XRP', 'SOl', 'SHIB', 'DOGE', 'APT', 'LTC', 'MATIC', 'OXT', 'BNT'])

    const [skeleton, setSkeleton] = useState(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])

    const [allCoins, setAllCoins] = useState<CoinSearch[]>([])

    const [searchQuery, setSearchQuery] = useState('')

    const [coinsSearch, setCoinsSearch] = useState('')

    const [currentCoins, setCurrentCoins] = useState<TradeCoins[]>([])

    const filterCoins = allCoins.filter((item) => item.coin.toUpperCase().includes(searchQuery.toUpperCase())).slice(0, 50)

    const itemsPerPage = 10

    const [currentPage, setCurrentPage] = useState(1)

    const end = currentPage * itemsPerPage;

    const start = end - itemsPerPage;

    const filterCurrentCoins = currentCoins.filter(item => item.coin.toUpperCase().includes(coinsSearch.toUpperCase()))

    const itemsOnCurrentPage = filterCurrentCoins.slice(start, end);

    const getTotalPages = () => Math.ceil(currentCoins.length / itemsPerPage)

    const handlePageChange = (pageNumber: number) => {

        setCurrentPage(pageNumber);

    };

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

    const addCoin = async (item: string) => {

        if (!listCoins.includes(item)) {

            setListCoins(prevState => [...prevState, item]);

            fetchSingleCoin(item)

            setSearchQuery('');

        } else {

            setSearchQuery('')

        }

    }

    const fetchSingleCoin = async (item: string) => {

        try {

            const { data } = await axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${item}&tsyms=USD`)

            const coinDetails: any = Object.values(data.DISPLAY)

            const coinData = {
                coin: item,
                data: coinDetails[0].USD,
                image: `https://www.cryptocompare.com${coinDetails[0].USD.IMAGEURL}`,
            }

            if (coinData.data.CHANGE24HOUR) {

                alert(`${item} Added to list.`)
                setCurrentCoins(prevState => [...prevState, coinData])

            } else {

                alert(`Something went wrong fetching ${item} data.`)
            }


        } catch (error) {

            console.error(error);

        }

    }
    const fetchCoinPrice = async () => {

        try {

            const res = await Promise.all(listCoins.map(async (item) => {

                const { data } = await axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${item}&tsyms=USD`)

                const coinDetails: any = Object.values(data.DISPLAY)

                const coinData = {
                    coin: item,
                    data: coinDetails[0].USD,
                    image: `https://www.cryptocompare.com${coinDetails[0].USD.IMAGEURL}`,
                }

                return coinData

            }))

            setCurrentCoins(res)

        } catch (error) {

            console.error(error);

        }
    }

    useEffect(() => {

        fetchCoinPrice()

        const coins = localStorage.getItem('coins')

        if (coins) {

            setAllCoins(JSON.parse(coins))

        } else {

            fetchAllCoins()

        }

    }, [])

    return (
        <div className='px-5 sm:px-10 md:px-16 lg:px-24 w-screen h-screen xl:px-36 2xl:px-44 pt-16 flex flex-col items-center'>
            <div className='w-full py-7 flex items-center px-5 xl:px-10 border-x border-slate-800'>
                <div className='w-full flex items-center justify-between gap-10'>
                    <div className='w-1/4 relative'>
                        <input type="text" id='search-coin' placeholder='Search Coins' value={coinsSearch} onChange={(e: any) => setCoinsSearch(e.target.value)} className='px-4 py-2 bg-slate-800 text-slate-200 w-full outline-none' />
                        <label htmlFor="search-coin" className='cursor-pointer'>
                            <FontAwesomeIcon icon={faSearch} className='absolute right-5 text-slate-200 top-2.5 w-5 h-5 hover:text-white' />
                        </label>
                    </div>
                    <div className='w-1/4 relative'>
                        <input type="text" id='search' placeholder='Add Coins' value={searchQuery} onChange={(e: any) => setSearchQuery(e.target.value)} className='px-4 py-2 bg-slate-800 text-slate-200 w-full outline-none' />
                        <label htmlFor="search" className='cursor-pointer'>
                            <FontAwesomeIcon icon={faSearch} className='absolute right-5 text-slate-200 top-2.5 w-5 h-5 hover:text-white' />
                        </label>
                        <ul className={`bg-slate-800 p-5 top-10 ${filterCoins.length > 0 ? 'h-96' : ''} z-40 overflow-y-auto absolute w-full ${searchQuery ? 'flex' : 'hidden'} flex-col gap-4`}>
                            {allCoins.length > 0 && filterCoins.length > 0 ? filterCoins.map((item) => (
                                <li key={item.coin} onClick={() => addCoin(item.coin)} className='flex items-center gap-4 text-slate-300 text-sm cursor-pointer hover:text-white'>
                                    <img src={item.image} alt={item.name} width={20} height={20} loading='lazy' />
                                    {item.full_name}
                                </li>
                            )) : filterCoins.length < 1 && allCoins.length > 0 ? <li className='text-white flex items-center gap-4'>
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

            <div className="relative overflow-x-auto w-full px-5 xl:px-10 border-x border-slate-800">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-slate-200 bg-gray-50 dark:bg-slate-700 dark:text-white">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                High
                            </th>
                            <th scope="col" className="px-6 py-3">
                                24h Change
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Market Cap
                            </th>
                            <th scope="col" className="px-6 py-3">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemsOnCurrentPage.length > 0 ? itemsOnCurrentPage.map(item => (
                            <tr className="bg-white border-b text-slate-200 dark:bg-gray-800 dark:border-gray-700 text-xs" key={item.coin}>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3 whitespace-nowrap dark:text-white">
                                    <img src={item.image} alt={item.coin} width={30} height={30} />
                                    <div className='text-white flex items-center'>{item.coin}</div>
                                </th>
                                <td className="px-6 py-4">
                                    <div className='h-4'>
                                        {item.data.PRICE}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className='h-4'>
                                        {item.data.HIGHDAY}
                                    </div>
                                </td>
                                <td className="px-6 py-4 flex items-center gap-2" style={{ color: item.data.CHANGE24HOUR.includes("-") ? "#ef4444" : "#059669" }}>
                                    <div className='h-4'>
                                        {item.data.CHANGE24HOUR}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className='h-4'>
                                        {item.data.MKTCAP}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <Link href={`/trade/${item.coin}`} className='text-yellow-400 hover:text-yellow-300'>Trade</Link>
                                </td>
                            </tr>
                        ))
                            : currentCoins.length > 0 && coinsSearch ?
                                <tr className="bg-white border-b text-slate-200 dark:bg-gray-800 dark:border-gray-700 text-xs">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3 whitespace-nowrap dark:text-white">
                                        <div className='text-white flex items-center'>No</div>
                                    </th>
                                    <td className="px-6 py-4">
                                        Coins
                                    </td>
                                    <td className="px-6 py-4">
                                        Found
                                    </td>
                                    <td className="px-6 py-4 flex items-center gap-2">
                                        In
                                    </td>
                                    <td className="px-6 py-4">
                                        Search
                                    </td>
                                    <td className="px-6 py-4">
                                        Result
                                    </td>
                                </tr> :
                                skeleton.map(item => (
                                    <tr className="bg-white border-b text-slate-200 dark:bg-gray-800 dark:border-gray-700" key={item}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3 whitespace-nowrap dark:text-white">
                                            <div className='w-16 h-[34px] rounded-3xl bg-slate-600 animate-pulse'></div>
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className='w-24 h-[34px] rounded-3xl bg-slate-600 animate-pulse'></div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className='w-24 h-[34px] rounded-3xl bg-slate-600 animate-pulse'></div>
                                        </td>
                                        <td className="px-6 py-4 flex items-center gap-2">
                                            <div className='w-16 h-[34px] rounded-3xl bg-slate-600 animate-pulse'></div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className='w-24 h-[34px] rounded-3xl bg-slate-600 animate-pulse'></div>
                                        </td>
                                        <td className="px-6 py-4 h-[34px] text-lg">
                                            <FontAwesomeIcon icon={faSpinner} width={16} height={16} className='animate-spin' />
                                        </td>
                                    </tr>

                                ))
                        }
                    </tbody>
                </table>
            </div>
            <div className='text-slate-300 flex justify-end items-center gap-3 px-5 xl:px-10 border-x py-6 border-slate-800 w-full'>
                <button
                    className={`text-white px-5`}
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </button>
                <span>{currentPage} / {getTotalPages()}</span>
                <button
                    className={`text-white px-5`}
                    disabled={end >= currentCoins.length}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div >
    )
}

export default TradeCoins