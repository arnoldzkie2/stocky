'use client'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { useState } from 'react'

const UserHeader = () => {

    const [user, setUser] = useState('Arnold Nillas')

    const [checkProfile, setCheckProfile] = useState(false)

    return (
        <header className='fixed z-50 top-0 left-0 w-screen flex items-center px-5 sm:px-10 md:px-16 lg:px-24 xl:px-36 2xl:px-44 h-20 border-b border-slate-800 bg-slate-950'>
            <Link href={'/'} className='text-white font-black text-xl md:text-2xl'>CoinTrade</Link>
            <ul className='text-slate-300 flex items-center w-full justify-end gap-5 md:gap-8'>
                <Link className='hover:text-white text-sm md:text-base' href='/dashboard'>Home</Link>
                <div className='relative flex items-center text-sm md:text-base gap-2 hover:text-white cursor-pointer' onClick={() => setCheckProfile(prevState => !prevState)}>
                    <div>{user}</div>
                    <FontAwesomeIcon icon={checkProfile ? faChevronUp : faChevronDown} />
                    <ul className={` bg-slate-900 py-3 px-5 gap-2 top-7 w-full flex flex-col text-slate-300 ${checkProfile ? 'absolute' : 'hidden'}`}>
                        <Link className='hover:text-white' href={'/profile'}>Profile</Link>
                        <Link className='hover:text-white' href={'/profile'}>History</Link>
                        <Link className='hover:text-white' href={'/profile'}>Logout</Link>
                    </ul>
                </div>
            </ul>
        </header>
    )
}

export default UserHeader