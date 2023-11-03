import Cookies from "js-cookie";
import { usePhotoQuery } from "../../../redux/api/PhotoApi";
import { useSelector } from "react-redux";
import "./app.css";
import { Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import AuthFun from "../../../pages/AuthFun";

const CreatePostCard = ({ setCp }) => {
  const token = Cookies.get("token");
  const { user } = AuthFun();
  const { data } = usePhotoQuery(token);
  const createP = () => {
    setCp(
      "flex createP absolute rounded-[8px] z-[999999] p-[8px]  w-[100%] h-[100%] justify-center items-center "
    );
  };
  const setUId = () => {
    Cookies.set("UserId", user?.id);
  };
  return (
    <Box
      className="  max-[991px]:px-[3.7rem] max-[760px]:px-0
     mf_up w-[500px] h-auto flex justify-center px-[8px] pt-[8px] pb-[rem] ml-[0px] 
       max-[450px]:p-0 max-[450px]:m-0
      "
    >
      <div
        className="pe_h max-[991px]:px-[3.7rem] max-[760px]:px-0
    w-[500px] h-auto px-[px] pt-[8px] pb-[rem] p-[8px] m-[px] rounded-[8px] bg-blur-p
    
      "
      >
        <div className=" mf_pe  flex m-[8px] max-[450px]:m-0 ">
          <Link
            onClick={setUId}
            to={`/${user?.name}`}
            className=" cursor-pointer "
            href=""
          >
            <img
              className="pe_m_p max-w-[40px] min-w-[40px] max-h-[40px] min-h-[40px] object-cover rounded-full bg-[#333333]  m-0 cursor-pointer "
              src={user?.avatar}
              alt=""
            />
          </Link>

          <div
            onClick={createP}
            id="create"
            className="pe_txt bg-[#5656568e] cursor-pointer  w-[420px] h-[40px] rounded-[20px] p-[8px] ml-[8px] "
          >
            <span className=" opacity-[.8] p-[8px] text-[#fff] " id="create">
              What's on your mind, {user?.name?.split(" ")[0]}?
            </span>
          </div>
        </div>
        <div className="mf_md pb-[.6rem] flex justify-between border-[#333333] text-[#ffff] border-t-[1px] ">
          <div className="mf_live md_li m-[8px] p-[8px] rounded-[8px] cursor-pointer hover:bg-[#5050507c] ">
            Live
          </div>
          <div className="mf_phvd md_li m-[8px] p-[8px] rounded-[8px] cursor-pointer hover:bg-[#5050507c]">
            Photo/Video
          </div>
          <div className="mf_fel md_li m-[8px] p-[8px] rounded-[8px] cursor-pointer hover:bg-[#5050507c]">
            Feeling/Activity
          </div>
        </div>
      </div>
    </Box>
  );
};

export default CreatePostCard;
