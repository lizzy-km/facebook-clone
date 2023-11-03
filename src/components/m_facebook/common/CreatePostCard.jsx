import Cookies from "js-cookie";
import { usePhotoQuery } from "../../../redux/api/PhotoApi";
import { useSelector } from "react-redux";
import "./app.css";
import { Link } from "react-router-dom";

const CreatePostCard = () => {
  const token = Cookies.get("token");
  const user = useSelector((state) => state.authSlice.user);
  //(user?.name);
  //   const nav = useNavigate()
  const { data } = usePhotoQuery(token);
  return (
    <div
      className=" d-none min-[450px]:flex
     mf_up w-[500px] h-[112.667px] flex justify-center p-[8px] m-[8px] 
     max-[450px]:w-[380px] max-[450px]:ml-[-45px] 
      "
    >
      <div
        className="pe_h 
    w-[500px] h-[112.667px] p-[8px] m-[8px] rounded-[8px] bg-[#2222227c]
     max-[450px]:w-[380px]
      "
      >
        <div className=" mf_pe  flex m-[8px] ">
          <a className=" cursor-pointer " href="">
            <img
              className="pe_m_p w-[40px] h-[40px] object-cover rounded-full bg-[#333333]  m-0 cursor-pointer "
              src="https://scontent-xsp1-3.xx.fbcdn.net/v/t39.30808-6/346060718_1474859663258005_7906372027648825102_n.jpg?stp=c0.5000x0.5000f_dst-jpg_e15_p325x400_q60_tt1_u&efg=eyJ1cmxnZW4iOiJ1cmxnZW5fZnJvbV91cmwifQ&_nc_cid=0&_nc_ad=z-m&_nc_rml=0&_nc_ht=scontent-xsp1-3.xx&_nc_cat=109&_nc_ohc=rNGeEC0Dl7gAX-fzAkV&ccb=1-7&_nc_sid=85a577&oh=00_AfBDMc4tRMkHuDcq_jYfu6lk4lcKyMSpDJ4nfw-ALAqXEA&oe=64843266"
              alt=""
            />
          </a>

          <Link
            to={"/addpost"}
            id="create"
            className="pe_txt bg-[#333333]  w-[420px] h-[40px] rounded-[20px] p-[8px] ml-[8px] "
          >
            <span className=" opacity-[.8] p-[8px] text-[#fff] " id="create">
              What's on your mind, {user?.name?.split(" ")[0]}?
            </span>
          </Link>
        </div>
        <div className="mf_md flex justify-between border-[#333333] text-[#ffff] border-t-[1px] ">
          <div className="mf_live md_li m-[8px] p-[8px] rounded-[8px] cursor-pointer hover:bg-[#333333] ">
            Live
          </div>
          <div className="mf_phvd md_li m-[8px] p-[8px] rounded-[8px] cursor-pointer hover:bg-[#333333]">
            Photo/Video
          </div>
          <div className="mf_fel md_li m-[8px] p-[8px] rounded-[8px] cursor-pointer hover:bg-[#333333]">
            Feeling/Activity
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostCard;
