import { useState } from "react";
import "./app.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import Cookies from "js-cookie";
import { useDeletePostMutation } from "../../../redux/api/AuthApi";
import {
  SavePost,
  deleteSavePost,
} from "../../../redux/services/UserPhotoSlice";
import { isValidUrl, postDate } from "../../facebook/common/data";
import AuthFun from "../../../pages/AuthFun";
import { addViewImage } from "../../../redux/services/authSlice";

const AdminPostCardM = ({ data, isLogout }) => {
  // Initialize state with a value of 0
  const [state, setState] = useState(0);

  // Get the number of likes from the cookies
  const likeN = data?.price;

  // Define the heart icon for liking a post
  const heart = (
    <AiOutlineHeart
      onClick={() => {
        // Increment the state by 1 and update the cookies with the new value
        setState(state + 1);
        Cookies.set(`likes${data?.id}`, JSON.stringify(state + 1));
      }}
      className="  "
    />
  );

  // Define the filled heart icon for unliking a post
  const fillHeart = (
    <AiFillHeart
      onClick={() => {
        // Decrement the state by 1 and update the cookies with the new value
        setState(state - 1);
        Cookies.set(`likes${data?.id}`, JSON.stringify(state - 1));
      }}
      className=" text-[#e03434] "
    />
  );

  let like;
  let likec;

  // Check if there are likes
  if (likeN > 0) {
    like = <p>{likeN}</p>;
  }

  // Check if there are more than 1 like
  if (likeN > 1) {
    likec = <p>Likes</p>;
  }

  // Check if there are no likes
  if (likeN == 0) {
    likec = <p></p>;
  }

  // Check if there is only 1 like
  if (likeN == 1) {
    likec = <p>Like</p>;
  }

  // Delete post function
  const [deletePost] = useDeletePostMutation();
  const deletePostD = async () => {
    try {
      const del = await deletePost(data?.id);
    } catch (error) {
      //(error);
    }

    // window.location.reload(true)
  };

  // Get user data from the state
  const { publicFun } = AuthFun();

  const { publicProfile } = publicFun(data?.price);
  const user = publicProfile;

  //(publicProfile);

  // Initialize post menu state
  const [postMenu, setPostMenu] = useState(
    " text-sm right-[-80%] z-[1111] post-menu p-[.5rem] rounded-[8px] flex flex-col gap-3 absolute "
  );

  // Show post menu function
  const showPostMenu = () => {
    setPostMenu(
      " text-sm right-[0%] top-[0%] post-menu p-[.5rem] rounded-[8px] flex flex-col gap-0 absolute "
    );
  };

  // Hide post menu function
  const hidePostMenu = () => {
    setPostMenu(
      " text-sm right-[-80%] post-menu p-[.5rem] rounded-[8px] flex flex-col gap-3 absolute "
    );
  };

  const dispatchM = useDispatch();

  // Regular expression to check if string is email
  const regexExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

  const email = regexExp.test(data?.address); // true

  const mailAddress = `mailto:${data?.address}`;

  const dispatch = useDispatch();
  // Get the saved posts from the Redux store
  const saved = useSelector((state) => state.UserPhotoSlice.savePost);

  // Check if the current post is already saved
  const isExisted = saved?.find((item) => item.id === data?.id);

  const date = postDate(data);

  if (data?.category?.name === "post") {
    return (
      <div className=" snap-center w-[100%] flex justify-center items-center   ">
        <div className="all_post w-[100%] flex flex-col justify-center  text-white">
          <div className="all_post_data relative flex flex-col bg-blur-p w-full rounded-lg   ">
            <div className="all_p_owner  flex justify-start w-full p-2 h-auto py-2 text-white">
              <Link
                className=" min-w-40 rounded-full  object-cover m-2"
                to={`/${data?.title}`}
              >
                <img
                  className=" w-24 h-10  rounded-full bg-gray-700 object-cover  "
                  src={user?.avatar}
                  alt={`${data?.title}'s profile picture`}
                />
              </Link>
              <a
                href={`/${data?.title}`}
                className=" p-2 flex flex-col justify-start items-start  w-full gap-0 "
              >
                <span className="span w-full flex  ">
                  {data?.title}{" "}
                  {publicProfile?.email === user?.email && <p> (You) </p>}
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
                            id: data?.id,
                            description: data?.description,

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
              <div className="p_d_tex p-2 m-2">
                
                {data?.description !=='.nul' && (
                  <div className=" break-words w-[96%] ">
                    {data?.description}
                  </div>
                )}{" "}
              </div>
              {isValidUrl(data?.images)  &&
                  data?.images != "https://example.com/example.jpg" && (
                <img
                  onClick={() => dispatch(addViewImage(data?.images))}
                  className="p_d_p w-full h-auto object-cover"
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
                    {likeN > 0 && fillHeart}
                    {likeN == 0 && heart}
                    {!likeN && heart}
                    {/* {react} */}
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
      </div>

      // </div>
    );
  }
};

export default AdminPostCardM;
