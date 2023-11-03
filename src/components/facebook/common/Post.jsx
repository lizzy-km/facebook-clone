import CreatePostCard from "./CreatePostCard";
import AdminPostCard from "./AdminPostCard";
import "./app.css";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useGetProductsQuery } from "../../../redux/api/PostApi";
import AuthFun from "../../../pages/AuthFun";
import AdminSharePost from "../others/AdminSharePost";

const Post = ({ setCp }) => {
  //Get USer
  const { user } = AuthFun();
  const sharepost = useSelector((state) =>
    state.UserPhotoSlice.sharePost.toReversed()
  );

  const data = useGetProductsQuery();

  const adminPost = data?.data?.filter(
    (data) => data?.category?.name === "post"
  );
  const yourPost = adminPost?.filter((data) => data?.title === user?.name);
  const otherPost = adminPost?.filter((data) => data?.title !== user?.name);

  return (
    <div className=" flex flex-col w-[100%] gap-2    items-center pb-[1rem] ">
      <Box display={{ base: "none", md: "flex" }}>
        <CreatePostCard setCp={setCp} />
      </Box>

      <div className=" rounded-2xl flex flex-col w-[100%] min-h-screen  justify-start items-center pb-[0rem] ">
        {yourPost.toReversed()?.map((dataA) => {
          return <AdminPostCard data={dataA} key={dataA?.id} />;
        })}
        {otherPost?.map((dataA) => {
          return <AdminPostCard data={dataA} key={dataA?.id} />;
        })}

        {adminPost?.length < 1 && (
          <Flex p={"10"} rounded={"2xl"} className="bg-blur" color={"#fff"}>
            <Text> There is no post, Create your first post. </Text>
          </Flex>
        )}

        {sharepost?.map((data) => {
          return <AdminSharePost key={data?.id} data={data} />;
        })}
      </div>
    </div>
  );
};

export default Post;
