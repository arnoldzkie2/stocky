import DashboardMain from '@/components/dashboard/DashboardMain'
import TradeCoins from '@/components/dashboard/TradeCoins'
import UserHeader from '@/components/dashboard/UserHeader'
import React from 'react'



const Page = () => {
    return (
        <div>
            <UserHeader />
            <DashboardMain />
        </div>
    )
}

export default Page