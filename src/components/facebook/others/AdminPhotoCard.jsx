import React from "react";

const AdminPhotoCard = ({ data }) => {
  if (data?.phone === "09761723325") {
    return (
      <div className=" flex flex-col gap-1 justify-start items-center w-[100px] ">
        <div className=" cursor-pointer flex w-[100px] items-center justify-center ">
          {data?.address && (
            <img
              className=" bg-[#2222225e] w-[100px] rounded-[8px] h-[100px] object-cover items-center "
              src={data?.address}
              alt=""
            />
          )}
        </div>
      </div>
    );
  }
};

export default AdminPhotoCard;
