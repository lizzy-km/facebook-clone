import { useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import AdminPost from "./AdminPost";
import Cookies from "js-cookie";
import AdminProfileCard from "./AdminProfileCard";
import CreatePost from "../../../pages/CreatePost";
import { useEffect, useState } from "react";
import AdminFriend from "./AdminFriend";
import CreateStory from "../../../pages/CreateStory";
import AuthFun from "../../../pages/AuthFun";
import { addStoryImage, addViewImage } from "../../../redux/services/authSlice";
import { Image } from "@chakra-ui/react";

const AdminProfile = ({ isLogout }) => {
  const token = Cookies.get("token");
  const nav = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();

  const [cp, setCp] = useState(
    "d-n createP absolute  w-[100%] h-[100%] justify-center items-center "
  );
  const createP = () => {
    setCp(
      "flex createP absolute z-[99999999] p-[8px] w-[100%] h-[100%] justify-center items-center "
    );
  };
  const [ct, setCt] = useState(
    "d-n createP absolute  w-[100%] h-[100%] justify-center items-center "
  );

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 991px)",
  });
  const isDesktop = useMediaQuery({ query: "(min-width: 992px)" });

  const uid = Cookies.get("UserId");
  if (!uid) {
    nav("/");
  }

  const UID = JSON.parse(uid);

  const { publicFun } = AuthFun();
  const { publicProfile } = publicFun(UID);
  const user = publicProfile;

  if (user?.name !== params?.name) {
    nav("/");
  }

  useEffect(() => {
    if (!token) {
      nav("/login");
    }
  }, [token]);

  const viewImage = useSelector((state) => state.authSlice.viewImage);

  //(viewImage);

  if (token) {
    return (
      <div className=" text-[#efecec] z-[99] overflow-y-auto relative h-screen  flex justify-center items-   w-[100%] bg-[#111112]    ">
        {viewImage && params.name === user?.name && (
          <div
            onClick={() => dispatch(addViewImage(""))}
            className=" z-[99999] cursor-pointer absolute flex justify-center items-center top-[0%] w-[100%] h-[100%] bg-blur  "
          >
            <div>
              <Image
                className="max-[500px]:w-full  h-auto w-[400px] snap-center "
                src={viewImage}
                alt=""
              />
            </div>
          </div>
        )}
        <div className=" bg-img overflow-auto flex flex-col  w-[100%] bg-[#121212]    ">
          {isDesktop && (
            <img
              className="flex absolute blur-xl w-[100%] object-cover bg-repeat h-full  "
              src={user?.avatar}
              alt=""
            />
          )}
          {isTablet && (
            <img
              className="flex absolute blur-xl w-[100%] h-full object-cover   "
              src={user?.avatar}
              alt=""
            />
          )}
          {isMobile && (
            <img
              className="flex absolute blur-xl w-[100%] h-full object-cover   "
              src={user?.avatar}
              alt=""
            />
          )}
          {isDesktop && (
            <div className="flex relative shadow-lg   w-[100%] h-[610.812px] justify-center ">
              <AdminProfileCard setCt={setCt} className="" />
            </div>
          )}
          {isTablet && (
            <div className="flex relative shadow-sm items-center   w-[100%] h-auto justify-center ">
              <AdminProfileCard setCt={setCt} className="z-[1111]" />
            </div>
          )}
          {isMobile && (
            <div className="flex relative shadow-sm   w-[100%] h-auto justify-center ">
              <AdminProfileCard setCt={setCt} className="z-[1111]" />
            </div>
          )}

          {isMobile && (
            <div className="flex flex-col  w-[100%] justify-center items-center p-[8px] gap-4 ">
              <div className="flex flex-col gap-3 w-[100%] h-auto   ">
                <AdminFriend />{" "}
              </div>

              <div className=" flex justify-center flex-col z-[999]  w-[100%] h-auto">
                <AdminPost setCp={setCp} />
              </div>
            </div>
          )}
          {isTablet && (
            <div className="flex flex-col  w-[100%] justify-center items-center p-[8px] gap-4 ">
              <div className="flex flex-col w-[100%] justify-center items-center h-auto   ">
                <AdminFriend />{" "}
              </div>

              <div className=" flex justify-center items-center flex-col z-[999]  w-[100%] h-auto">
                <AdminPost setCp={setCp} />
              </div>
            </div>
          )}
          {isDesktop && (
            <div className="flex  w-[100%] h-[1000px] justify-center p-[8px] gap-4 ">
              <div className="flex flex-col gap-3 w-[360px] h-auto m-[8px] p-[8px]  ">
                <AdminFriend />
              </div>

              <div className=" flex flex-col w-[500px] z-[99]  h-auto">
                <AdminPost isLogout={isLogout} setCp={setCp} />
              </div>
            </div>
          )}
        </div>

        <div className={cp}>
          <CreatePost setCp={setCp} />
        </div>
        <div className={ct}>
          <CreateStory setCt={setCt} />
        </div>
      </div>
    );
  }
};

export default AdminProfile;
