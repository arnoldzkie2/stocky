/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Trades } from '@/app/trade/[coin]/page'
import AdminHeader from '@/components/admin/AdminHeader'
import TransactionHeader from '@/components/admin/TransactionHeader'
import UserTable from '@/components/admin/UserTable'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {

  const router = useRouter()

  const [user, setUser] = useState({ name: 'Arnold Nillas', token: '', isAdmin: false })

  const [allTrades, setAllTrades] = useState<Trades[]>([])

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

  const [skeleton, setSkeleton] = useState(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])

  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 10

  const end = currentPage * itemsPerPage;

  const start = end - itemsPerPage;

  const itemsOnCurrentPage = allTrades.slice(start, end);

  const getTotalPages = () => Math.ceil(allTrades.length / itemsPerPage)

  const handlePageChange = (pageNumber: number) => {

    setCurrentPage(pageNumber);

  };

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

    setTimeout(() => {
      setAllTrades(myTrades)
    }, 2000)

  }, [])

  return (
    <div>
      <AdminHeader user={user} />

      <div className='w-screen px-5 sm:px-10 md:px-16 lg:px-24 xl:px-36 2xl:px-44 flex flex-col pt-16 text-slate-300'>

        <div className='lg:px-36 md:px-20 md:border-x gap-10 md:border-slate-800 xl:px-52 w-full py-5 md:pt-10 flex flex-col'>

          <TransactionHeader />

          <div className='flex flex-col w-full gap-5'>

            <div className='flex text-xs flex-col items-center w-full'>

              <div className='flex flex-col w-full'>
                <div className={`w-full overflow-y-auto`}>
                  <table className="w-full text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-sm text-slate-200 bg-gray-50 dark:bg-slate-700 dark:text-white">
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
                      {itemsOnCurrentPage.length > 0 ? itemsOnCurrentPage.map((item) => {
                        const createdAt = new Date(item.created_at);
                        const formattedCreatedAt = `${createdAt.toLocaleDateString()} ${createdAt.toLocaleTimeString()}`;
                        return (
                          <tr className="bg-white border-b text-slate-200 dark:bg-gray-800 dark:border-gray-700" key={item.id}>
                            <th scope="row" className={`px-6 py-4 font-medium whitespace-nowrap`}>
                              <div className='flex items-center gap-1 h-5 w-36'>
                                <div>{item.price.toFixed(2)}</div>
                                <div className='text-slate-300 flex items-center'>({item.using_coin})</div>
                              </div>
                            </th>
                            <td className="px-6 py-4">
                              <div className='flex items-center gap-1 h-5 w-28'>
                                <span>{item.amount}</span>
                                <span>({item.coin})</span>
                              </div>
                            </td>
                            <td className='px-6 py-4'>
                              <div className={`h-5 w-16 uppercase ${item.type === 'buy' ? 'text-green-400' : 'text-red-500'}`}>{item.type}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className='flex items-center h-5 w-44'>
                                {formattedCreatedAt}
                              </div>
                            </td>
                          </tr>
                        );
                      }) : skeleton.map((item) => (
                        <tr className="bg-white border-b text-slate-200 dark:bg-gray-800 dark:border-gray-700" key={item}>
                          <th scope="row" className={`px-6 py-4 font-medium flex items-center gap-1 whitespace-nowrap`}>
                            <div className='h-5 bg-slate-600 animate-pulse rounded-3xl w-36'>
                            </div>
                          </th>
                          <td className="px-6 py-4">
                            <div className='h-5 bg-slate-600 animate-pulse rounded-3xl w-28'>
                            </div>
                          </td>
                          <td className='px-6 py-4'>
                            <div className='h-5 bg-slate-600 animate-pulse rounded-3xl w-16'></div>
                          </td>
                          <td className="px-6 py-4">
                            <div className='h-5 bg-slate-600 animate-pulse rounded-3xl w-44'>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

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
                disabled={end >= allTrades.length}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Page