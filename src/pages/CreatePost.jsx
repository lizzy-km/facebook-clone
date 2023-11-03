import { useEffect, useState } from "react";
import "./facebook.css";
import { useMediaQuery } from "react-responsive";
import {
  useCreateProductsMutation,
  useGetCategoriesQuery,
} from "../redux/api/PostApi";
import Cookies from "js-cookie";
import { Flex } from "@chakra-ui/react";
import AuthFun from "./AuthFun";
import axios from "axios";

const CreatePost = ({ setCp }) => {
  const { user } = AuthFun();

  // //(user);

  const placeholder = `What is on your mind, ${user?.name}?  `;

  const [detail, setPdetail] = useState(".nul");
  const [image, setImage] = useState("https://example.com/example.jpg");
  const id = useGetCategoriesQuery();

  const [imageFile, setImageFile] = useState(null);
  const [imgUrl, setImgUrl] = useState("https://example.com/example.jpg");

  const catId = id?.data?.filter((data) => data?.name === "post");

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
    setTimeout(() => {
      if (pp?.data) {
        setImage("");
        setPdetail("");

        setCp(
          "d-n createP absolute  w-[100%] h-[100%] justify-center items-center "
        );

      }
    }, 1500);
  };


  const handleKeyPress = (event) => {
    
      event.keyCode === 13 && setPdetail(" " + detail + " " + " <br> ");
    
  };

  const closeCreatepost = () => {
    setCp(
      "d-n createP absolute  w-[100%] h-[100%] justify-center items-center "
    );
  };

  const isMobile = useMediaQuery({ query: "(max-width: 700px)" });
  // const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 991px)' })
  const isDesktop = useMediaQuery({ query: "(min-width: 992px)" });
  useEffect(() => {
    if (isDesktop) {
      let ani = document.getElementById("CreateSm");
      ani.className += "CreateSm";
    }
  }, [setCp]);


  if (isDesktop) {
    return (
      <div
        id="CreateSm"
        className=" min-w-[100%] h-auto max-h-[100%] bg-[#11111198] shadow-lg shadow-[#222222]   gap-4 justify-center items-center   p-[18px] text-[#fff]  overflow-y-auto rounded-[8px] "
      >
        <div className=" w-[100%] max-h-[90%] relative   flex flex-col p-[8px] ">
          <div className=" w-[100%] absolute flex justify-end items-center top-[0%] ">
            <span
              onClick={closeCreatepost}
              className=" cursor-pointer opacity-70 font-semibold "
            >
              X
            </span>
          </div>
          <div className="flex gap-3 w-[100%] h-auto justify-start items-start ">
            <div className=" flex justify-center items-center ">
              <img
                className=" w-10 h-10 object-cover bg-[#11111180] rounded-full "
                src={user?.avatar}
                alt=""
              />
            </div>
            <div className=" flex justify-center items-center ">
              <h1> {user?.name} </h1>
            </div>
          </div>
          <div className=" flex flex-col gap-2 w-[100%] h-auto ">
            <div className=" flex flex-col gap-2 w-[100%] h-auto justify-center items-center py-[8px] ">
              <Flex w={"100%"} gap={"4"} flexDirection={"column"}>
                <input
                  value={detail}
                  onKeyPress={handleKeyPress}
                  id="textArea"
                  onChange={(e) => setPdetail(e.target.value)}
                  placeholder={placeholder}
                  className=" w-[100%] h-auto bg-transparent "
                />
                <Flex>
                  <input
                    type="file"
                    onChange={handleChange}
                    className=" w-[100%] h-auto bg-[#333333] p-1 text-left opacity-50 "
                  />
                </Flex>
              </Flex>
              {
                imageFile !== null && <img className=" min-h-[300px] bg-[#333333] w-[30%] h-auto " src={imgUrl} />

              }
              
              {detail.length < 1 && (
                <div
                  disabled
                  className=" p-[.5rem] opacity-60 bg-blue-600 w-[30%] rounded-xl text-center "
                >
                  Post
                </div>
              )}
              {detail.length > 0 && !isLoading && (
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
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (isMobile) {
    return (
      <div
        id="CreateSm"
        className="  flex flex-col bg-[#11111198] shadow-[#222222] shadow-lg rounded-md   gap-4 justify-center items-center   p-[17px] text-[#fff] w-[100%] h-auto max-h-screen overflow-y-auto  "
      >
        <div className=" w-[100%] max-h-[80%] relative pt-[rem]  flex flex-col p-[0px] ">
          <div className=" w-[100%] absolute flex justify-end items-center top-[7%] ">
            <span
              onClick={closeCreatepost}
              className=" cursor-pointer opacity-70 font-semibold "
            >
              X
            </span>
          </div>
          <div className="flex gap-3 w-[100%] h-auto justify-start items-start ">
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
          </div>
          <div className=" flex flex-col gap-2 w-[100%] h-auto ">
            <div className=" flex flex-col gap-2 w-[100%] h-auto justify-center items-center py-[8px] ">
              <Flex w={"100%"} gap={"4"} flexDirection={"column"}>
                <input
                  value={detail}
                  onKeyPress={handleKeyPress}
                  id="textArea"
                  onChange={(e) => setPdetail(e.target.value)}
                  placeholder={placeholder}
                  className=" w-[100%] h-auto bg-transparent "
                />

                <input
                  type="file"
                  onChange={handleChange}
                  className=" w-[100%] h-auto bg-[#333333] p-1 text-left opacity-50 "
                />
              </Flex>
              {
                imageFile !== null && <img className=" min-h-[200px] bg-[#333333] w-[100%] h-auto " src={imgUrl} />

              }
              {detail.length < 1 && (
                <div
                  disabled
                  className=" p-[.5rem] opacity-60 bg-blue-600 w-[30%] rounded-xl text-center "
                >
                  Post
                </div>
              )}
              {detail.length > 0 && !isLoading && (
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
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CreatePost;
