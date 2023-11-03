import { useSelector } from "react-redux";
import PostCard from "../common/PostCard";

const UserPost = ({ isLogout }) => {
  const data = useSelector((state) => state?.PhotoSlice?.userPhoto);

  return (
    <div className="flex gap-2 flex-col justify-center w-[100%] ">
      {data?.map((data) => {
        return <PostCard isLogout={isLogout} key={data?.id} data={data} />;
      })}
    </div>
  );
};

export default UserPost;
