import React from 'react'
import { useSelector } from 'react-redux'
import AdminPhotoCard from './AdminPhotoCard'
import AdminSPhotoCard from './AdminSPhotoCard'
import { useUserCollectionQuery } from '../../../redux/api/PhotoApi'
import { usePostsQuery } from '../../../redux/api/PostApi'
import { useGetPostQuery } from '../../../redux/api/AuthApi'

const AdminPhoto = () => {

  // Retrieve user photo data from the user collection
const userPhoto = useGetPostQuery();

// Get the data from the userPhoto object
const photo = userPhoto?.data?.contacts?.data;
console.log(photo);

// Filter out any data with description equal to "false"
const uPhoto = photo?.filter(data => data?.phone === "09761723325");

// Filter out any data with title equal to "story"
const photoData = uPhoto?.filter(data => data?.name !== 'detail');

// Get the sharepost data from the UserPhotoSlice state using the useSelector hook
const sharepost = useSelector(state => state.UserPhotoSlice.sharePost.toReversed());

// Log the photoData to the console
console.log(uPhoto);

// Calculate the length of photoData and sharepost arrays
const photoLength = uPhoto?.length + sharepost?.length;

    // src={data?.urls?.full}
  return (
    <div className=' flex flex-col z-[1] gap-3 rounded-[8px] bg-[#2323237c] p-[8px]  min-h-[5rem] w-[360px] max-[760px]:w-[100%] justify-center  ' >
    <div className='  flex justify-start items-center gap-4 p- ' >
      <p className='text-xl  text-[#e2e0e0] font-medium' > photos</p> 
      {
        photoLength >0 &&  <p className=' text-[#a9a7a7] ' > {photoLength} </p>
      }
     
    </div>
    <div className=' bg-[#22222248] flex-wrap justify-start max-[760px]:gap-5 flex gap-[14px] p-[8px] rounded-[8px] items-center w-[100%] h-auto ' >
        {
            uPhoto?.length <1 && sharepost.length <1 && 
            <div>
                You have no photo yet!
            </div>
        }
        {   uPhoto?.length >0 && 
            uPhoto?.map(data => {
                return(
                    <AdminPhotoCard key={data?.id} data={data}  />
                )
            })
        }
         {   sharepost?.length >0 && 
            sharepost?.map(data => {
                return(
                    <AdminSPhotoCard key={data?.id} sdata={data}  />
                )
            })
        }
    </div>
  
</div>
  )
}

export default AdminPhoto
