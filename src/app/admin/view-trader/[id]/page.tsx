/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { faCircleUser, faEnvelope, faKey, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import UserCoins from '@/components/profile/UserCoins'
import { Trades } from '@/app/trade/[coin]/page'
import AdminHeader from '@/components/admin/AdminHeader'
import { useRouter } from 'next/navigation'

interface AllCoins {
    coin: string
    image: string
    amount: number
    value: number
}

interface Props {

    params: {
        id: string
    }

}

interface User {
    id: string
    name: string
    email: string
    password: string
    trades: Trades[]
    coins: {
        user_id: string
        id: string
        coin: string
        amount: number
    }
}

const Page = ({ params }: Props) => {

    const router = useRouter()

    const [user, setUser] = useState({ name: 'Arnold Nillas', token: '', isAdmin: false })

    const [currentUser, setCurrentUser] = useState<User>()

    const [skeleton, setSkeleton] = useState(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])

    const [searchQuery, setSearchQuery] = useState('')

    const [totalBalance, setTotalBalance] = useState(0)

    const [userCoins, setUserCoins] = useState<{ coin: string, amount: number }[]>([
        { coin: 'BTC', amount: 5.23 },
        { coin: 'ETH', amount: 10.25 },
        { coin: 'ADA', amount: 500 },
        { coin: 'XRP', amount: 1500 },
        { coin: 'LTC', amount: 20 },
        { coin: 'DOGE', amount: 7500 },
        { coin: 'USDT', amount: 10000 },
        { coin: 'BNB', amount: 42.7 },
        { coin: 'SOL', amount: 180 },
        { coin: 'DOT', amount: 320 },
        { coin: 'AVAX', amount: 75 },
        { coin: 'MATIC', amount: 890 },
        { coin: 'UNI', amount: 53 },
        { coin: 'LINK', amount: 240 },
        { coin: 'XMR', amount: 15.8 }
    ]);

    const [myTrades, setMyTrades] = useState<Trades[]>([
        {
            "id": 1,
            "user_id": 123,
            "using_coin": "USDT",
            "coin": "BTC",
            "using_coin_price": 0.9989,
            "coin_price": 29339.03,
            "amount": 0.75,
            "total": 21937.73856275,
            "type": "buy",
            "created_at": "2023-08-14T10:00:00Z",
            "updated_at": "2023-08-14T10:00:00Z",
            price: 29357.331374
        },
        {
            "id": 2,
            "user_id": 123,
            "using_coin": "USDT",
            "coin": "BTC",
            "using_coin_price": 0.9989,
            "coin_price": 29339.03,
            "amount": 0.75,
            "total": 21937.73856275,
            "type": "buy",
            "created_at": "2023-08-14T10:00:00Z",
            "updated_at": "2023-08-14T10:00:00Z",
            price: 29357.331374
        },
        {
            "id": 3,
            "user_id": 123,
            "using_coin": "USDT",
            "coin": "BTC",
            "using_coin_price": 0.9989,
            "coin_price": 29339.03,
            "amount": 0.75,
            "total": 21937.73856275,
            "type": "sell",
            "created_at": "2023-08-14T10:00:00Z",
            "updated_at": "2023-08-14T10:00:00Z",
            price: 29357.331374
        },
        {
            "id": 4,
            "user_id": 123,
            "using_coin": "USDT",
            "coin": "BTC",
            "using_coin_price": 0.9989,
            "coin_price": 29339.03,
            "amount": 0.75,
            "total": 21937.73856275,
            "type": "buy",
            "created_at": "2023-08-14T10:00:00Z",
            "updated_at": "2023-08-14T10:00:00Z",
            price: 29357.331374
        },
        {
            "id": 5,
            "user_id": 123,
            "using_coin": "USDT",
            "coin": "BTC",
            "using_coin_price": 0.9989,
            "coin_price": 29339.03,
            "amount": 0.75,
            "total": 21937.73856275,
            "type": "sell",
            "created_at": "2023-08-14T10:00:00Z",
            "updated_at": "2023-08-14T10:00:00Z",
            price: 29357.331374
        },
        {
            "id": 6,
            "user_id": 123,
            "using_coin": "USDT",
            "coin": "BTC",
            "using_coin_price": 0.9989,
            "coin_price": 29339.03,
            "amount": 0.75,
            "total": 21937.73856275,
            "type": "buy",
            "created_at": "2023-08-14T10:00:00Z",
            "updated_at": "2023-08-14T10:00:00Z",
            price: 29357.331374
        },
        {
            "id": 7,
            "user_id": 123,
            "using_coin": "USDT",
            "coin": "BTC",
            "using_coin_price": 0.9989,
            "coin_price": 29339.03,
            "amount": 0.75,
            "total": 21937.73856275,
            "type": "buy",
            "created_at": "2023-08-14T10:00:00Z",
            "updated_at": "2023-08-14T10:00:00Z",
            price: 29357.331374
        },
        {
            "id": 8,
            "user_id": 123,
            "using_coin": "USDT",
            "coin": "BTC",
            "using_coin_price": 0.9989,
            "coin_price": 29339.03,
            "amount": 0.75,
            "total": 21937.73856275,
            "type": "sell",
            "created_at": "2023-08-14T10:00:00Z",
            "updated_at": "2023-08-14T10:00:00Z",
            price: 29357.331374
        },
        {
            "id": 9,
            "user_id": 123,
            "using_coin": "USDT",
            "coin": "BTC",
            "using_coin_price": 0.9989,
            "coin_price": 29339.03,
            "amount": 0.75,
            "total": 21937.73856275,
            "type": "buy",
            "created_at": "2023-08-14T10:00:00Z",
            "updated_at": "2023-08-14T10:00:00Z",
            price: 29357.331374
        },
        {
            "id": 10,
            "user_id": 123,
            "using_coin": "USDT",
            "coin": "BTC",
            "using_coin_price": 0.9989,
            "coin_price": 29339.03,
            "amount": 0.75,
            "total": 21937.73856275,
            "type": "sell",
            "created_at": "2023-08-14T10:00:00Z",
            "updated_at": "2023-08-14T10:00:00Z",
            price: 29357.331374
        },
    ])

    const [modifiedCoins, setModifiedCoins] = useState<AllCoins[]>([])

    const filterCoins = modifiedCoins.filter((item) => item.coin.toUpperCase().includes(searchQuery.toUpperCase()))

    const itemsPerPage = 10

    const [currentPage, setCurrentPage] = useState(1)

    const end = currentPage * itemsPerPage;

    const start = end - itemsPerPage;

    const itemsOnCurrentPage = filterCoins.slice(start, end);

    const getTotalPages = () => Math.ceil(modifiedCoins.length / itemsPerPage)

    const handlePageChange = (pageNumber: number) => {

        setCurrentPage(pageNumber);

    };

    const [depositData, setDepositData] = useState({ coin: '', amount: 0 })


    const fetchCoinPrice = async () => {

        try {

            const res = await Promise.all(userCoins.map(async (item) => {

                const { data } = await axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${item.coin}&tsyms=USD&api_key=fa1ddd2aaeb250a7c16e7cbd9b7ccae1cd95f700c4354b015bdc1787ae8a4e59`)

                const coinDetails: any = Object.values(data.RAW)

                const totalValue = item.amount * coinDetails[0].USD.PRICE

                const coinData = {
                    coin: item.coin,
                    amount: item.amount,
                    value: totalValue,
                    image: `https://www.cryptocompare.com${coinDetails[0].USD.IMAGEURL}`,
                }

                return coinData

            }))

            setModifiedCoins(res)

        } catch (error) {

            console.error(error);

        }
    }

    useEffect(() => {

        const currentUser = localStorage.getItem('user')

        if (currentUser) {

            const user = JSON.parse(currentUser)

            if (!user.isAdmin) {

                router.push('/dashboard')

            } else {

                setUser(user)
            }

        } else {

            // router.push('/login')

        }

    }, [])

    useEffect(() => {

        fetchCoinPrice()

    }, [userCoins])

    useEffect(() => {

        const balance = modifiedCoins.reduce((accumulator, item) => accumulator + item.value, 0);

        setTotalBalance(balance)

    }, [modifiedCoins])

    return (
        <div className='overflow-x-hidden'>
            <AdminHeader user={user} />
            <div className='px-5 sm:px-10 md:px-16 lg:px-24 w-screen h-screen xl:px-36 2xl:px-44 pt-16 flex flex-col text-slate-300'>

                <div className='lg:px-36 md:px-20 md:border-x md:border-slate-800 xl:px-52 w-full py-5 md:py-10 flex flex-col'>

                    <div className='flex w-full items-center justify-between gap-x-16 gap-y-5 flex-wrap'>

                        <div className='flex items-center gap-3'>
                            <FontAwesomeIcon icon={faCircleUser} width={30} height={30} className='w-[30px] h-[30px]' />
                            {currentUser?.name ? <p className='text-white font-medium'>{currentUser?.name}</p>
                                : <p className='w-44 py-3 rounded-3xl bg-slate-700 animate-pulse'></p>}
                        </div>

                        <ul className='flex items-center gap-5 md:gap-10 text-xs sm:text-sm md:text-base'>
                            <li className='flex items-center gap-2'>
                                <FontAwesomeIcon icon={faEnvelope} width={16} height={16} />
                                {currentUser?.email ? <p>{currentUser.email}</p> : <p className='w-40 py-3 rounded-3xl bg-slate-700 animate-pulse'></p>}
                            </li>
                            <li className='flex items-center gap-2'>
                                <FontAwesomeIcon icon={faKey} width={16} height={16} />
                                {currentUser?.password ? <p>{currentUser.password}</p> : <p className='w-36 py-3 rounded-3xl bg-slate-700 animate-pulse'></p>}
                            </li>
                        </ul>

                    </div>

                    <div className='w-full flex justify-start'>

                        <div className='flex  my-10 flex-col gap-2 text-lg text-white'>
                            <h1 className='font-bold text-xl'>Estimated Balance</h1>
                            {totalBalance ? <p className='underline'>= $ {totalBalance}</p>
                                :
                                <p className='underline'>= $ 00.00</p>
                            }
                        </div>
                    </div >

                    <div className='w-1/2 text-sm md:text-base lg:w-1/4 relative mb-5'>
                        <input type="text" id='search-coin' placeholder='Search Coins' value={searchQuery} onChange={(e: any) => setSearchQuery(e.target.value)} className='px-4 py-2 bg-slate-800 text-slate-200 w-full outline-none' />
                        <label htmlFor="search-coin" className='cursor-pointer'>
                            <FontAwesomeIcon icon={faSearch} className='absolute right-5 text-slate-200 top-2.5 w-5 h-5 hover:text-white' />
                        </label>
                    </div>

                    <div className={`relative overflow-x-auto w-full h-[37rem] ${userCoins.length < 1 && 'h-auto'}`}>
                        <table className="w-full text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-slate-200 bg-gray-50 dark:bg-slate-700 dark:text-white">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Coin
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Amount
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Value
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {itemsOnCurrentPage.length > 0 ? itemsOnCurrentPage.map(item => (
                                    <tr className="bg-white border-b text-slate-200 dark:bg-slate-800 dark:border-gray-700 text-xs" key={item.coin}>
                                        <th scope="row" className="px-6 py-3 font-medium text-gray-900 flex items-center gap-3 whitespace-nowrap dark:text-white">
                                            <img src={item.image} alt={item.coin} width={30} height={30} />
                                            <div className='text-white flex items-center w-20'>{item.coin}</div>
                                        </th>
                                        <td className="px-6 py-3">
                                            <div className='h-4 w-20'>
                                                {item.amount}
                                            </div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className='h-4 w-32'>
                                                $ {item.value.toFixed(6)}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                                    : userCoins.length < 1 ?
                                        <tr className="bg-white border-b text-slate-200 dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-3 font-medium text-gray-900 flex items-center gap-3 whitespace-nowrap dark:text-white">
                                                {currentUser?.name}
                                            </th>
                                            <td className="px-6 py-3">
                                                Has no
                                            </td>
                                            <td className="px-6 py-3 h-[30px] text-lg">
                                                Coins
                                            </td>
                                        </tr>
                                        : searchQuery && itemsOnCurrentPage.length < 1 ?
                                            <tr className="bg-white border-b text-slate-200 dark:bg-gray-800 dark:border-gray-700">
                                                <th scope="row" className="px-6 py-3 font-medium text-gray-900 flex items-center gap-3 whitespace-nowrap dark:text-white">
                                                    {searchQuery}
                                                </th>
                                                <td className="px-6 py-3">
                                                    Not
                                                </td>
                                                <td className="px-6 py-3">
                                                    Found
                                                </td>
                                            </tr>
                                            : skeleton.map(item => (
                                                <tr className="bg-white border-b text-slate-200 dark:bg-gray-800 dark:border-gray-700" key={item}>
                                                    <th scope="row" className="px-6 py-3 font-medium text-gray-900 flex items-center gap-3 whitespace-nowrap dark:text-white">
                                                        <div className='w-20 h-[30px] rounded-3xl bg-slate-600 animate-pulse'></div>
                                                    </th>
                                                    <td className="px-6 py-3">
                                                        <div className='w-20 h-[30px] rounded-3xl bg-slate-600 animate-pulse'></div>
                                                    </td>
                                                    <td className="px-6 py-3">
                                                        <div className='w-32 h-[30px] rounded-3xl bg-slate-600 animate-pulse'></div>
                                                    </td>
                                                </tr>
                                            ))
                                }
                            </tbody>
                        </table>
                    </div>


                    <div className='text-slate-300 flex justify-end items-center gap-5 py-5 w-full'>
                        <button
                            className={`text-white`}
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            Previous
                        </button>
                        <span>{currentPage} / {getTotalPages()}</span>
                        <button
                            className={`text-white`}
                            disabled={end >= modifiedCoins.length}
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            Next
                        </button>
                    </div>

                    <div className='flex text-[10px] sm:text-xs flex-col items-center w-full py-10 gap-6'>

                        <div className='flex flex-col w-full'>
                            <h1 className='w-full mb-5 text-white text-xl font-bold'>{user.name} Trades</h1>
                            <div className={`w-full ${myTrades.length > 0 ? 'h-[30rem]' : 'h-20'} overflow-y-auto`}>
                                {myTrades && myTrades.length > 0 ?
                                    <table className="w-full text-left text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-slate-200 bg-gray-50 dark:bg-slate-700 dark:text-white">
                                            <tr>
                                                <th scope="col" className="px-6 py-4">
                                                    Price
                                                </th>
                                                <th scope="col" className="px-6 py-4">
                                                    Amount
                                                </th>
                                                <th scope="col" className="px-6 py-4">
                                                    Type
                                                </th>
                                                <th scope="col" className="px-6 py-4">
                                                    Time
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {myTrades.length > 0 && myTrades.map((item) => {
                                                const createdAt = new Date(item.created_at);
                                                const formattedCreatedAt = `${createdAt.toLocaleDateString()} ${createdAt.toLocaleTimeString()}`;
                                                return (
                                                    <tr className="bg-white border-b text-slate-200 dark:bg-gray-800 dark:border-gray-700" key={item.id}>
                                                        <th scope="row" className={`px-6 py-4 font-medium flex items-center gap-1 whitespace-nowrap`}>
                                                            <div>{item.price.toFixed(2)}</div>
                                                            <div className='text-slate-300 flex items-center'>({item.using_coin})</div>
                                                        </th>
                                                        <td className="px-6 py-4">
                                                            <div className='flex items-center gap-1'>
                                                                <span>{item.amount}</span>
                                                                <span>({item.coin})</span>
                                                            </div>
                                                        </td>
                                                        <td className='px-6 py-4'>
                                                            <div className={`uppercase ${item.type === 'buy' ? 'text-green-400' : 'text-red-500'}`}>{item.type}</div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className='flex items-center'>
                                                                {formattedCreatedAt}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table> : <div className='text-slate-300 text-base w-full h-20 justify-center flex items-center'>No Data</div>}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div >
    )
}

export default Page