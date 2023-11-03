import { useState } from "react";
import "./app.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import Cookies from "js-cookie";
import { Badge, Box, Flex } from "@chakra-ui/react";
import { useDeletePostMutation } from "../../../redux/api/AuthApi";
import { extractEmails, isValidUrl, postDate } from "./data";
import {
  SavePost,
  deleteSavePost,
} from "../../../redux/services/UserPhotoSlice";
import {
  useDeleteProductsMutation,
  useGetSingleUserQuery,
} from "../../../redux/api/PostApi";
import AuthFun from "../../../pages/AuthFun";
import { addStoryImage, addViewImage } from "../../../redux/services/authSlice";

const AdminPostCard = ({ data }) => {
  const { name } = useParams();

  //Get USer
  const { user, publicFun } = AuthFun();

  const { publicProfile } = publicFun(data?.price);

  //(publicProfile);

  const [state, setState] = useState(0);

  const likeCount = Cookies.get(`likes${data?.id}`);
  const likeN = data?.price;

  const heart = (
    <AiOutlineHeart
      onClick={() => {
        setState(state + 1);
        Cookies.set(`likes${data?.id}`, state + 1);
      }}
      className="  "
    />
  );

  const fillHeart = (
    <AiFillHeart
      onClick={() => {
        setState(state - 1);
        Cookies.set(`likes${data?.id}`, state - 1);
      }}
      className=" text-[#e03434] "
    />
  );

  let like;
  let likec;

  if (likeN > 0) {
    like = <p>{likeN}</p>;
  }
  if (likeCount > 0) {
    like = <p>You and</p>;

    likec = <p> {likeN} others </p>;
  }

  if (likeCount < 1) {
    likec = <p>Likes</p>;
  }

  if (likeN == 0) {
    likec = <p></p>;
  }

  if (likeN == 1) {
    likec = <p>Like</p>;
  }

  const [postMenu, setPostMenu] = useState(
    " text-sm right-[-30%]   z-[1111] post-menu p-[.5rem] rounded-[8px] flex flex-col gap-3 absolute "
  );

  const showPostMenu = () => {
    setPostMenu(
      " text-sm right-[0%]    post-menu p-[.5rem] rounded-[8px] flex flex-col gap-0 absolute "
    );
  };

  const hidePostMenu = () => {
    setPostMenu(
      " text-sm right-[-30%]    post-menu p-[.5rem] rounded-[8px] flex flex-col gap-3 absolute "
    );
  };

  const [deletePost] = useDeleteProductsMutation();

  const deletePostD = async () => {
    try {
      const del = await deletePost(data?.id);
      if (del?.success) {
        window.location.reload(true);
      }
    } catch (error) {
      //(error);
    }
  };

  const regexExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

  const email = regexExp.test(data?.description); // true

  const mailAddress = `mailto:${data?.description}`;

  const dispatch = useDispatch();
  // Get the saved posts from the Redux store
  const saved = useSelector((state) => state.UserPhotoSlice.savePost);

  // Check if the current post is already saved
  const isExisted = saved?.find((item) => item.id === data?.id);

  const setUId = () => {
    Cookies.set("UserId", data?.price);
  };

  const date = postDate(data);

  //(data);

  const setView = () => {
    dispatch(addViewImage(data?.images));
  };

  function checkImageUrl(url, callback) {
    const img = new Image();

    img.onload = function () {
      // Image exists
      callback(true);
    };

    img.onerror = function () {
      // Image does not exist
      callback(false);
    };

    img.src = url;
  }

  // Usage
  const imageUrl = data?.images;
  const [isImg, setIsImg] = useState(false);
  checkImageUrl(imageUrl, function (exists) {
    if (exists) {
      setIsImg(true);
    } else {
      setIsImg(false);
    }
  });

  const admin = " (You)";

  const { useOnlineStatus } = AuthFun();

  const isOnline = useOnlineStatus();

  //   //(data?.id +' ' + diffDay + ' '+ diffHour +' '+diffMinute);
  if (data?.category?.name === "post") {
    return (
      <>
        <Box w={["100%", 400, 500]}>
          <div className="all_post flex flex-col justify-center my-2 w-full  text-white">
            <div className="all_post_data relative overflow-hidden flex flex-col bg-blur-p w-auto rounded-lg max-[991px]:px-[3.7rem] max-[760px]:px-0  p-2">
              <div className="all_p_owner gap-2  flex justify-start w-full h-auto text-white">
                <Link
                  className="min-w-[40px] h-[40px] relative   rounded-full"
                  onClick={setUId}
                  to={`/${publicProfile?.name}`}
                >
                  <img
                    className="p_o_p w-[40px] h-[40px]  rounded-full  object-cover m-2"
                    src={publicProfile?.avatar}
                    alt={`${publicProfile?.name}'s profile picture`}
                  />
                  <Badge
                    border={"1.5px solid #333333"}
                    right={"-2"}
                    bottom={"-2"}
                    position={"absolute"}
                    p={"1"}
                    rounded={"full"}
                    bg={isOnline ? "green.500" : "gray.600"}
                  />
                </Link>
                <a
                  onClick={setUId}
                  href={`/${publicProfile?.name}`}
                  className=" p-2 flex flex-col justify-start items-start  w-full gap-0 ml-1"
                >
                  <span className="span w-auto flex gap-2  ">
                    {publicProfile?.name}
                    {publicProfile?.email === user?.email && (
                      <p> {" " + admin} </p>
                    )}
                  </span>

                  {date.diffYear > 0 && (
                    <span className=" opacity-70 text-xs ">
                      {" "}
                      {date.postYear} {date.month} {date.postDay}{" "}
                    </span>
                  )}
                  {date.diffYear === 0 && date.nowMonth !== date.postMonth && (
                    <span className=" opacity-70 text-xs ">
                      {" "}
                      {date.month} {date.postDay}{" "}
                    </span>
                  )}
                  {date.diffYear === 0 &&
                    date.nowMonth === date.postMonth &&
                    date.diffDay > 0 && (
                      <span className=" opacity-70 text-xs ">
                        {" "}
                        {date.diffDay}d{" "}
                      </span>
                    )}
                  {date.diffYear === 0 &&
                    date.nowMonth === date.postMonth &&
                    date.diffDay < 1 &&
                    date.diffHour > 0 && (
                      <span className=" opacity-70 text-xs ">
                        {" "}
                        {date.diffHour}h{" "}
                      </span>
                    )}
                  {date.diffYear === 0 &&
                    date.nowMonth === date.postMonth &&
                    date.diffHour < 1 &&
                    date.diffDay < 1 &&
                    date.diffMinute > 0 && (
                      <span className=" opacity-70 text-xs ">
                        {" "}
                        {date.diffMinute}m{" "}
                      </span>
                    )}
                  {date.diffYear === 0 &&
                    date.nowMonth === date.postMonth &&
                    date.diffMinute < 1 &&
                    date.diffDay < 1 &&
                    date.diffHour < 1 && (
                      <span className=" opacity-70 text-xs text-green-600 ">
                        {" "}
                        now{" "}
                      </span>
                    )}
                </a>
                <div className=" flex  overflow-hidden w-[100%] justify-end items-top px-[8px] ">
                  <div
                    onMouseOut={hidePostMenu}
                    onMouseEnter={showPostMenu}
                    className=" text-lg mpost-menu font-semibold cursor-pointer "
                  >
                    . . .
                  </div>
                  <div
                    onMouseOut={hidePostMenu}
                    onMouseEnter={showPostMenu}
                    className={postMenu}
                  >
                    {publicProfile?.email === user?.email && (
                      <span
                        className=" text-red-600  "
                        onClick={deletePostD}
                        onMouseOut={hidePostMenu}
                        onMouseEnter={showPostMenu}
                      >
                        Delete post
                      </span>
                    )}
                    {isExisted && (
                      <span
                        onMouseOut={hidePostMenu}
                        onMouseEnter={showPostMenu}
                        onClick={() => dispatch(deleteSavePost(data))}
                      >
                        {" "}
                        Unsave{" "}
                      </span>
                    )}
                    {!isExisted && (
                      <span
                        onClick={() =>
                          dispatch(
                            SavePost({
                              id: data?.price,
                              description: data?.description,
                              urls: {
                                full: data?.images,
                              },

                              user: {
                                profile_image: {
                                  large: user?.avatar,
                                },
                                username: data?.title,
                              },
                            })
                          )
                        }
                        onMouseOut={hidePostMenu}
                        onMouseEnter={showPostMenu}
                      >
                        Save post
                      </span>
                    )}

                    {/* <span onClick={deletePostD} onMouseOut={hidePostMenu} onMouseEnter={showPostMenu}>Delete post</span> */}
                  </div>
                </div>
              </div>
              <div className="post_data flex flex-col">
                <div className="p_d_tex flex-wrap flex break-words w-[98%]   py-2 m-2">
                  {email && (
                    <a
                      className=" cursor-pointer text-blue-600 font-thin "
                      href={mailAddress}
                    >
                      {" "}
                      {data?.address}{" "}
                    </a>
                  )}
                  {data?.description !=='.nul' && (
                    <div className=" break-words w-[96%] ">
                      {data?.description}
                    </div>
                  )}
                </div>
                {isValidUrl(data?.images) &&
                  isImg &&
                  data?.images != "https://example.com/example.jpg" && (
                    <img
                      onClick={setView}
                      className="p_d_p pp cursor-pointer w-full min-h-[400px] h-auto object-cover"
                      src={data?.images}
                      alt="post image"
                    />
                  )}
              </div>
              <div className="post_react flex flex-col py-2 w-full">
                <div className="p_r_count flex justify-between px-[1rem]  w-full">
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
                    className="p_r_r text-center w-[50%]  flex relative items-start"
                  >
                    <div className="flex opacity-80 items-start text-3xl cursor-pointer justify-center ">
                      {likeCount > 0 && fillHeart}
                      {likeCount < 1 && heart}
                      {!likeCount && heart}
                    </div>
                  </div>

                  <div className="flex w-[50%]  justify-end items-end">
                    <div className=" cursor-pointer text-[28px] opacity-75 ">
                      <FaRegCommentDots />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </>
    );
  }
};

export default AdminPostCard;
