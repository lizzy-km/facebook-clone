import React from 'react'
import { Link } from 'react-router-dom'

const AdminFriendCard = ({data}) => {
  return (
    <div className=' flex flex-col gap-1 justify-start items-center w-[100px] ' >
      <Link to={`/profile/${data?.username}`} className=' cursor-pointer flex w-[100px] items-center justify-center ' >
        <img className=' w-[100px] rounded-[8px] h-[100px] object-cover items-center ' src={data?.profile_image} alt=""/>
      </Link>
      <Link to={`/profile/${data?.username}`} className=' cursor-pointer flex justify-start items-center w-[100%] text-left text-sm text-[#e7e4e4] ' >
        <p> {data?.username} </p>
      </Link>
    </div>
  )
}

export default AdminFriendCard
