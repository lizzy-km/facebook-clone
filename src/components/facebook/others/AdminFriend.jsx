import { useSelector } from 'react-redux'
import AdminFriendCard from './AdminFriendCard';

const AdminFriend = () => {
    const friends = useSelector(state => state.UserPhotoSlice.friend.toReversed())
  return (
    <div className=' flex flex-col z-[1] gap-3 rounded-[8px] bg-[#2323237c] p-[8px]  min-h-[5rem] w-[360px] max-[760px]:w-[100%] justify-center  ' >
        <div className='  flex justify-start items-center gap-4 p- ' >
          <p className='text-xl  text-[#e2e0e0] font-medium' > Friends</p> 
          {
            friends?.length >0 &&  <p className=' text-[#a9a7a7] ' > {friends?.length} </p>
          }
         
        </div>
        <div className=' bg-[#22222248] flex-wrap justify-start max-[760px]:gap-5 flex gap-[14px] p-[8px] rounded-[8px] items-center w-[100%] h-auto ' >
            {
                friends?.length <1 && 
                <div>
                    No friends yet!
                </div>
            }
            {   friends?.length >0 && 
                friends?.map(data => {
                    return(
                        <AdminFriendCard key={data?.id} data={data}  />
                    )
                })
            }
        </div>
      
    </div>
  )
}

export default AdminFriend
