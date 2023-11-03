import { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import Cookies from "js-cookie";
import "./facebook.css";
import { useMediaQuery } from "react-responsive";
import { isValidUrl } from "../components/facebook/common/data";
import {
  useCreateProductsMutation,
  useGetCategoriesQuery,
} from "../redux/api/PostApi";
import AuthFun from "./AuthFun";
import axios from "axios";

const CreateStory = ({ setCt }) => {
  const { user } = AuthFun();


  const [detail, setPdetail] = useState("story");
  const [image, setImage] = useState();
  const id = useGetCategoriesQuery();

  const [imageFile, setImageFile] = useState(null);
  const [imgUrl, setImgUrl] = useState("https://example.com/example.jpg");


  const catId = id?.data?.filter((data) => data?.name === "story");

  const categoryId = catId?.find((data) => data);

  const data = {
    title: user?.name,
    price: user?.id,
    description: detail,
    categoryId: categoryId?.id,
    images: [imgUrl],
  };

  const handleChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleSubmit = async () => {

    const formData = new FormData();
    formData.append("file", imageFile);

    const token = Cookies?.get("tokenApi");

    axios.defaults.proxy =
      "https://195.3.223.164/?__cpo=aHR0cHM6Ly9hcGkuZXNjdWVsYWpzLmNv/api.escuelajs.co/api/v1/files/upload";

    const response = await axios.post(
      "https://api.escuelajs.co/api/v1/files/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token} `,
        },
      }
    );

    setImgUrl(response.data.location);

  };

  useEffect(() => {
    handleSubmit();
  }, [imageFile]);

  const [post, { isLoading }] = useCreateProductsMutation();

  const postU = async () => {
    const pp = await post(data);
    //(pp);
    setTimeout(() => {
      if (pp?.data) {
        setImage("");
        setCt(
          "d-n createP absolute  w-[100%] h-[100%] justify-center items-center "
        );

        // window.location.reload(true)
      }
    }, 1500);
  };


  // if (!token) {
  //     nav('/login')
  // }

  const adminStorys = useSelector((state) => state.PhotoSlice.AdminStory);

  const closeCreatepost = () => {
    setCt(
      "d-n createP absolute  w-[100%] h-[100%] justify-center items-center "
    );
  };

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  // const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 991px)' })
  const isDesktop = useMediaQuery({ query: "(min-width: 992px)" });

  useEffect(() => {
    if (isDesktop) {
      let ani = document.getElementById("CreateS");
      ani.className += "CreateSm";
    }
  }, [setCt]);

  if (isDesktop) {
    return (
      <div
        id="CreateS"
        className=" min-w-[70%]  bg-[#11111198] shadow-lg shadow-[#222222]   gap-4 justify-center items-center h-auto max-h-[90%]   p-[18px] text-[#fff]  overflow-y-auto rounded-[8px] "
      >
        <div className=" w-[100%] max-h-[90%]    flex flex-col p-[8px] ">
          <div className="flex gap-3 w-[100%] relative h-auto justify-start items-start ">
            <div className=" flex justify-center items-center ">
              <img
                className=" w-10 h-10 bg-[#11111180] rounded-full "
                src={user?.avatar}
                alt=""
              />
            </div>
            <div className=" flex justify-center items-center ">
              <h1> {user?.name} </h1>
            </div>

            <div className=" w-[100%] absolute flex justify-end items-center top-[-10%] ">
              <span
                onClick={closeCreatepost}
                className=" cursor-pointer opacity-70 font-semibold "
              >
                X
              </span>
            </div>
          </div>
          <div className=" flex flex-col gap-2 w-[100%] h-auto ">
            <form className=" flex flex-col gap-2 w-[100%] h-auto justify-center items-center py-[8px] ">
              <input
                className=" w-[100%] bg-transparent "
                onChange={handleChange}
                placeholder="Paste your Image Url"
                type="file"
                name=""
              />
              {/* <input onChange={(e)=> setPdetail(e.target.value)} placeholder={placeholder}  className=" w-[100%] bg-transparent " />  */}
              {isValidUrl(imgUrl) && (
                <img className="  object-cover  " src={imgUrl} alt="" />
              )}
              {!isValidUrl(imgUrl) && (
                <div className=" w-[100%] h-[300px] bg-[#21212167] "></div>
              )}
              {!isValidUrl(imgUrl) && (
                <div
                  disabled
                  className=" p-[.5rem] cursor-not-allowed opacity-60 bg-blue-600 w-[30%] rounded-xl text-center "
                >
                  Post
                </div>
              )}
              {isValidUrl(imgUrl) && !isLoading && (
                <div
                  onClick={postU}
                  className=" p-[.5rem] bg-blue-600 cursor-pointer w-[30%] rounded-xl text-center "
                >
                  Post
                </div>
              )}
              {isLoading && (
                <div
                  disabled
                  className=" p-[.5rem] opacity-60 bg-[#121212] w-[30%] rounded-xl text-center "
                >
                  Post
                </div>
              )}{" "}
            </form>
          </div>
        </div>
      </div>
    );
  }
  if (isMobile) {
    return (
      <div
        id=""
        className="  flex flex-col bg-[#11111198] shadow-[#222222] shadow-lg   gap-4 justify-center items-start rounded-md   px-[18px] text-[#fff] min-w-[100%] h-auto pt-[1.5rem] max-h-screen overflow-y-auto  "
      >
        <div className=" w-[100%] max-h-[90%] relative   flex flex-col p-[0px] ">
          <div className="flex  gap-3 w-[100%] h-auto justify-start items-start ">
            <div className=" flex justify-center items-center ">
              <img
                className=" w-10 h-10 bg-[#111111ae] rounded-full "
                src={user?.avatar}
                alt=""
              />
            </div>
            <div className=" flex justify-center items-center ">
              <h1> {user?.name} </h1>
            </div>

            <div className=" w-[100%] z-[99999] absolute flex justify-end items-center top-[1%] ">
              <span
                onClick={closeCreatepost}
                className=" cursor-pointer opacity-70 font-semibold "
              >
                X
              </span>
            </div>
          </div>
          <div className=" flex flex-col gap-2 w-[100%] h-auto ">
            <form className=" flex flex-col gap-2 w-[100%] h-auto justify-center items-center py-[8px] ">
              {/* <input onChange={(e)=> setPdetail(e.target.value)} placeholder={placeholder}  className=" w-[100%] bg-transparent " />  */}
              {isValidUrl(imgUrl) && (
                <img className="  object-cover  " src={imgUrl} alt="" />
              )}
              {!isValidUrl(imgUrl) && (
                <div className=" w-[100%] h-[300px] bg-[#212121ad] "></div>
              )}
               <input
                className=" w-[100%] bg-transparent "
                onChange={handleChange}
                placeholder="Paste your Image Url"
                type="file"
              />
              {!isValidUrl(imgUrl) && (
                <div
                  disabled
                  className=" p-[.5rem] cursor-not-allowed opacity-60 bg-blue-600 w-[30%] rounded-xl text-center "
                >
                  Post
                </div>
              )}
              {isValidUrl(imgUrl) && !isLoading && (
                <div
                  onClick={postU}
                  className=" p-[.5rem] bg-blue-600 cursor-pointer w-[30%] rounded-xl text-center "
                >
                  Post
                </div>
              )}
              {isLoading && (
                <div
                  disabled
                  className=" p-[.5rem] opacity-60 bg-[#121212] w-[30%] rounded-xl text-center "
                >
                  Post
                </div>
              )}{" "}
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default CreateStory;
