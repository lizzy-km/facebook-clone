import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Link, useParams } from "react-router-dom";
import { useGetUserPostQuery } from "../../../redux/api/AuthApi";
import AuthFun from "../../../pages/AuthFun";
import Cookies from "js-cookie";

const AdminProfileCard = ({ setCt }) => {
  const userData = useSelector((state) => state.UserPhotoSlice.user);
  const friends = useSelector((state) => state.UserPhotoSlice.friend);

  const uid = Cookies.get("UserId");
  const UID = JSON.parse(uid);

  const { publicFun } = AuthFun();
  const { publicProfile } = publicFun(UID);
  const user = publicProfile;
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 991px)",
  });
  const isDesktop = useMediaQuery({ query: "(min-width: 992px)" });
  const params = useParams();
  const getUser = useGetUserPostQuery(params.name);
  //(getUser);
  const createSt = () => {
    setCt(
      "flex createP absolute rounded-[8px] z-[999999] p-[8px]  w-[100%] h-[100%] justify-center items-start "
    );
  };
  const token = "4014|u4yp9RlCwObTqWeu9SoKIEnhAUXd90FsosqjEEYT";
  const dispatch = useDispatch();

  //   const friends = useSelector(state=>state.UserPhotoSlice.friend)
  //(params);
  const [page, setPage] = useState(422);
  const [data, setData] = useState([]);

  const adminPost = data?.contacts?.data?.filter(
    (data) => data?.name === params?.name
  );

  useEffect(() => {
    // if(!postShow){
    // setTimeout(()=>{
    //     // setPage(page+1)

    // },2500);
    axios
      .get(`https://contact-app.mmsdev.site/api/v1/contact?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
        //   setLoading(false)
        //   dispatch(getPost({post:response?.data?.contacts?.data}))
      })
      .catch((error) => {
        //(error);
      });

    // }
  }, [page]);

  if (isDesktop) {
    return (
      <div className="flex flex-col bg-blur w-[100%] h-[100%] justify-center  items-center border-1">
        <div className=" flex w-[940px] justify-center h-[400.74px] ">
          <img
            className="flex min-w-[940px] h-[400.74px] rounded-b-[8px] object-cover "
            src={user?.avatar}
            alt=""
          />
        </div>
        <div className=" text-[#efeeee] w-[940px] h-[200px] flex ">
          <div className=" relative flex justify-evenly  w-[50%] ">
            <div className=" flex justify-center items-center absolute top-[-20%] w-[172px] h-[172px] p-[4px] rounded-full bg-[#2c2b2b] left-[10%] ">
              <img
                className=" w-[172px] h-[172px] object-cover rounded-full "
                src={user?.avatar}
                alt=""
              />
            </div>
            <div className=" flex flex-col justify-start items-start absolute left-[50%] top-[10%] gap-1 text-4xl font-semibold ">
              <h1> {params?.name} </h1>
              {friends?.length > 0 && (
                <>
                  <p className=" text-base text-[#d3d1d1] font-medium ">
                    {" "}
                    {friends?.length} friends{" "}
                  </p>
                  <div className=" flex justify-start items-center      overflow-x-auto px-[8px]  ">
                    {friends?.map((data) => {
                      return (
                        <Link
                          to={`/profile/${data?.username}`}
                          className="w-9 h-9 flex  top-0 left-0 justify-center items-center rounded-full bg-[#000] p-[1px]  ml-[-8px] "
                          key={data?.id}
                        >
                          <img
                            className=" w-8 h-8 rounded-full "
                            src={data?.profile_image}
                            alt=""
                          />
                        </Link>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
          {params?.name === user?.name && (
            <div className=" flex w-[50%] justify-center gap-3 items-center ">
              <div
                onClick={createSt}
                className=" cursor-pointer  font-medium flex justify-evenly items-center w-[131.219px] h-[36px] bg-[#2374E1] rounded-[5px] "
              >
                <p className=" text-xl ">+</p>
                <h1>Add to story</h1>
              </div>

              <div className="  font-medium flex justify-evenly items-center w-[131.219px] h-[36px] bg-[#333333] rounded-[5px] ">
                <p className=" text-xl ">|</p>
                <h1>Edit profile</h1>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  if (isMobile) {
    return (
      <div className="flex flex-col w-[100%] h-[100%] pb-[1rem] justify-start  items-center border-1">
        <div className=" flex flex-col w-[100%] justify-start h-[200.74px] ">
          <img
            className="flex min-w-[100%] h-[200.74px] rounded-b-[8px] object-cover "
            src={user?.avatar}
            alt=""
          />
        </div>
        <div className=" text-[#efeeee] w-[100%] h-auto gap-6 flex flex-col ">
          <div className=" relative gap-2 flex flex-col justify-evenly h-auto  w-[100%] ">
            <div className=" flex justify-center items-center  mt-[-20%] w-[100%] h-[172px] p-[4px] rounded-full bg-[#2c2b2b00] ">
              <img
                className=" w-[150px] h-[150px] object-cover  rounded-full "
                src={user?.avatar}
                alt=""
              />
            </div>
            <div className=" flex flex-col justify-center items-center  text-4xl font-semibold ">
              <h1> {params?.name} </h1>
              {/* <p className=" text-base text-[#d3d1d1] font-medium " > {friends?.length} friends </p> */}
            </div>
          </div>
          {params?.name === user?.name && (
            <div className=" flex w-[100%] justify-center gap-3 items-center ">
              <div
                onClick={createSt}
                className=" cursor-pointer px-[.3rem]  font-medium flex justify-evenly items-center w-auto h-[36px] bg-[#2374E1] rounded-[5px] "
              >
                <p className=" text-xl ">+</p>
                <h1>Add to story</h1>
              </div>

              <div className="  font-medium flex justify-evenly items-center w-auto px-[.3rem] h-[36px] bg-[#333333] rounded-[5px] ">
                <p className=" text-xl ">|</p>
                <h1>Edit profile</h1>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  if (isTablet) {
    return (
      <div className="flex flex-col w-[100%] h-[100%] pb-[1rem] justify-start  items-center border-1">
        <div className=" flex flex-col w-[100%] justify-start h-[200.74px] ">
          <img
            className="flex min-w-[100%] h-[200.74px] rounded-b-[8px] object-cover "
            src={user?.coverImage}
            alt=""
          />
        </div>
        <div className=" text-[#efeeee] w-[100%] h-auto gap-6 flex flex-col ">
          <div className=" relative gap-4 flex flex-col justify-evenly h-auto  w-[100%] ">
            <div className=" flex justify-center items-center  mt-[-20%] w-[100%] h-[172px] p-[4px] rounded-full bg-[#2c2b2b00] ">
              <img
                className=" w-[150px]  rounded-full "
                src={user?.profileImage}
                alt=""
              />
            </div>
            <div className=" flex justify-center items-start  text-4xl font-semibold ">
              <h1> {params?.name} </h1>
            </div>
          </div>

          {params?.name === user?.name && (
            <div className=" flex w-[50%] justify-center gap-3 items-center ">
              <div
                onClick={createSt}
                className=" cursor-pointer  font-medium flex justify-evenly items-center w-[131.219px] h-[36px] bg-[#2374E1] rounded-[5px] "
              >
                <p className=" text-xl ">+</p>
                <h1>Add to story</h1>
              </div>

              <div className="  font-medium flex justify-evenly items-center w-[131.219px] h-[36px] bg-[#333333] rounded-[5px] ">
                <p className=" text-xl ">|</p>
                <h1>Edit profile</h1>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default AdminProfileCard;
