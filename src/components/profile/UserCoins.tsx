/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'

interface Props {

    skeleton: string[]

    coins: AllCoins[]

    userCoins: {
        coin: string;
        amount: number;
    }[]

    searchQuery: string


}

interface AllCoins {
    coin: string
    price: string
    image: string
    amount: number
    value: number
}



const UserCoins: React.FC<Props> = ({ coins, skeleton, userCoins, searchQuery }) => {
    return (

        <div className={`relative overflow-x-auto w-full h-[37rem] ${userCoins.length < 1 && 'h-auto'}`}>
            <table className="w-full text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-slate-200 bg-gray-50 dark:bg-slate-700 dark:text-white">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Coin
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Amount
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Total Value
                        </th>
                        <th scope="col" className="px-6 py-3">
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {coins.length > 0 ? coins.map(item => (
                        <tr className="bg-white border-b text-slate-200 dark:bg-slate-800 dark:border-gray-700 text-xs" key={item.coin}>
                            <th scope="row" className="px-6 py-3 font-medium text-gray-900 flex items-center gap-3 whitespace-nowrap dark:text-white">
                                <img src={item.image} alt={item.coin} width={30} height={30} />
                                <div className='text-white flex items-center w-20'>{item.coin}</div>
                            </th>
                            <td className="px-6 py-3">
                                <div className='h-4 w-20'>
                                    {item.price}
                                </div>
                            </td>
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
                            <td className="px-6 py-3">
                                <ul className='flex items-center gap-7'>
                                    <Link href={`/trade/${item.coin}`} className='text-yellow-400 hover:text-yellow-300'>Trade</Link>
                                </ul>
                            </td>
                        </tr>
                    ))
                        : userCoins.length < 1 ?
                            <tr className="bg-white border-b text-slate-200 dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-3 font-medium text-gray-900 flex items-center gap-3 whitespace-nowrap dark:text-white">
                                    You
                                </th>
                                <td className="px-6 py-3">
                                    Don't
                                </td>
                                <td className="px-6 py-3">
                                    Have
                                </td>
                                <td className="px-6 py-3 h-[30px] text-lg">
                                    Coins
                                </td>
                            </tr>
                            : searchQuery && coins.length < 1 ?
                                <tr className="bg-white border-b text-slate-200 dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-3 font-medium text-gray-900 flex items-center gap-3 whitespace-nowrap dark:text-white">
                                        Coin
                                    </th>
                                    <td className="px-6 py-3">
                                        {searchQuery}
                                    </td>
                                    <td className="px-6 py-3">
                                        Not
                                    </td>
                                    <td className="px-6 py-3 h-[30px] text-lg">
                                        Found
                                    </td>
                                </tr>
                                : skeleton.map(item => (
                                    <tr className="bg-white border-b text-slate-200 dark:bg-gray-800 dark:border-gray-700" key={item}>
                                        <th scope="row" className="px-6 py-3 font-medium text-gray-900 flex items-center gap-3 whitespace-nowrap dark:text-white">
                                            <div className='w-[30px] h-[30px] rounded-full bg-slate-600 animate-pulse'></div>
                                            <div className='w-16 h-[30px] rounded-3xl bg-slate-600 animate-pulse'></div>
                                        </th>
                                        <td className="px-6 py-3">
                                            <div className='w-20 h-[30px] rounded-3xl bg-slate-600 animate-pulse'></div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className='w-28 h-[30px] rounded-3xl bg-slate-600 animate-pulse'></div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className='w-32 h-[30px] rounded-3xl bg-slate-600 animate-pulse'></div>
                                        </td>
                                        <td className="px-6 py-3 h-[30px] text-lg">
                                            <div className='flex items-center gap-3'>
                                                <div className='w-16 h-[30px] rounded-3xl bg-slate-600 animate-pulse'></div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default UserCoins