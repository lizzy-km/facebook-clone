import CreatePostCard from "../common/CreatePostCard";
import { useSelector } from "react-redux";
import AdminPostCard from "../common/AdminPostCard";
import AdminSharePost from "./AdminSharePost";
import CreatePost from "../common/CreatePost";
import { useMediaQuery } from "react-responsive";
import AdminPostCardM from "../../m_facebook/common/AdminPostCardM";
import { useGetPostQuery } from "../../../redux/api/AuthApi";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchPost } from "../common/data";
import {
  useGetProductsQuery,
  useGetSingleUserQuery,
} from "../../../redux/api/PostApi";
import Cookies from "js-cookie";
import AuthFun from "../../../pages/AuthFun";

const AdminPost = ({ setCp, isLogout, setViewImage, setViewImages }) => {
  const token = "4014|u4yp9RlCwObTqWeu9SoKIEnhAUXd90FsosqjEEYT";

  const { name } = useParams();
  // //(params);
  const pageLast = useGetPostQuery();
  const lastPage = pageLast?.data?.contacts?.last_page;

  const [page, setPage] = useState(1);

  //Get USer
  const uid = Cookies.get("UserId");
  const UID = JSON.parse(uid);
  const { publicFun } = AuthFun();

  const { publicProfile } = publicFun(UID);

  const data = useGetProductsQuery();

  //(UID);

  const user = publicProfile;

  const postShow = data?.data?.filter((data) => data?.price === UID);
  const adminPost = postShow?.filter((data) => data?.category?.name === "post");
  const yourPost = adminPost?.filter((data) => data?.title === user?.name);
  const otherPost = adminPost?.filter((data) => data?.title !== user?.name);

  // const fetch= useFetchPost(setData,setPage,page)

  const sharepost = useSelector((state) =>
    state.UserPhotoSlice.sharePost.toReversed()
  );

  isLogout === true && Cookies.remove(`shareIcon ${data?.id}`);

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 991px)",
  });
  const isDesktop = useMediaQuery({ query: "(min-width: 992px)" });

  return (
    <div className="flex gap-8 flex-col justify-center w-[100%] ">
      <div className=" w-[100%] flex justify-center  ">
        {isMobile && <CreatePost setCp={setCp} />}
        {isDesktop && <CreatePostCard setCp={setCp} />}
        {isTablet && <CreatePostCard setCp={setCp} />}
      </div>

      <div className="  flex flex-col gap-4 justify-center w-[100%] ">
        {isMobile &&
          adminPost?.map((data) => {
            return (
              <AdminPostCardM
                setViewImages={setViewImages}
                key={data?.id}
                data={data}
              />
            );
          })}
        {isDesktop &&
          adminPost?.map((data) => {
            return (
              <AdminPostCard
                setViewImages={setViewImages}
                key={data?.id}
                data={data}
              />
            );
          })}

        {sharepost?.map((data) => {
          return <AdminSharePost key={data?.id} data={data} />;
        })}
      </div>
    </div>
  );
};

export default AdminPost;
