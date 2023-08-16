import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

interface Props {
  user: {
    name: string
    token: string
  }
  totalBalance: number

}

const ProfileInfo: React.FC<Props> = ({ user, totalBalance }) => {

  return (
    <>
      <div className='flex w-full items-center justify-between gap-x-16 gap-y-5 flex-wrap'>

        <div className='flex items-center gap-3'>
          <FontAwesomeIcon icon={faCircleUser} width={30} height={30} className='w-[30px] h-[30px]' />
          <p className='text-white font-medium'>{user.name}</p>
        </div>

        <ul className='flex items-center gap-5 md:gap-10 text-xs sm:text-sm md:text-base'>
          <li className='cursor-pointer bg-yellow-500 hover:bg-yellow-400 text-white px-5 sm:px-6 md:px-7 rounded-md font-medium py-1.5'>Deposit</li>
        </ul>

      </div>

      <div className='w-full flex justify-start'>

        <div className='flex  my-10 flex-col gap-2 text-lg text-white'>
          <h1 className='font-bold text-xl'>Estimated Balance</h1>
          {totalBalance ? <p className='underline'>= $ {totalBalance}</p>
            :
            <p className='underline'>= $ 00.00</p>
          }
        </div>

      </div >
    </>
  )
}

export default ProfileInfo
