'use client'
import DashboardMain from '@/components/dashboard/DashboardMain'
import UserHeader from '@/components/dashboard/UserHeader'
import React, { useEffect, useState } from 'react'



const Page = () => {

    const [user, setUser] = useState({ name: '', token: '', is_admin: false })

    useEffect(() => {

        const user = localStorage.getItem('user')

        if (user) {

            setUser(JSON.parse(user))

        } else {

            // router.push('/login')

        }


    }, [])

    return (
        <div>
            <UserHeader user={user} />
            <DashboardMain />
        </div>
    )
}

export default Page