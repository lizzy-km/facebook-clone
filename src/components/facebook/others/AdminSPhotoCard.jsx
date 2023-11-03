import React from "react";

const AdminSPhotoCard = ({ sdata }) => {
  return (
    <div className=" flex flex-col gap-1 justify-start items-center w-[100px] ">
      <div className=" cursor-pointer flex w-[100px] items-center justify-center ">
        {sdata?.urls?.full && (
          <img
            className=" bg-[#2222225e] w-[100px] rounded-[8px] h-[100px] object-cover items-center "
            src={sdata?.urls?.full}
            alt=""
          />
        )}
      </div>
    </div>
  );
};

export default AdminSPhotoCard;
