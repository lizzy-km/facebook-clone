import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { BsArrowLeft } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import {
  HiLogout,
  HiOutlineLockClosed,
  HiOutlineUserCircle,
} from "react-icons/hi";

import "./app.css";
import { Input } from "@mantine/core";
import Cookies from "js-cookie";
import { usePhotoQuery, useSearchQuery } from "../../../redux/api/PhotoApi";
import { useLogoutMutation } from "../../../redux/api/AuthApi";
import AuthFun from "../../../pages/AuthFun";
import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useGetSingleUserQuery } from "../../../redux/api/PostApi";

const NavBar = ({ setIsLogout }) => {
  const navigate = useNavigate();

  const token = Cookies.get("token");

  const [id, setId] = useState("");
  const userList = useGetSingleUserQuery();
  const searchUser = userList?.data?.filter((user) =>
    user.name.toLowerCase().includes(id.toLowerCase())
  );

  const search = (e) => {
    setId(e.target.value);
  };

  const hideSide =
    "    absolute text-slate-50  bg-[#18191A] top-[0%] left-[120%] min-h-[900px] w-screen  ";
  const showdSide =
    " z-[999] flex flex-col gap-4 justify-start items-start   absolute text-slate-50  bg-[#18191A] top-[0%] left-[0%] h-screen   w-[100%]  ";
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

  const sn =
    " w-[100%] z-[9999] sticky top-0 h-[60px] flex justify-center items-center  ";
  const hd = "d-none fixed ";
  const [nav, setNav] = useState(sn);

  useEffect(() => {
    if (!token) {
      setNav(hd);
    } else {
      setNav(sn);
    }
  }, [token]);

  const { currentData } = usePhotoQuery();
  const [signout] = useLogoutMutation();

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
    navigate(`/${user?.name}`);
  };

  return (
    <div className={nav}>
      <div className=" bg-img  relative items-center  gap-0  flex  shadow border-b-[1px] border-[#292c30] bg-[#1c1e21] w-[100%] h-[60px] text-slate-100 ">
        <div className=" p-[.65em] bg-nav-blur w-[20%] flex max-[428px]:justify-between gap-2 items-center  ">
          <Link to={"/"} className="">
            <svg
              width="54"
              height="54"
              viewBox="0 0 94 94"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Alogo" filter="url(#filter0_i_1_5)">
                <path
                  d="M60.9632 79.0941C43.2381 86.8057 22.6176 78.6883 14.9059 60.9632V60.9632C7.19427 43.2381 15.3117 22.6176 33.0368 14.9059V14.9059C50.7618 7.19427 71.3824 15.3117 79.0941 33.0368L87.6082 52.6063C90.6176 59.5234 87.4499 67.5705 80.5328 70.5799L60.9632 79.0941Z"
                  fill="#131314"
                />
                <g id="AnyNote." filter="url(#filter1_i_1_5)">
                  <path
                    d="M30.4974 61.7031L44.6117 26.7691V26.7691C49.4401 26.7918 53.7648 29.7612 55.5203 34.2592L62.7157 52.6955C64.434 57.0982 61.1732 61.8473 56.4471 61.8251V61.8251L54.3328 56.0151L51.7811 49.003L50.5235 45.5471C50.1944 44.6455 49.8983 43.8108 49.6353 43.0429C49.3722 42.2749 49.1258 41.5238 48.8959 40.7894C48.7381 40.2853 48.5804 39.7734 48.4227 39.2536C48.3506 39.0161 48.2785 38.7769 48.2065 38.5361C48.0101 37.7685 47.8306 36.9343 47.6682 36.0335L49.2684 35.991C49.0639 36.9568 48.8431 37.8224 48.6062 38.588C48.5464 38.8127 48.4853 39.0346 48.4227 39.2536C48.272 39.7807 48.113 40.2911 47.9459 40.7849C47.7093 41.4838 47.4391 42.2159 47.1355 42.9811C46.8653 43.7465 46.5613 44.5951 46.2236 45.5268L44.9335 48.9708L42.316 55.9586V55.9586C41.0127 59.4379 37.6799 61.7369 33.9646 61.7194L30.4974 61.7031ZM37.3245 55.9351L40.3074 48.9491L44.9335 48.9708L51.7811 49.003L56.5072 49.0252L59.2243 56.0381L54.3328 56.0151L42.316 55.9586L37.3245 55.9351Z"
                    fill="#4267B2"
                  />
                  <path
                    d="M73.4969 61.9052C71.9969 61.8982 70.8322 61.476 70.0028 60.6388C69.2067 59.8017 68.8123 58.6165 68.8195 57.0832C68.8261 55.6832 69.2648 54.5353 70.1357 53.6393C71.0066 52.7434 72.142 52.2988 73.542 52.3053C75.0087 52.3122 76.1567 52.7343 76.9861 53.5715C77.8155 54.4088 78.2266 55.5941 78.2194 57.1274C78.2128 58.5274 77.7741 59.6753 76.9032 60.5712C76.0323 61.4671 74.8969 61.9118 73.4969 61.9052Z"
                    fill="#ffffff"
                  />
                </g>
              </g>
              <defs>
                <filter
                  id="filter0_i_1_5"
                  x="0.942719"
                  y="0.94273"
                  width="92.1145"
                  height="92.1145"
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
                  <feOffset />
                  <feGaussianBlur stdDeviation="4" />
                  <feComposite
                    in2="hardAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                  />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="shape"
                    result="effect1_innerShadow_1_5"
                  />
                </filter>
                <filter
                  id="filter1_i_1_5"
                  x="30.4973"
                  y="26.7691"
                  width="47.7221"
                  height="39.1362"
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
                    result="effect1_innerShadow_1_5"
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

            <div className=" d-none max-[428px]:flex items-center justify-center  bg-[#292c3099] w-[40px] h-[40px] rounded-full ">
              <IoMenu
                onClick={showSprofile}
                className=" w-[23px] h-[23px] font-semibold "
              />
            </div>
          </div>
        </div>

        <div
          id="1"
          className="nav_m flex p-[.65em] bg-nav-blur justify-evenly items-center gap-[0px] w-[60%] h-[100%]  "
        ></div>

        <div className="  flex px-[2rem]  py-[.6em] bg-nav-blur justify-end gap-0 h-[100%] items-center  w-[20%] ">
          <Box>
            <Button rounded={"full"} w={"30px"}>
              <Menu minW={"40px"}>
                <MenuButton
                  as={Button}
                  w={"40px"}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={"40px"}
                >
                  <Avatar
                    minWw={"39px"}
                    minHh={"39px"}
                    src={user?.avatar}
                    alt=""
                  />
                </MenuButton>

                <MenuList bg={"blackAlpha.800"}>
                  <MenuItem
                    onClick={setUId}
                    bg={"transparent"}
                    color={"gray.200"}
                    gap={"4"}
                  >
                    {" "}
                    <HiOutlineUserCircle /> <p>{user?.name}</p>{" "}
                  </MenuItem>
                  <MenuItem bg={"transparent"} color={"gray.200"} gap={"4"}>
                    {" "}
                    <HiOutlineLockClosed color="blue.200" />{" "}
                    <p>Account setting</p>{" "}
                  </MenuItem>
                  <MenuDivider />

                  <MenuItem
                    bg={"transparent"}
                    color={"GrayText"}
                    onClick={logout}
                    color={"red.500"}
                    gap={"4"}
                  >
                    <HiLogout /> <p>Logout</p>{" "}
                  </MenuItem>
                </MenuList>
              </Menu>
            </Button>
          </Box>
        </div>
      </div>
      <div className={side}>
        <div className=" flex justify-left mt-[2rem] px-[1rem]  w-[100%] ] max-[360px]:px-[2rem] ">
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
        <div className=" h-[screen] overflow-auto flex flex-col gap-4  items-left w-[100%] px-[7rem] py-[2rem] ">
          {id.length > 0 &&
            searchUser?.map((data) => {
              return (
                <div className=" min-h-auto bg-[#333333] w-[25rem] flex gap-2 rounded-tr-full rounded-l-full  p-[.2rem] shadow-md ">
                  <img
                    className=" rounded-full w-[3rem] h-[3rem] hover:w-[4rem] hover:h-[4rem] "
                    src={data?.avatar}
                    alt="user_photo"
                  />

                  <p className=" w-[13rem] "> {data?.name} </p>

                  <Link
                    to={`/${data?.name}`}
                    className=" cursor-pointer text-[#0062E0] text-sm h-100% justify-center flex items-center"
                    onClick={() => {
                      setSide(hideSide);
                    }}
                  >
                    <p>View profile ></p>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
