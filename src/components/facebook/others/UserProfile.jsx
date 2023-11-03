import { useNavigate, useParams } from "react-router-dom";
import { useUserPQuery } from "../../../redux/api/PhotoApi";
import ProfileCard from "./ProfileCard";
import UserPost from "./UserPost";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { getUser, getUserPhoto } from "../../../redux/services/PhotoSlice";
import { useEffect } from "react";
import Cookies from "js-cookie";
import AuthFun from "../../../pages/AuthFun";

const UserProfile = () => {
  // Get the token from the cookies
  const token = Cookies.get("token");

  // Use the useNavigate hook from React Router to navigate to different routes
  const nav = useNavigate();

  // Get the id parameter from the URL
  const id = useParams();

  // Use the useUserPQuery hook to fetch user data based on the id
  const { data, isSuccess } = useUserPQuery(id?.id);

  // Get the dispatch function from the Redux useDispatch hook
  const dispatch = useDispatch();

  // Check if the token is not available
  useEffect(() => {
    if (!token) {
      // Redirect to the login page
      nav("/login");
    }
  }, []);

  // Get the user photo from the Redux state
  const { user } = AuthFun();

  // Find the first data item in the data array
  const pd = data?.find((data) => data);
  // Get the user from the pd object
  const pdata = pd?.user;

  // Check if the screen size is mobile
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  // Check if the screen size is desktop
  const isDesktop = useMediaQuery({ query: "(min-width: 992px)" });

  return (
    <div className="   overflow-hidden min-h-screen h-full flex justify-center items-center w-[100%]     ">
      <div className="  overflow-auto flex flex-col h-full   w-[100%] bg-[#2c2b2b]    ">
        {isSuccess && isDesktop && (
          <img
            className="flex absolute blur-xl w-[100%] object-fill  h-[400px]  "
            src={data[0]?.urls?.full}
            alt=""
          />
        )}
        {isSuccess && isMobile && (
          <img
            className="flex absolute blur-xl w-[100%] object-fill h-[200px]  "
            src={data[0]?.urls?.full}
            alt=""
          />
        )}

        {isSuccess && isDesktop && (
          <div className="flex relative shadow-lg  bg-blur w-[100%] h-[610.812px] justify-center ">
            <ProfileCard pdata={pdata} data={data} className="" />
          </div>
        )}
        {isSuccess && isMobile && (
          <div className="flex relative shadow-sm   bg-blur w-[100%] h-auto justify-center ">
            <ProfileCard pdata={pdata} data={data} className="z-[1111]" />
          </div>
        )}

        {isSuccess && isMobile && (
          <div className="flex flex-col bg-img   w-[100%] justify-center items-center  p-[8px] gap-4 ">
            <div className="flex flex-col bg-blur w-[100%] gap-4 h-[100px] justify-center items-center z-[999]   "></div>

            <div className=" flex justify-center bg-blur z-[999999]  flex-col w-[100%] h-auto">
              <UserPost userPhoto={userPhoto} key={userPhoto?.id} />
            </div>
          </div>
        )}
        {isSuccess && isDesktop && (
          <div className="flex bg-img  w-[100%] justify-center p-[8px] gap-4 ">
            <div className="flex flex-col w-auto rounded-[8px] bg-blur gap-5 h-auto mt-[0px] p-[8px]  "></div>

            <div className="  items-center justify-center flex flex-col w-[500px] h-auto">
              <UserPost data={data} key={data?.id} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
