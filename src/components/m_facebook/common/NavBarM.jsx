import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { BsArrowLeft } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";

import "./app.css";
import { Input } from "@mantine/core";
import Cookies from "js-cookie";
import { usePhotoQuery, useSearchQuery } from "../../../redux/api/PhotoApi";
import AuthFun from "../../../pages/AuthFun";
import { useGetSingleUserQuery } from "../../../redux/api/PostApi";

const NavBarM = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();

  const hideSide =
    "    absolute text-slate-50  bg-[#18191A] top-[0%] left-[320%] h-full w-screen  ";
  const showdSide =
    " z-[9999999] flex flex-col gap-4 justify-start items-start   absolute text-slate-50  bg-[#18191A] top-[0%] left-[0%] h-screen   w-[100%]  ";
  const [side, setSide] = useState(hideSide);
  const [sideP, setSideP] = useState(hideSide);
  const showSBar = () => {
    setSide(showdSide);
    setSideP(hideSide);
  };

  const hideSBar = () => {
    setSide(hideSide);
    setSideP(hideSide);
  };

  const showSprofile = () => {
    setSideP(showdSide);
  };

  const { user } = AuthFun();

  const { currentData } = usePhotoQuery();

  // console.log(userDataFromApi);

  const sn = " relative  ";
  const hd = "d-none";
  const [nav, setNav] = useState(hd);

  useEffect(() => {
    if (token) {
      setNav(sn);
    } else {
      setNav(hd);
    }
  }, [token]);
  const [id, setId] = useState("");
  const { data } = useSearchQuery(id);

  const Search = data?.results;

  const userList = useGetSingleUserQuery()
  const searchUser = userList?.data?.filter((user)=>user.name.toLowerCase().includes(id.toLowerCase()))

  const search = (e) => {
    setId(e.target.value);
  };
  const cookieNames = Object.keys(Cookies.get());

  const logout = () => {
    cookieNames?.map((cookie) => {
      Cookies.remove(cookie);
    });

    window.location.reload(true);
    navigate("/login");
  };

  const setUId = () => {
    Cookies.set("UserId", user?.id);
  };

  return (
    <div className={nav}>
      <div className="  relative items-center flex  flex-col gap-8   justify-center  border-b-[1px] border-[#292c30] bg-img   w-[100%] h-auto text-slate-100 ">
        <div className=" w-[100%] p-[1em] h-[100%] flex justify-between gap-2 items-center  bg-[#131314e2]">
          <Link to={"/"} className="">
            <svg
              width="130"
              height="47"
              viewBox="0 0 240 47"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_i_0_1)">
                <path
                  d="M109.15 35V0H110.884C115.356 0 119.558 2.136 122.194 5.74829L135 23.3L132.95 22.8C132.783 21.5667 132.633 20.45 132.5 19.45C132.4 18.45 132.3 17.5 132.2 16.6C132.133 15.7 132.067 14.8 132 13.9C131.967 13 131.95 12.0167 131.95 10.95C131.95 9.88333 131.95 8.68333 131.95 7.35V0V0C137.224 0 141.5 4.27568 141.5 9.55V26.05C141.5 30.9929 137.493 35 132.55 35V35L114.25 10L117.7 10.85C117.867 12.2167 118 13.4 118.1 14.4C118.233 15.4 118.333 16.3 118.4 17.1C118.467 17.9 118.517 18.6667 118.55 19.4C118.617 20.1333 118.65 20.9167 118.65 21.75C118.683 22.5833 118.7 23.5333 118.7 24.6V25.45C118.7 30.7243 114.424 35 109.15 35V35Z"
                  fill="white"
                />
                <path
                  d="M162.024 35.5C159.19 35.5 156.657 34.9 154.424 33.7C152.19 32.5 150.44 30.8667 149.174 28.8C147.907 26.7333 147.274 24.35 147.274 21.65C147.274 18.95 147.907 16.5667 149.174 14.5C150.44 12.4333 152.19 10.8 154.424 9.6C156.657 8.4 159.19 7.8 162.024 7.8C164.857 7.8 167.374 8.4 169.574 9.6C171.807 10.8 173.557 12.4333 174.824 14.5C176.09 16.5667 176.724 18.95 176.724 21.65C176.724 24.35 176.09 26.7333 174.824 28.8C173.557 30.8667 171.807 32.5 169.574 33.7C167.374 34.9 164.857 35.5 162.024 35.5ZM162.024 27.65C163.024 27.65 163.924 27.4 164.724 26.9C165.557 26.3667 166.19 25.65 166.624 24.75C167.09 23.8167 167.324 22.7833 167.324 21.65C167.324 20.45 167.09 19.4 166.624 18.5C166.19 17.6 165.557 16.9 164.724 16.4C163.924 15.8667 163.024 15.6 162.024 15.6C160.99 15.6 160.074 15.8667 159.274 16.4C158.474 16.9 157.84 17.6167 157.374 18.55C156.907 19.45 156.674 20.4833 156.674 21.65C156.674 22.7833 156.907 23.8167 157.374 24.75C157.84 25.65 158.474 26.3667 159.274 26.9C160.074 27.4 160.99 27.65 162.024 27.65Z"
                  fill="white"
                />
                <path
                  d="M183.541 35V1.6V1.6C188.677 1.6 192.841 5.76375 192.841 10.9V25.7C192.841 30.8363 188.677 35 183.541 35V35ZM179.141 16.25V8.35H189.591C193.954 8.35 197.491 11.887 197.491 16.25V16.25H179.141Z"
                  fill="white"
                />
                <path
                  d="M214.661 35.5C211.627 35.5 209.011 34.9167 206.811 33.75C204.611 32.55 202.911 30.9167 201.711 28.85C200.511 26.75 199.911 24.3667 199.911 21.7C199.911 19.7 200.244 17.85 200.911 16.15C201.577 14.45 202.511 12.9833 203.711 11.75C204.911 10.4833 206.327 9.51667 207.961 8.85C209.627 8.15 211.444 7.8 213.411 7.8C215.344 7.8 217.094 8.13333 218.661 8.8C220.261 9.46667 221.627 10.4167 222.761 11.65C223.927 12.8833 224.811 14.3333 225.411 16C226.044 17.6667 226.327 19.5 226.261 21.5L226.211 23.6H205.211L204.061 18.95H218.761L217.861 19.95V19C217.861 18.2667 217.661 17.6333 217.261 17.1C216.894 16.5333 216.394 16.1 215.761 15.8C215.127 15.5 214.411 15.35 213.611 15.35C212.477 15.35 211.527 15.5833 210.761 16.05C210.027 16.4833 209.461 17.1167 209.061 17.95C208.661 18.7833 208.461 19.7833 208.461 20.95C208.461 22.2833 208.727 23.4333 209.261 24.4C209.827 25.3667 210.644 26.1167 211.711 26.65C212.811 27.1833 214.144 27.45 215.711 27.45C216.744 27.45 217.644 27.3167 218.411 27.05V27.05C219.932 26.5428 221.724 26.7236 222.653 28.0308L225.261 31.7C224.094 32.6333 222.911 33.3833 221.711 33.95C220.544 34.4833 219.377 34.8667 218.211 35.1C217.044 35.3667 215.861 35.5 214.661 35.5Z"
                  fill="white"
                />
                <path
                  d="M234.357 35.55C232.857 35.55 231.691 35.1333 230.857 34.3C230.057 33.4667 229.657 32.2833 229.657 30.75C229.657 29.35 230.091 28.2 230.957 27.3C231.824 26.4 232.957 25.95 234.357 25.95C235.824 25.95 236.974 26.3667 237.807 27.2C238.641 28.0333 239.057 29.2167 239.057 30.75C239.057 32.15 238.624 33.3 237.757 34.2C236.891 35.1 235.757 35.55 234.357 35.55Z"
                  fill="white"
                />
              </g>
              <g filter="url(#filter1_i_0_1)">
                <path
                  d="M0.399994 35L14.35 0V0C19.1784 0 23.517 2.94909 25.2936 7.43876L32.5757 25.841C34.3147 30.2356 31.0762 35 26.35 35V35L20.35 18.75C20.0167 17.85 19.7167 17.0167 19.45 16.25C19.1833 15.4833 18.9333 14.7333 18.7 14C18.4667 13.2667 18.2333 12.5167 18 11.75C17.8 10.9833 17.6167 10.15 17.45 9.25L19.05 9.2C18.85 10.1667 18.6333 11.0333 18.4 11.8C18.2 12.5667 17.9833 13.3 17.75 14C17.5167 14.7 17.25 15.4333 16.95 16.2C16.6833 16.9667 16.3833 17.8167 16.05 18.75L13.3925 25.9474C11.3839 31.3873 6.19893 35 0.399994 35V35ZM7.19999 29.2L10.15 22.2H26.35L29.1 29.2H7.19999Z"
                  fill="#4267B2"
                />
                <path
                  d="M39.1191 35V8.35H42.4043C45.4575 8.35 47.9936 10.7052 48.2191 13.75V13.75L46.3191 14.35C46.6525 13.0833 47.3025 11.9667 48.2691 11C49.2358 10 50.3858 9.21667 51.7191 8.65C53.0525 8.08333 54.4525 7.8 55.9191 7.8C57.9191 7.8 59.6025 8.21667 60.9691 9.05C62.3691 9.85 63.4191 11.0667 64.1191 12.7C64.8525 14.3 65.2191 16.2667 65.2191 18.6V25.7C65.2191 30.8362 61.0554 35 55.9191 35V35V19.35C55.9191 18.4833 55.7858 17.7667 55.5191 17.2C55.2525 16.6 54.8525 16.15 54.3191 15.85C53.7858 15.55 53.1525 15.4167 52.4191 15.45C51.8525 15.45 51.3191 15.5333 50.8191 15.7C50.3525 15.8667 49.9358 16.1333 49.5691 16.5C49.2025 16.8333 48.9191 17.2167 48.7191 17.65C48.5525 18.0833 48.4691 18.5667 48.4691 19.1V30.35C48.4691 32.9181 46.3873 35 43.8191 35V35C42.6858 35 41.7191 35 40.9191 35C40.1525 35 39.5525 35 39.1191 35Z"
                  fill="#4267B2"
                />
                <path
                  d="M74.441 46.5L80.841 31.4L80.941 35.5L68.291 8.35H69.3847C75.0229 8.35 80.1109 11.7322 82.2933 16.9308L83.141 18.95C83.5077 19.7833 83.8243 20.6167 84.091 21.45C84.391 22.25 84.6077 23.0167 84.741 23.75L83.691 24.55C83.8243 24.1167 84.0243 23.5167 84.291 22.75C84.5577 21.9833 84.8577 21.1 85.191 20.1L89.241 8.35V8.35C94.1781 8.35 97.4988 13.4083 95.5355 17.9382L88.141 35L86.8835 38.1099C84.8331 43.1808 79.9107 46.5 74.441 46.5V46.5Z"
                  fill="#4267B2"
                />
              </g>
              <defs>
                <filter
                  id="filter0_i_0_1"
                  x="109.15"
                  y="0"
                  width="129.907"
                  height="39.55"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite
                    in2="hardAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                  />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="shape"
                    result="effect1_innerShadow_0_1"
                  />
                </filter>
                <filter
                  id="filter1_i_0_1"
                  x="0.399994"
                  y="0"
                  width="95.7087"
                  height="50.5"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite
                    in2="hardAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                  />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="shape"
                    result="effect1_innerShadow_0_1"
                  />
                </filter>
              </defs>
            </svg>
          </Link>

          <div className="   flex justify-evenly gap-2 items-center ">
            <div className=" flex  items-center justify-center  bg-[#292c3099] w-[40px] h-[40px] rounded-full ">
              <FiSearch
                onClick={showSBar}
                className=" cursor-pointer w-[23px] h-[23px] font-semibold "
              />
            </div>

            <div className=" flex items-center justify-center  bg-[#292c3099] w-[40px] h-[40px] rounded-full ">
              <IoMenu
                onClick={showSprofile}
                className=" w-[23px] h-[23px] font-semibold "
              />
            </div>
          </div>
        </div>

        
      </div>
      <div className={side}>
        <div className=" flex justify-center mt-[2rem] px-[0rem]  w-[100%]   ">
          <div className=" flex items-center w-[100%] h-[1rem] justify-between gap-2  ">
            <div onClick={hideSBar} className=" flex   cursor-pointer ">
              <BsArrowLeft className=" text-2xl font-bold drop-shadow-md " />
            </div>
            <div className=" text-slate-100 w-[100%] flex justify-center ">
              <Input
                value={id}
                onChange={search}
                className=" text-slate-100 bg-[#292c3099] tracking-widest  rounded-full  w-[90%] "
                icon={<AiOutlineSearch />}
                variant="unstyled"
                placeholder="Search on facebook"
                radius="xl"
                styles={(theme) => ({
                  input: {
                    color: "white",
                  },
                })}
              />
            </div>
          </div>
        </div>
        <div className=" h-[screen] overflow-auto flex flex-col gap-4  items-left w-[100%] px-[1rem] py-[2rem] ">
          { id.length >0 &&
          searchUser?.map((data) => {
            return (
              <div className=" min-h-auto bg-[#333333] w-[20rem] flex gap-2 rounded-tr-full rounded-l-full  p-[.2rem] shadow-md ">
                <img
                  className=" rounded-full w-[3rem] h-[3rem] hover:w-[4rem] hover:h-[4rem] "
                  src={data?.avatar}
                  alt="user_photo"
                />

                <p className=" w-[13rem] "> {data?.name} </p>

                <Link to={`/${data?.name}`}
                  className=" cursor-pointer text-[#0062E0] text-sm h-100% justify-center flex items-center"
                  onClick={
                    () => {
                      setSide(hideSide);
                    }

                  }
                >
                  <p>View profile ></p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div className={sideP}>
        <div className="  flex justify-center mt-[2rem]  w-[100%] px-[1rem]  ">
          <div className=" flex items-center w-[100%] h-[1rem] justify-between gap-2  ">
            <div onClick={hideSBar} className=" flex   cursor-pointer ">
              <BsArrowLeft className=" text-2xl font-bold drop-shadow-md " />
            </div>
            <div
              onClick={showSBar}
              className=" bg-[#292c3099] rounded-full p-[.5rem] gap-3 w-[90%] flex justify-center items-center  text-slate-100 "
            >
              <div>
                <AiOutlineSearch className=" text-xl " />
              </div>
              <div>Search Facebook</div>
            </div>
          </div>
        </div>
        <div className=" w-[100%]   flex flex-col px-[2.4rem] gap-5  ">
          <Link
            to={`/${user?.name}`}
            onClick={hideSBar}
            className="  flex gap-3 mt-[1rem] h-[60px] w-[100%] items-center justify-start   "
          >
            <img
              className=" object-cover rounded-full w-[50px] h-[50px] "
              src={user?.avatar}
              alt=""
            />
            <div className=" flex flex-col items-left justify-start  ">
              <p className=" text-lg  "> {user?.name} </p>
              <Link
                onClick={setUId}
                to={`/${user?.name}`}
                className=" text-[#8e8a8a]   "
              >
                View your profile
              </Link>
            </div>
          </Link>

          <Link
            onClick={hideSBar}
            to={"/saved"}
            className=" cursor-pointer p-[4px] rounded-[4px] justify-start bg-[#33333379]  items-center flex w-[100%] gap-2 "
          >
            <i className="saved"></i> <p>Saved</p>
          </Link>

          <div onClick={logout}>
            <h1 className=" cursor-pointer text-red-600 p-[8px] rounded-[4px] justify-start bg-[#33333379]  items-center flex w-[100%] gap-2 ">
              <p> Logout</p>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBarM;
// 