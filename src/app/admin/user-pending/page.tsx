/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import AdminHeader from '@/components/admin/AdminHeader'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {

  const router = useRouter()

  const [user, setUser] = useState({ name: 'Arnold Nillas', token: '', isAdmin: false })

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

  return (
    <div>
      <AdminHeader user={user} />
    </div>
  )
}

export default Page