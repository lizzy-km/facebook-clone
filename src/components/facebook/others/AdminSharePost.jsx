import { useState } from "react";
import "../common/app.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import {
  SavePost,
  deleteSavePost,
  deleteSharePost,
} from "../../../redux/services/UserPhotoSlice";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { PiShareFatFill, PiShareFatLight } from "react-icons/pi";
import { Box } from "@chakra-ui/react";
import AuthFun from "../../../pages/AuthFun";

const AdminSharePost = ({ data, isLogout }) => {
  // Get the user data from the UserPhotoSlice state
  const { user } = AuthFun();

  // Initialize the state variable
  const [state, setState] = useState(0);

  // Get the value of the 'LikesS' cookie
  const likesC = Cookies.get(`LikesS${data?.id}`);

  let like;
  let likec;

  // Check the value of likesC and assign the appropriate JSX elements
  if (likesC > 0) {
    like = <p>{likesC}</p>;
  }

  if (likesC > 1) {
    likec = <p>Likes</p>;
  }

  if (likesC == 0) {
    likec = <p></p>;
  }

  if (likesC == 1) {
    likec = <p>Like</p>;
  }

  // Initialize the initialReact variable
  const initialReact = "";

  // Define the heart and fillHeart JSX elements
  const heart = (
    <AiOutlineHeart
      onClick={() => {
        setState(state + 1);
        Cookies.set(`LikesS${data?.id}`, state + 1);
      }}
      className=" "
    />
  );

  const fillHeart = (
    <AiFillHeart
      onClick={() => {
        setState(state - 1);
        Cookies.set(`LikesS${data?.id}`, state - 1);
      }}
      className=" text-[#e03434] "
    />
  );

  // Initialize the reactic state variable
  const [reactic, setReactic] = useState(heart);

  // Initialize the postMenu and setPostMenu state variables
  const [postMenu, setPostMenu] = useState(
    " text-sm right-[-40%] z-[1111] post-menu p-[.5rem] rounded-[8px] flex flex-col gap-3 absolute "
  );

  // Function to show the post menu
  const showPostMenu = () => {
    setPostMenu(
      " text-sm right-[0%] post-menu p-[.5rem] rounded-[8px] flex flex-col gap-0 absolute "
    );
  };

  // Function to hide the post menu
  const hidePostMenu = () => {
    setPostMenu(
      " text-sm right-[-40%] post-menu p-[.5rem] rounded-[8px] flex flex-col gap-3 absolute "
    );
  };

  // Get the value of the 'shareIcon' cookie
  const shareIcon = Cookies.get(`shareIcon ${data?.user?.username}`);

  // Get the dispatch function from the useDispatch hook
  const dispatchM = useDispatch();

  // Get the saved posts from the UserPhotoSlice state
  const saved = useSelector((state) => state.UserPhotoSlice.savePost);

  // Check if the current post is already saved
  const isExisted = saved?.find((item) => item.id === data?.id);

  // Get the value of the 'token' cookie
  const token = Cookies.get("token");

  // Remove the 'shareIcon' cookie if the token is not present
  !token && Cookies.remove(`shareIcon ${data?.user?.username}`);

  // Get the share posts from the UserPhotoSlice state
  const sharePost = useSelector((state) => state.UserPhotoSlice.sharePost);

  // Check if the current post is already shared
  const isExistedSp = sharePost?.find((item) => item.id === data?.id);
  const setUId = () => {
    Cookies.set("UserId", user?.id);
  };
  return (
    <Box w={["100%", 400, 500]}>
      <div className="all_post flex flex-col justify-center my-2 p-  text-white">
        <div className="all_post_data relative overflow-hidden flex flex-col bg-blur-p w-full rounded-lg max-[991px]:px-[3.7rem] max-[760px]:px-0  p-2">
          <div className="all_p_owner pb-[8px] border-b-0 border-[#444445] flex justify-start w-full h-14 text-white">
            <Link to={`/${user?.name}`}>
              <img
                className="p_o_p w-10 h-10 rounded-full bg-gray-700 object-cover m-2"
                src={user?.avatar}
                alt={`${user?.name}'s profile picture`}
              />
            </Link>
            <a href="/" className="p_o_n p-2 flex text-sm w-auto gap-2 ml-1">
              <Link onClick={setUId} to={`/${user?.name}`} className="span">
                You
              </Link>
              <span className=" opacity-70 w-auto "> shared </span>
              <Link to={`/${data?.user?.username}`}>
                {data?.user?.username}'s
              </Link>
              <span className=" opacity-70 ">post</span>
            </a>
            <div className=" flex  overflow-hidden max-[450px]:w-[30%]  w-[45%] justify-end items-top px-[1rem]  ">
              <div
                onMouseOut={hidePostMenu}
                onMouseEnter={showPostMenu}
                className=" text-lg mpost-menu font-semibold cursor-pointer "
              >
                . . .
              </div>

              {isExisted && (
                <div
                  onMouseOut={hidePostMenu}
                  onMouseEnter={showPostMenu}
                  className={postMenu}
                >
                  <span
                    onClick={() => dispatchM(deleteSharePost(data))}
                    onMouseOut={hidePostMenu}
                    onMouseEnter={showPostMenu}
                  >
                    Delete post
                  </span>

                  <span
                    onClick={() => dispatchM(deleteSavePost(data))}
                    onMouseOut={hidePostMenu}
                    onMouseEnter={showPostMenu}
                  >
                    Unsaved post
                  </span>
                </div>
              )}
              {!isExisted && (
                <div
                  onMouseOut={hidePostMenu}
                  onMouseEnter={showPostMenu}
                  className={postMenu}
                >
                  <span
                    onClick={() => dispatchM(deleteSharePost(data))}
                    onMouseOut={hidePostMenu}
                    onMouseEnter={showPostMenu}
                  >
                    Delete post
                  </span>

                  <span
                    onClick={() =>
                      dispatchM(
                        SavePost({
                          id: data?.id,
                          description: data?.description,
                          urls: {
                            full: data?.urls?.full,
                          },
                          user: {
                            profile_image: {
                              large: data?.user?.profile_image?.large,
                            },
                            username: data?.user?.username,
                          },
                        })
                      )
                    }
                    onMouseOut={hidePostMenu}
                    onMouseEnter={showPostMenu}
                  >
                    Save post
                  </span>
                </div>
              )}

              {/* </div> */}
            </div>
          </div>
          <div className=" pl-[10px] pt-[1rem] ">
            <div className="all_p_owner border-t-2 mt-[8px] border-[#444445]  rounded-[8px] p-[10px] flex justify-start w-full h-12 text-white">
              <Link to={`/profile/${data?.user?.username}`}>
                <img
                  className="p_o_p w-10 h-10 rounded-full bg-gray-700 object-cover m-2"
                  src={data?.user?.profile_image?.large}
                  alt={`${data?.user?.username}'s profile picture`}
                />
              </Link>
              <a
                href={`profile/${data?.user?.username}`}
                className="p_o_n p-2 ml-1"
              >
                <span className="span">{data?.user?.username}</span>
              </a>
            </div>
            <div className=" p-[10px] post_data flex flex-col">
              <div className="p_d_tex py-2 m-2">
                <p>{data?.description}</p>
              </div>
              <img
                className="p_d_p w-full min-h-[400px] h-auto object-cover"
                src={data?.urls?.full}
                alt="post image"
              />
            </div>
          </div>

          <div className="post_react flex flex-col py-[1rem]  w-full">
            <div className="p_r_count flex justify-between px-[1rem] m-2 w-full">
              <div
                id={data?.id}
                className="p_l_c cursor-pointer w-auto flex gap-1"
              >
                {like}
                {likec}
              </div>
              <div className="p_c_c cursor-pointer"></div>
              <div className="p_s_c cursor-pointer"></div>
            </div>
            <div className=" pt-2 flex  justify-between px-[1rem]  w-[100%] border-[#494949]  border-t-[1px]  ">
              <div
                type="submit"
                key={data?.id}
                id={data?.id}
                className="p_r_r text-center   flex relative items-start"
              >
                <div className="flex opacity-80 items-start text-3xl cursor-pointer justify-center ">
                  {likesC > 0 && fillHeart}
                  {likesC == 0 && heart}
                  {!likesC && heart}
                  {/* {react} */}
                </div>
              </div>

              <div className="flex   justify-end items-end">
                <div className=" cursor-pointer text-[28px] opacity-75 ">
                  <FaRegCommentDots />
                </div>
              </div>
              <div className="p_r_s flex h-auto justify-center cursor-pointer items-center">
                {isExistedSp && (
                  <button className=" text-[28px] " disabled="disabled">
                    <PiShareFatFill />
                  </button>
                )}
                {!isExistedSp && (
                  <button
                    onClick={() => {
                      disapatchM(
                        SharePost({
                          id: data?.id,
                          description: data?.description,
                          urls: {
                            full: data?.urls?.full,
                          },
                          user: {
                            profile_image: {
                              large: data?.user?.profile_image?.large,
                            },
                            username: data?.user?.username,
                          },
                        })
                      );
                      setShare("cursor-pointer text-blue-700 font-semibold ");

                      //  Cookies.set(`shareIcon ${data?.user?.username}`, JSON.stringify(share))
                    }}
                    className="cursor-pointer text-[28px]  "
                  >
                    <PiShareFatLight />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>

    // </div>
  );
};

export default AdminSharePost;
