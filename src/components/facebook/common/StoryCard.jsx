import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import {
  useGetProductsQuery,
  useGetSingleUserQuery,
} from "../../../redux/api/PostApi";
import { useDispatch } from "react-redux";
import { useState } from "react";

const StoryCard = ({ data, img, setViewStory }) => {
  const userAll = useGetSingleUserQuery();

  const userP = userAll?.data?.filter((userN) => userN?.name === data?.title);
  const user = userP?.find((up) => up);
  const { isLoading } = useGetProductsQuery();

  const userStory = img?.filter((us) => us?.title === data?.title);

  const setUId = async () => {
    Cookies.set("UserId", data?.price);
  };
  const dispatch = useDispatch();
  if (data) {
    return (
      <div className=" cursor-pointer bg-[#292c30] w-[107.198px] h-[190.573px] rounded-lg  flex justify-center items-center ">
        <div className=" relative flex flex-col  bg-[#20212399] w-[107.198px] h-[190.573px] rounded-lg   ">
          <Link
            onClick={setUId}
            to={`/${data?.title}`}
            className=" top-[5%] left-[10%] w-[36px] h-[36px]  absolute text-[#fff]"
          >
            {isLoading && (
              <div className="rounded-full bg-[#20212399] w-[36px] h-[36px] border-2 object-cover  "></div>
            )}
            {!isLoading && (
              <div className="rounded-full  relative w-[36px] h-[36px]  object-cover  ">
                <img
                  className="rounded-full w-[36px] h-[36px] border-2 object-cover  "
                  src={user?.avatar}
                  alt=""
                />
                <p className=" absolute top-[-2%] right-[-2%] px-[3px] rounded-full border-2 border-blue-700 bg-[#121212e3] text-[10px]  ">
                  {" "}
                  {userStory?.length}{" "}
                </p>
              </div>
            )}
          </Link>
          <div
            onClick={() => setViewStory(userStory)}
            className=" flex gap-2 overflow-x-auto snap-x rounded-lg w-[107.198px] h-[190.573px] object-cover "
          >
            {isLoading && (
              <div>
                <div className=" rounded-lg bg-[#20212399] w-[107.198px] h-[190.573px] object-cover " />
                Loading
              </div>
            )}
            {!isLoading &&
              userStory?.map((data) => {
                return (
                  <img
                    key={data?.id}
                    className=" snap-center rounded-lg min-w-[107.198px] h-[190.573px] object-cover "
                    src={data?.images}
                    alt=""
                  />
                );
              })}
          </div>
          <div className=" bg-blur items-center text-sm font-medium flex justify-start p-[8px] h-[25%] w-[100%] bottom-[0%] left-[0%] absolute text-[#fff]">
            <p> {user?.name?.slice(0, 10)}</p>
          </div>
        </div>
      </div>
    );
  }
};

export default StoryCard;
