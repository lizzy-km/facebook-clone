import { TbPhotoPlus } from "react-icons/tb";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AuthFun from "../../../pages/AuthFun";
import Cookies from "js-cookie";

const CreatePost = ({ setCp }) => {
  const createP = () => {
    setCp(
      "flex createP overflow-y-auto absolute rounded-[8px] z-[999999] p-[8px] min-h-[100%]  w-[100%] h-[100%] justify-center items-start  "
    );
  };

  const { user } = AuthFun();

  const setUId = () => {
    Cookies.set("UserId", user?.id);
  };

  return (
    <div className="flex gap-2 bg-blur-p w-[100%] rounded-[8px] mb-[0px] p-[1.2rem] justify-between items-center ">
      <Link onClick={setUId} to={`/${user?.name}`}>
        <img
          className="rounded-full w-[40px] h-[40px] border-2 object-cover "
          src={user?.avatar}
          alt=""
        />
      </Link>
      <Link
        onClick={createP}
        className="bg-[#32343676] h-[40px] px-[1rem] w-[70%] text-xs rounded-full text-[#fff] justify-start flex items-center text-left  "
      >
        <p>What's on your mind {user?.name?.split(" ")[0]} ? </p>
      </Link>
      <Link
        onClick={createP}
        className="flex flex-col justify-center items-center text-[#fff]  "
      >
        <TbPhotoPlus className=" text-[#fff] text-[20px] " />
        <p className=" text-xs ">Photo</p>
      </Link>
    </div>
  );
};

export default CreatePost;
