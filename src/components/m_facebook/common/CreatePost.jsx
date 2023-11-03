import { TbPhotoPlus } from "react-icons/tb";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CreatePost = () => {
  const udata = useSelector((state) => state.UserPhotoSlice.user);
  const user = udata[0];
  return (
    <div className="flex gap-2 bg-[#2122237f] mb-[4px] p-[1rem] justify-between items-center ">
      <div>
        <img
          className="rounded-full w-[40px] h-[40px] border-2 "
          src={user?.profileImage}
          alt=""
        />
      </div>
      <Link
        to={"/addpost"}
        className="bg-[rgba(50,52,54,1.0)] h-[40px] w-[70%] text-sm rounded-3xl text-[#fff] justify-center items-center text-left px-[.4rem] pt-[.5rem] "
      >
        <p>What's on your mind {user?.name} ? </p>
      </Link>
      <div className="flex flex-col justify-center items-center text-[#fff]  ">
        <TbPhotoPlus className=" text-[#fff] text-[30px] " />
        <p>Photo</p>
      </div>
    </div>
  );
};

export default CreatePost;
