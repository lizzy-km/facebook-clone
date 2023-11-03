import { useState } from "react";
import "./app.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  SavePost,
  SharePost,
  deleteSavePost,
} from "../../../redux/services/UserPhotoSlice";
import Cookies from "js-cookie";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { PiShareFatFill, PiShareFatLight } from "react-icons/pi";
import {
  usePhotoLikesMutation,
  usePhotoUnLikesMutation,
} from "../../../redux/api/PhotoApi";
import { Box } from "@chakra-ui/react";

const PostCard = ({ data, isLoading }) => {
  // Set the initial state and state updater function using the useState hook
  const [state, setState] = useState(data?.likes);

  // Get the likeN and likeC values from cookies
  const likeN = Cookies.get(`likes${data?.id}`);
  const likeC = Cookies.get(`likesC${data?.id}`);

  // Set up mutation functions for setting likes and unlikes
  const [setLikes] = usePhotoLikesMutation();
  const [setUnLikes] = usePhotoUnLikesMutation();

  // Define the heart icon component for liking a photo
  const heart = (
    <AiOutlineHeart
      onClick={() => {
        // Call the setLikes mutation function to increment the likes count
        setLikes(data?.id);
        // Update the state to reflect the new likes count
        setState(state + 1);
        // Update the likes count in cookies
        Cookies.set(`likesC${data?.id}`, state + 1);
        Cookies.set(`likes${data?.id}`, JSON.stringify(true));
      }}
      className="  "
    />
  );

  // Define the filled heart icon component for unliking a photo
  const fillHeart = (
    <AiFillHeart
      onClick={() => {
        // Call the setUnLikes mutation function to decrement the likes count
        setUnLikes(data?.id);
        // Update the state to reflect the new likes count
        setState(state - 1);
        // Update the likes count in cookies
        Cookies.set(`likesC${data?.id}`, state - 1);
        Cookies.set(`likes${data?.id}`, JSON.stringify(false));
      }}
      className=" text-[#e03434] "
    />
  );

  // Initialize variables for displaying the likes count and label
  let like;
  let likec;

  // Check the state value to determine the appropriate likes count and label
  if (state > 0) {
    like = <p>{state}</p>;
  }
  if (state > 1) {
    likec = <p>Likes</p>;
  }
  if (state == 0) {
    likec = <p></p>;
  }
  if (state == 1) {
    likec = <p>Like</p>;
  }

  // Set up state and state updater function for the post menu
  const [postMenu, setPostMenu] = useState(
    " text-sm right-[-30%]   z-[1111] post-menu p-[.5rem] rounded-[8px] flex flex-col gap-3 absolute "
  );

  // Function to show the post menu
  const showPostMenu = () => {
    setPostMenu(
      " text-sm right-[0%]    post-menu p-[.5rem] rounded-[8px] flex flex-col gap-0 absolute "
    );
  };

  // Function to hide the post menu
  const hidePostMenu = () => {
    setPostMenu(
      " text-sm right-[-30%]    post-menu p-[.5rem] rounded-[8px] flex flex-col gap-3 absolute "
    );
  };

  // Set up state and state updater function for the share option
  const [share, setShare] = useState(
    "cursor-pointer text-blue-700 font-semibold "
  );

  // Get the shareIcon value from cookies
  const shareIcon = Cookies.get(`shareIcon ${data?.user?.username}`);

  // Get the saved posts from the Redux store
  const saved = useSelector((state) => state.UserPhotoSlice.savePost);

  // Check if the current post is already saved
  const isExisted = saved?.find((item) => item.id === data?.id);

  // Get the token from cookies
  const token = Cookies.get("token");

  // Remove the shareIcon cookie if there is no token
  !token && Cookies.remove(`shareIcon ${data?.user?.username}`);

  // Get the shared posts from the Redux store
  const sharePost = useSelector((state) => state.UserPhotoSlice.sharePost);

  // Check if the current post is already shared
  const isExistedSp = sharePost?.find((item) => item.id === data?.id);


  console.log('post');
  if (isLoading) {
    return (
      <div className=" w-[500px] h-auto ">
        <div className="all_post flex flex-col justify-center my-4 p-2 max-[450px]:m-0 max-[450px]:p-0 text-white">
          <div className="all_post_data overflow-hidden relative flex flex-col bg-blur-p w-full rounded-lg max-[450px]:m-0  m-2">
            <div className="all_p_owner  flex justify-start w-full h-12 text-white">
              <Link to={`/profile/${data?.user?.username}`}>
                <span
                  className="p_o_p min-w-10 max-h-10 rounded-full bg-gray-700 object-cover m-2"
                  src=""
                  alt=""
                />
              </Link>
              <a
                href={`/profile/${data?.user?.username}`}
                className="p_o_n p-2 ml-1"
              >
                <span className="span w-[100px] h-[5px] bg-[#69676793] "></span>
              </a>
              <div className=" flex  overflow-hidden w-[100%] justify-end items-top px-[8px] ">
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
                    {/* <span onMouseOut={hidePostMenu} onMouseEnter={showPostMenu}>Delete post</span> */}
                    <span
                      onClick={() => disapatchM(deleteSavePost(data))}
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
                    {/* <span onMouseOut={hidePostMenu} onMouseEnter={showPostMenu}>Delete post</span> */}
                    <span
                      onClick={() =>
                        disapatchM(
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
              </div>
            </div>
            <div className="post_data  flex flex-col">
              <div className="p_d_tex py-2 m-2">
                <p className=" w-[150px] h-[10px] bg-[#696767fe] "></p>
              </div>
              <span className="p_d_p w-full min-h-[400px] bg-[#696767] h-auto object-cover"></span>
            </div>
            <div className="post_react flex flex-col m-2 p-2 w-full">
              <div className="p_r_count flex justify-between m-2 w-full">
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
              <div className="p_r_data pt-2 flex justify-between m-2 border-t">
                <div
                  type="submit"
                  key={data?.id}
                  id={data?.id}
                  className="p_r_r text-center   flex relative items-start"
                >
                  <div className="flex opacity-80 items-start text-3xl cursor-pointer justify-center ">
                    {likeN == "true" && fillHeart}
                    {likeN == "false" && heart}
                    {!likeN && heart}
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
      </div>

      // </div>
    );
  } else {
    return (
      <Box w={["100%", "100%", 500]} className=" h-auto ">
        <div className="all_post flex flex-col justify-center my-0   text-white">
          <Box className=" px-0 max-[991px]:px-[3.7rem] max-[760px]:px-0 overflow-hidden relative flex flex-col bg-blur-p w-full rounded-lg   my-2">
            <div className="all_p_owner  flex justify-start w-full h-12 text-white">
              <Link to={`/profile/${data?.user?.username}`}>
                <img
                  className="p_o_p min-w-10 max-h-10 rounded-full bg-gray-700 object-cover m-2"
                  src={data?.user?.profile_image?.large}
                  alt={`${data?.user?.username}'s profile picture`}
                />
              </Link>
              <a
                href={`/profile/${data?.user?.username}`}
                className="p_o_n p-2 ml-1"
              >
                <span className="span">{data?.user?.username}</span>
              </a>
              <div className=" flex  overflow-hidden w-[100%] justify-end items-top px-[8px] ">
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
                    {/* <span onMouseOut={hidePostMenu} onMouseEnter={showPostMenu}>Delete post</span> */}
                    <span
                      onClick={() => disapatchM(deleteSavePost(data))}
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
                    {/* <span onMouseOut={hidePostMenu} onMouseEnter={showPostMenu}>Delete post</span> */}
                    <span
                      onClick={() =>
                        disapatchM(
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
              </div>
            </div>
            <div className="post_data  flex flex-col">
              <div className="p_d_tex py-2 m-2">
                <p>{data?.description}</p>
              </div>
              {data?.urls?.full && (
                <img
                  className="p_d_p w-full min-h-[400px] h-auto object-cover"
                  src={data?.urls?.full}
                  alt="post image"
                />
              )}
            </div>
            <div className="post_react flex flex-col m-2 p-2 w-full">
              <div className="p_r_count flex justify-between m-2 w-full">
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
              <div className="p_r_data pt-2 flex justify-between m-2 border-t">
                <div
                  type="submit"
                  key={data?.id}
                  id={data?.id}
                  className="p_r_r text-center   flex relative items-start"
                >
                  <div className="flex opacity-80 items-start text-3xl cursor-pointer justify-center ">
                    {likeN == "true" && fillHeart}
                    {likeN == "false" && heart}
                    {!likeN && heart}
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
          </Box>
        </div>
      </Box>

      // </div>
    );
  }
};

export default PostCard;
