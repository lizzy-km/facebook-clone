import { useSelector } from "react-redux";
import { useGetPostQuery } from "../../../redux/api/AuthApi";
import { isValidUrl } from "./data";
import AuthFun from "../../../pages/AuthFun";
import { useGetProductsQuery } from "../../../redux/api/PostApi";
import { useState } from "react";

const AdminStoryCard = ({ story, setViewStory }) => {
  //(story);
  const { isLoading } = useGetProductsQuery();
  const { user } = AuthFun();

  const isStory = story?.find((data) => isValidUrl(data?.images));

  if (isStory) {
    return (
      <div className=" bg-[#292c30] w-[107.198px] h-[190.573px] rounded-lg  flex justify-center items-center ">
        <div className=" relative flex flex-col  bg-[#20212399] w-[107.198px] h-[190.573px] rounded-lg   ">
          <div className=" top-[5%] left-[10%] w-[36px] h-[36px]  absolute text-[#fff]">
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
                  {story?.length}{" "}
                </p>
              </div>
            )}
          </div>
          <div
            onClick={() => setViewStory(story)}
            className=" cursor-pointer rounded-lg w-[107.198px] flex gap-2 justify-start ml-[px] snap-x overflow-auto h-[190.573px] object-cover "
          >
            {isLoading && (
              <div>
                <div className=" rounded-lg bg-[#20212399] w-[107.198px] h-[190.573px] object-cover " />
                Loading
              </div>
            )}

            {!isLoading &&
              story?.map((data) => {
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
            <p>Your Story</p>
          </div>
        </div>
      </div>
    );
  }
};

export default AdminStoryCard;
