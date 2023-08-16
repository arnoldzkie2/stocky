/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { CoinSearch } from '@/components/dashboard/TradeCoins'
import UserHeader from '@/components/dashboard/UserHeader'
import ProfileInfo from '@/components/profile/ProfileInfo'
import { faCircleUser, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Trades } from '../trade/[coin]/page'
import UserCoins from '@/components/profile/UserCoins'
import UserTrades from '@/components/profile/UserTrades'

interface AllCoins {
  coin: string
  image: string
  amount: number
  value: number
}

const Page = () => {

  const [user, setUser] = useState({ name: 'Arnold Nillas', token: '', isAdmin: false })

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


  const depositCoin = async () => {

    const { coin, amount } = depositData

  }

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

  const updateUserCoin = async () => {

    try {

    } catch (error) {

      console.error(error);

    }
  }

  const getUserCoins = async () => {

    try {

      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/v1/coins`, {
        headers: {
          Authorization: user.token
        }
      })

      if (data.data) {

        setUserCoins(data.data)
      }

    } catch (error) {

      console.error(error);

    }
  }

  const fetchMyTrades = async () => {

    try {

      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/v1/trades/user_id`)

      if (data.data) {
        setMyTrades(data.data)
      }
    } catch (error) {

      console.log(error);

    }
  }


  useEffect(() => {

    const user = localStorage.getItem('user')

    if (user) {

      setUser(JSON.parse(user))

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
      <UserHeader user={user} />
      <div className='px-5 sm:px-10 md:px-16 lg:px-24 w-screen h-screen xl:px-36 2xl:px-44 pt-16 flex flex-col text-slate-300'>

        <div className='lg:px-36 md:px-20 md:border-x md:border-slate-800 xl:px-52 w-full py-5 md:py-10 flex flex-col'>

          <ProfileInfo user={user} totalBalance={totalBalance} />

          <div className='w-1/2 text-sm md:text-base lg:w-1/4 relative mb-5'>
            <input type="text" id='search-coin' placeholder='Search Coins' value={searchQuery} onChange={(e: any) => setSearchQuery(e.target.value)} className='px-4 py-2 bg-slate-800 text-slate-200 w-full outline-none' />
            <label htmlFor="search-coin" className='cursor-pointer'>
              <FontAwesomeIcon icon={faSearch} className='absolute right-5 text-slate-200 top-2.5 w-5 h-5 hover:text-white' />
            </label>
          </div>

          <UserCoins coins={itemsOnCurrentPage} searchQuery={searchQuery} skeleton={skeleton} userCoins={userCoins} />

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

          <UserTrades myTrades={myTrades} />

        </div>

      </div>
    </div >
  )
}

export default Page