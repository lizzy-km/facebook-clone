import Cookies from "js-cookie";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SharePost, deleteSavePost } from "../redux/services/UserPhotoSlice";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

const SavedCard = ({ data, isLogout }) => {
  const dispatch = useDispatch();
  const [share, setShare] = useState(
    "cursor-pointer text-blue-700 font-semibold "
  );
  isLogout === true && Cookies.remove(`shareIcon ${data?.user?.username}`);
  const shareIcon = Cookies.get(`shareIcon ${data?.user?.username}`);
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 991px)",
  });
  const isDesktop = useMediaQuery({ query: "(min-width: 992px)" });

  const sharePost = useSelector((state) => state.UserPhotoSlice.sharePost);

  const isExistedSp = sharePost?.find((item) => item.id === data?.id);

  if (isDesktop) {
    return (
      <div
        key={data?.id}
        className="  cursor-pointer bg-[#3333336f] rounded-[8px] w-[100%] px-[8px] py-[8px] justify-start items-center gap-3 h-[14rem] flex text-base font-medium text-[#fff] "
      >
        <Link
          to={`/${data?.user?.username}`}
          className=" w-[10rem] h-[10rem] mx-[8px]  rounded-[8px] "
        >
          <img
            className=" min-w-[10rem] h-[100%] rounded-[8px] object-cover "
            src={data?.urls?.full}
            alt=""
          />
        </Link>
        <div className=" flex flex-col gap-2 justify-start relative h-[100%] ">
          <div>
            <h1 className=" line-clamp-2 "> {data?.description} </h1>
          </div>

          <div className=" py-[1rem] flex justify-start gap-2 items-center w-[100%] ">
            <img
              className=" w-10 object-cover h-10 rounded-full "
              src={data?.user?.profile_image?.large}
              alt=""
            />
            <p className=" opgracity-70 text-sm font-normal ">
              Saved post from
            </p>
            <Link to={`/profile/${data?.user?.username}`}>
              {" "}
              {data?.user?.username}'s post{" "}
            </Link>
          </div>

          <div className=" bottom-[5%] place-self-end self-end justify-self-end absolute flex w-[100%] justify-start gap-4 items-center ">
            {isExistedSp && (
              <div className=" bg-[#403f3f7e] py-[.5rem] px-[6rem] rounded-[8px] ">
                <p className={shareIcon}>Shared</p>
              </div>
            )}
            {!isExistedSp && (
              <div
                onClick={() => {
                  dispatch(
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
                  Cookies.set(
                    `shareIcon ${data?.user?.username}`,
                    JSON.stringify(share)
                  );
                }}
                className=" bg-[#403f3f7e] py-[.5rem] px-[6rem] rounded-[8px] "
              >
                <p className={shareIcon}>Share</p>
              </div>
            )}

            <div
              onClick={() => dispatch(deleteSavePost(data))}
              className=" bg-[#403f3f7e] py-[.5rem] px-[4rem] rounded-[8px] "
            >
              Unsaved
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div
        key={data?.id}
        className="  cursor-pointer bg-[#3333336f] rounded-[8px] w-[100%] px-[8px] py-[8px] justify-start items-center gap-3 h-auto flex text-base font-medium text-[#fff] "
      >
        <Link
          to={`/profile/${data?.user?.username}`}
          className=" w-[6rem] h-[5rem] flex items-center mx-[4px]  rounded-[8px] "
        >
          <img
            className=" min-w-[6rem] h-[80%] rounded-[8px] object-cover "
            src={data?.urls?.full}
            alt=""
          />
        </Link>
        <div className=" flex text-[10px] flex-col   justify-between relative h-[5rem] ">
          {data?.description && (
            <div>
              <h1 className=" line-clamp-1  "> {data?.description} </h1>
            </div>
          )}

          <div className=" py-[.2rem] text-[10px] flex justify-start gap-2 items-center w-[100%] ">
            <img
              className=" w-5 h-5 rounded-full "
              src={data?.user?.profile_image?.large}
              alt=""
            />
            <p className=" opgracity-70 text-[10px] font-normal ">
              Saved post from
            </p>
            <Link to={`/profile/${data?.user?.username}`}>
              {" "}
              {data?.user?.username}'s post{" "}
            </Link>
          </div>

          <div className="    flex w-[100%] justify-between items-center ">
            {isExistedSp && (
              <div className=" bg-[#403f3f7e] py-[.2rem] px-[2rem] rounded-[4px] ">
                <p className={shareIcon}>Shared</p>
              </div>
            )}
            {!isExistedSp && (
              <div
                onClick={() => {
                  dispatch(
                    SharePost({
                      id: Date.now(),
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
                  Cookies.set(
                    `shareIcon ${data?.user?.username}`,
                    JSON.stringify(share)
                  );
                }}
                className=" bg-[#403f3f7e] py-[.2rem] px-[2rem] rounded-[4px] "
              >
                <p className={shareIcon}>Share</p>
              </div>
            )}

            <div
              onClick={() => dispatch(deleteSavePost(data))}
              className=" bg-[#403f3f7e] py-[.2rem] px-[1rem] rounded-[4px] "
            >
              Unsaved
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default SavedCard;
