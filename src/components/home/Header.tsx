import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <header className='fixed top-0 left-0 w-screen flex items-center px-5 sm:px-10 md:px-16 lg:px-24 xl:px-36 2xl:px-44 h-20 border-b border-slate-800 bg-slate-950'>
            <Link href={'/'} className='text-white font-black text-xl md:text-2xl'>CoinTrade</Link>
            <ul className='text-slate-300 flex items-center w-full justify-end gap-5 md:gap-8'>
                <Link className='hover:text-white text-sm md:text-base' href='/'>Home</Link>
                <Link className='hover:text-white text-sm md:text-base' href='/signup'>Sign Up</Link>
                <Link className='hover:text-white text-sm md:text-base' href='/login'>Login</Link>
            </ul>
        </header>
    )
}

export default Header