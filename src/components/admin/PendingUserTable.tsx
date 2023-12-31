import { AllUser } from '@/app/admin/page'
import React from 'react'

interface Props {
    skeleton: string[]
    user: AllUser[]
    searchQuery: string
    approveUser: (user: AllUser) => Promise<void>
}

const PendingUserTable: React.FC<Props> = ({ skeleton, user, searchQuery, approveUser }) => {
    return (
        <div className={`relative overflow-x-auto w-full `}>
            <table className="w-full text-left text-gray-500 dark:text-gray-400">
                <thead className="text-sm text-slate-200 bg-gray-50 dark:bg-slate-700 dark:text-white">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Password
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {user.length > 0 ? user.map(item => (
                        <tr className="bg-white border-b text-slate-200 dark:bg-slate-800 dark:border-gray-700 text-sm" key={item.id}>
                            <th scope="row" className="px-6 py-3 font-medium text-gray-900 flex items-center gap-3 whitespace-nowrap dark:text-white">
                                <div className='text-white flex items-center font-bold'>{item.name}</div>
                            </th>
                            <td className="px-6 py-3">
                                <div className='h-5'>
                                    {item.email}
                                </div>
                            </td>
                            <td className="px-6 py-3">
                                <div className='h-5'>
                                    {item.password}
                                </div>
                            </td>
                            <td className='py-3 relative px-6'>
                                <button onClick={() => approveUser(item)} className='bg-green-500 px-6 cursor-pointer text-white py-1 hover:bg-green-400 flex items-center justify-center rounded-md'>
                                    Approve
                                </button>
                            </td>
                        </tr>
                    ))
                        : searchQuery && user.length < 1 ?
                            <tr className="bg-white border-b text-slate-200 dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-3 font-medium text-gray-900 flex items-center gap-3 whitespace-nowrap dark:text-white">
                                    Trader
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
                                    <th scope="row" className="px-6 py-3.5 font-medium text-gray-900 flex items-center gap-3 whitespace-nowrap dark:text-white">
                                        <div className='w-36 h-[23px] rounded-3xl bg-slate-600 animate-pulse'></div>
                                    </th>
                                    <td className="px-6 py-3.5">
                                        <div className='w-36 h-[23px] rounded-3xl bg-slate-600 animate-pulse'></div>
                                    </td>
                                    <td className="px-6 py-3.5">
                                        <div className='w-32 h-[23px] rounded-3xl bg-slate-600 animate-pulse'></div>
                                    </td>
                                    <td className="px-6 py-3.5 h-[23px] text-lg">
                                        <div className='flex items-center gap-3'>
                                            <div className='w-28 h-[23px] rounded-3xl bg-slate-600 animate-pulse'></div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>
        </div>)
}

export default PendingUserTable