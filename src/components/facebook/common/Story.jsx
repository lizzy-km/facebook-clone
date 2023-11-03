import StoryCard from "./StoryCard";
import { usePhotoQuery } from "../../../redux/api/PhotoApi";
import { useSelector } from "react-redux";
import AdminStoryCard from "./AdminStoryCard";
import { useState } from "react";
import AuthFun from "../../../pages/AuthFun";
import { useGetProductsQuery } from "../../../redux/api/PostApi";

const Story = ({ setCt, setViewStory }) => {
  const { user } = AuthFun();

  const { isLoading } = usePhotoQuery();

  const createSt = () => {
    setCt(
      "flex createP absolute  z-[999999] p-[8px]  w-[100%] h-auto overflow-y-auto max-h-[100%] rounded-md pt-[1rem] justify-center items-start "
    );
  };

  const data = useGetProductsQuery();
  const [loading, setLoading] = useState(false);

  // const data  = useGetPostQuery();
  const token = "4014|u4yp9RlCwObTqWeu9SoKIEnhAUXd90FsosqjEEYT";

  const story = data?.data?.filter((data) => data?.category?.name === "story");
  const adminStory = story?.filter((data) => data?.title === user?.name);
  const publicStory = story?.filter((data) => data?.title !== user?.name);

  const publicStoryD = publicStory.reduce((accumulator, item) => {
    const existingItem = accumulator.find(
      (existing) => existing.price === item.price
    );

    if (existingItem) {
      existingItem.price = item.price; // Sum the prices
    } else {
      accumulator.push({ ...item }); // Add a new item to the accumulator
    }

    return accumulator;
  }, []);

  //(publicStory);

  return (
    <div className=" bg-blur-p rounded-[8px] mt-[1rem]   flex scroll-smooth gap-4 p-[8px] overflow-x-auto overflow-y-hidden ">
      <div
        id="storyC"
        className="storyC scroll-smooth bg-[#292c30] w-[107.198px] h-[190.573px] rounded-lg  flex justify-center items-center "
      >
        <div className=" flex flex-col  bg-[#20212399] w-[107.198px] h-[190.573px]  rounded-lg   ">
          <div className=" w-[100%] h-[70%] bg-[#fff] rounded-t-lg ">
            <img
              className="rounded-t-lg w-[100%] h-[100%] object-cover "
              src={user?.avatar}
              alt=""
            />
          </div>
          <div
            onClick={createSt}
            className=" cursor-pointer text-center relative justify-center items-end pb-2 text-md text-[#fff] tracking-wide font-medium flex  w-[100%] h-[30%] bg-[rgba(50,52,54,1.0)] rounded-b-lg "
          >
            <p>Create story</p>
            <div className=" flex justify-center items-center   top-[-20%] absolute w-[36px] h-[36px]  border-[#fff]  rounded-full ">
              <img
                className="w-[36px] h-[36px]"
                src="https://static.xx.fbcdn.net/rsrc.php/v3/yR/r/kNse9VPGmA4.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      {adminStory?.length > 0 && (
        <AdminStoryCard
          setViewStory={setViewStory}
          key={data?.id}
          story={adminStory}
        />
      )}
      {publicStoryD?.map((data) => {
        return (
          <StoryCard
            setViewStory={setViewStory}
            isLoading={isLoading}
            data={data}
            img={publicStory}
            key={data?.id}
          />
        );
      })}
    </div>
  );
};

export default Story;
