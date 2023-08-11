/* eslint-disable react/no-unescaped-entities */
'use client'
import Header from '@/components/home/Header'
import { faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Page = () => {

  const router = useRouter()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  const [eye, setEye] = useState(false)

  const handleChange = (e: any) => {

    const { name, value } = e.target

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))

  }

  const loginUser = async (e: any) => {

    e.preventDefault()

    try {

      const { email, password } = formData

      if (!email || !password) return alert('Fill up the form')

      setIsLoading(true)

      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/login`, {

        user: { email, password }

      })

      if (data.status.code === 200) {

        setIsLoading(false)

        router.push('/dashboard')

      }

    } catch (error) {

      console.log(error);

    }
  }

  console.log(formData);

  return (
    <div>
      <Header />
      <div className='flex items-center h-screen w-screen bg-[url(/auth.webp)] bg-no-repeat bg-cover bg-center justify-between pt-24 px-5 sm:px-10 md:px-16 lg:px-24 xl:px-36 2xl:px-44'>
        <div className='w-1/2 flex flex-col gap-5'>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl text-white'>Welcome Back to CoinTrade</h1>
          <h2 className='text-slate-200 leading-7'>Log in to Access Your Crypto Portfolio</h2>
        </div>
        <form onSubmit={loginUser} className='bg-slate-800 w-[30rem] p-7 py-10 rounded-md shadow shadow-white flex flex-col items-center gap-4'>
          <input onChange={handleChange} name='email' className='w-full bg-slate-700 border-b px-3 text-slate-200 outline-none py-1.5' type="email" placeholder='Email' />
          <div className='flex items-center gap-4 relative w-full'>
            <FontAwesomeIcon onClick={() => setEye(prevEye => !prevEye)} icon={eye ? faEye : faEyeSlash} className='text-slate-300 right-2 absolute cursor-pointer hover:text-white' />
            <input onChange={handleChange} name='password' className='w-full bg-slate-700 border-b text-sm md:text-base px-3 text-slate-200 outline-none py-1.5' type={eye ? 'password' : 'text'} placeholder='Password' />
          </div>
          <button className='bg-yellow-400 text-white py-2.5 active:bg-white active:text-yellow-400 w-full rounded-sm my-4'>{isLoading ? <div className='flex items-center w-full justify-center gap-3'><FontAwesomeIcon icon={faSpinner} className='animate-spin' /> Processing...</div> : <div>Sign In</div>}</button>
          <div className='text-slate-300 flex gap-3'>Don't have account yet? <Link href={'/signup'} className='text-white'>Sign Up</Link></div>
        </form>
      </div>
    </div>
  )
}

export default Page