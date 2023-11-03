import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom/dist";
import Story from "../components/facebook/common/Story";
import "./facebook.css";
import Post from "../components/facebook/common/Post";
import { useMediaQuery } from "react-responsive";
import CreatePost from "../components/facebook/common/CreatePost";
import CreateP from "./CreatePost";
import Cookies from "js-cookie";
import CreateStory from "./CreateStory";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Box, Button, Flex, Image } from "@chakra-ui/react";
import {
  useGetProductsQuery,
  useGetSingleUserQuery,
} from "../redux/api/PostApi";
import AuthFun from "./AuthFun";
import { addViewImage } from "../redux/services/authSlice";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { ArrowRightIcon } from "@chakra-ui/icons";
import UserList from "./userList";

const Facebook = ({ isLogout }) => {
  // Get the token from the cookies
  const token = Cookies.get("token");

  // Get the user data from the API
  //Get USer

  const { user } = AuthFun();

  const LID = Cookies.get("userData");

  if (!LID) {
    Cookies.set("userData", JSON.stringify("userData"));
  }

  const setUId = () => {
    Cookies.set("UserId", user?.id);
  };

  // Check if the photo query is loading
  const { isLoading } = useGetProductsQuery();

  const allUser = useGetSingleUserQuery();

  // Navigate to the login page if the token is not available
  const nav = useNavigate();
  useEffect(() => {
    if (!token) {
      nav("/login");
    }
  }, []);

  // Check the media query for different screen sizes
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 991px)",
  });
  const isDesktop = useMediaQuery({ query: "(min-width: 992px)" });

  // Set the initial state for the createP component
  const [cp, setCp] = useState(
    "d-n createP absolute  w-[100%] h-[100%] justify-center items-center "
  );
  // Function to show the createP component
  const createP = () => {
    setCp(
      "flex createP absolute  w-[100%] h-[100%] justify-center items-center "
    );
  };
  const dispatch = useDispatch();
  const viewImage = useSelector((state) => state.authSlice.viewImage);
  const [viewStory, setViewStory] = useState();
  const params = useParams();

  const [trans, setTrans] = useState("");
  const imgLeft = () => {
    setTrans("translate(-100%)");
  };
  const imgRight = () => {
    setTrans("translate(100%)");
  };

  const setDef = () => {
    setTrans("translate(0%)");
    setViewStory("");
  };
  // const setUId = () => {

  // }

  //(viewStory);
  // Set the initial state for the ct component
  const [ct, setCt] = useState(
    "d-n createP absolute  w-[100%] h-[100%] justify-center items-center "
  );
  if (isLoading) {
    return (
      <div className=" relative flex overflow-hidden pt-[3.6rem] max-[450px]:pt-0  justify-between  bg-[#18191A]  w-[100%] max-h-screen  ">
        {isTablet && (
          <div className=" flex flex-col gap-4 bg-[#121212cc]  max-h-[900px] min-h-[800px] d-n min-[450px]:block w-[25%] text-[#fff] "></div>
        )}
        {isDesktop && (
          <div className=" flex flex-col gap-4 bg-[#121212cc]  max-h-[900px] min-h-[800px] d-n min-[450px]:block w-[25%] text-[#fff] "></div>
        )}

        {isMobile && (
          <div className="  flex flex-col gap-4  max-h-screen  justify-center items-center   w-[100%]   overflow-y-auto overflow-x-hidden  ">
            <div className="block w-[90%] h-[110px] bg-[#121212cc] rounded-[8px] ">
              {/* <CreatePost createP={createP} setCp={setCp}   /> */}
            </div>
            <div className="  bg-[#121212cc] rounded-[8px] w-[90%] h-[100px] ">
              {/* <Story/> */}
            </div>

            <div className=" w-[90%] h-[400px] flex-col  bg-[#121212cc] rounded-[8px] justify-center  flex items-center ">
              {/* <h1 className=' text-[#ffffff] text-2xl ' > API rate Limit exceed! </h1> */}
              <p id="demo" className=" text-[#ffffff] text-xl "></p>
            </div>
          </div>
        )}

        {isTablet && (
          <div className=" flex flex-col gap-4  max-h-screen  justify-center items-center    w-[50%]   overflow-y-auto overflow-x-hidden   ">
            <div className="  bg-[#121212cc] rounded-[8px] w-[90%] h-[300x] ">
              {/* <Story/> */}
            </div>
            <div className="   bg-[#121212cc] rounded-[8px] w-[400px] h-[300px] max-[450px]:block ">
              {/* <CreatePost createP={createP} setCp={setCp} /> */}
            </div>

            <div className=" w-[400px] h-[500px] flex-col  bg-[#121212cc] rounded-[8px] justify-center  flex items-center ">
              {/* <h1 className=' text-[#ffffff] text-4xl ' > API rate Limit exceed! </h1> */}
              <p id="demo" className=" text-[#ffffff] text-xl "></p>
            </div>
          </div>
        )}
        {isDesktop && (
          <div className=" flex flex-col gap-4  max-h-screen w-[50%] justify-center items-center  overflow-y-auto overflow-x-hidden  ">
            <div className="flex w-[90%] h-[300px]  bg-[#121212cc] rounded-[8px] ">
              {/* <Story/> */}
            </div>
            <div className=" w-[500px] h-[300px]  bg-[#121212cc] rounded-[8px]  max-[450px]:block ">
              {/* <CreatePost createP={createP} setCp={setCp}  /> */}
            </div>

            <div className=" w-[500px] h-[600px] gap-6 bg-[#121212cc] rounded-[8px] self-center justify-center  flex flex-col items-center ">
              {/* <h1 className=' text-[#ffffff] text-4xl ' > API rate Limit exceed! </h1> */}
              <p id="demo" className=" text-[#ffffff] text-xl "></p>
            </div>
          </div>
        )}

        {isTablet && (
          <div className=" flex flex-col gap-4  bg-[#121212cc] rounded-[8px]  max-h-[900px] min-h-[800px] d-n min-[450px]:block w-[25%] text-[#fff] "></div>
        )}
        {isDesktop && (
          <div className=" flex flex-col gap-4  bg-[#121212cc] rounded-[8px]  max-h-[900px] min-h-[800px] d-n min-[450px]:block w-[25%] text-[#fff] "></div>
        )}

        <div className={cp}>{/* <CreateP setCp={setCp} /> */}</div>
      </div>
    );
  } else {
    return (
      <Box
        w={["100%", "100%", "100%"]}
        className=" relative flex overflow-hidden pt-[0rem] max-[450px]:pt-0  justify-center items-start  bg-img   max-h-screen  "
      >
        {viewImage && !params.name && (
          <div
            onClick={() => dispatch(addViewImage(""))}
            className=" cursor-pointer absolute flex justify-center items-center top-[0%] w-[100%] h-[100%] bg-blur z-[99] "
          >
            <div>
              <Image
                className="max-[500px]:w-full  h-auto w-[400px] snap-center "
                src={viewImage}
                alt=""
              />
            </div>
          </div>
        )}
        {viewStory && (
          <div
            // onClick={()=> setViewStory('')}
            className=" absolute cursor-pointer  flex justify-center items-center top-[0%] w-[100%] h-[100%]  z-[99] "
          >
            <div
              onClick={setDef}
              className="bg-blur max-[500px]:w-0 w-[35%] h-screen "
            ></div>
            <div className="  z-[9999] flex max-[500px]:w-full w-[400px] h-screen overflow-x-scroll snap-x justify-start gap-2 items-center  ">
              {viewStory?.map((data) => {
                return (
                  <Image
                    onClick={setDef}
                    transform={trans}
                    key={data?.id}
                    className="max-[500px]:w-full  h-auto w-[400px] snap-center "
                    src={data?.images}
                    alt=""
                  />
                );
              })}
              <Flex
                className="max-[500px]:opacity-0 "
                position={"absolute"}
                w={"400px"}
                justify={"space-between"}
              >
                <Button onClick={imgRight}>
                  <ArrowLeftIcon />
                </Button>
                <Button onClick={imgLeft}>
                  <ArrowRightIcon />
                </Button>
              </Flex>
            </div>
            <div
              onClick={setDef}
              className="bg-blur max-[500px]:w-0  w-[35%] h-screen "
            ></div>
          </div>
        )}

        <Box
          display={{ base: "none", md: "flex" }}
          className=" flex-col gap-4 h-screen  max-h-screen min-h-screen d-n min-[450px]:block w-[25%] text-[#fff] pt-[1rem] "
        >
          <div className=" bg-blur-p p-[1rem] rounded-r-[8px]  flex flex-col gap-3 justify-start font-semibold text-lg items-center w-[80%] ">
            <Link
              onClick={setUId}
              to={`/${user?.name}`}
              className=" bg-blur-p  flex gap-3 mt-[1rem] h-[50px] w-[100%] items-center justify-start cursor-pointer border-b-[1px] border-[#33333370] p-[.5rem] rounded-[8px] shadow-md hover:bg-[#33333370]   "
            >
              <img
                className=" rounded-full w-[40px] h-[40px] flex items-start object-cover  "
                src={user?.avatar}
                alt=""
              />
              <div className=" flex flex-col items-left justify-start h-[100%]  ">
                <p className=" text-base  "> {user?.name} </p>
              </div>
            </Link>

            <Link
              to={"/saved"}
              className=" bg-blur-p cursor-pointer border-b-[1px] border-[#33333370] shadow-md hover:bg-[#33333370] p-[.5rem] rounded-[8px] flex w-[100%] gap-2 "
            >
              <i className="saved"></i> <p>Saved</p>
            </Link>
          </div>
        </Box>

        <Box
          w={["100%", "50%", "50%"]}
          className="  flex flex-col gap-2  items-center  max-h-screen   overflow-y-auto overflow-x-hidden  "
        >
          <Box
            display={{ base: "block", md: "none" }}
            className="bg-blur-p w-[100%] p-[8px] "
          >
            <CreatePost createP={createP} setCp={setCp} />
          </Box>

          <div className="flex w-[100%] ">
            <Story setViewStory={setViewStory} setCt={setCt} />
          </div>

          <div className="bg-blur-p snap-center rounded-[8px] w-[100%] justify-start  flex items-center px-[8px]  ">
            <Post isLogout={isLogout} setCp={setCp} />

            {/* <Post/> */}
          </div>
        </Box>

        {isTablet && (
          <div className=" flex flex-col gap-4  max-h-[900px] min-h-[800px] d-n min-[450px]:block w-[25%] text-[#fff] "></div>
        )}
        {isDesktop && (
          <div className=" flex flex-col gap-4 mt-[200px]  overflow-y-auto  max-h-[900px] min-h-[800px] d-n min-[450px]:block w-[25%] text-[#fff] ">
            {allUser?.data?.map((data) => {
              return null;
            })}
          </div>
        )}

        <div className={cp}>
          <CreateP setCp={setCp} />
        </div>
        <div className={ct}>
          <CreateStory setCt={setCt} />
        </div>
      </Box>
    );
  }
};

export default Facebook;
