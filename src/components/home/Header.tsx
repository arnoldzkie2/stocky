import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <header className='fixed top-0 left-0 w-screen flex items-center px-5 sm:px-10 md:px-16 lg:px-24 xl:px-36 2xl:px-44 h-20 shadow shadow-white bg-slate-950'>
            <h1 className='text-white font-black text-xl md:text-2xl' >STOCKY</h1>
            <ul className='text-slate-300 flex items-center w-full justify-end gap-6'>
                <Link className='hover:text-white' href='/signup'>Sign Up</Link>
                <Link className='hover:text-white' href='/login'>Login</Link>
            </ul>
        </header>
    )
}

export default Header