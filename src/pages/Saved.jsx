import Cookies from "js-cookie";
import { useEffect } from "react";
import { usePhotoQuery } from "../redux/api/PhotoApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SavedCard from "./SavedCard";
import { useMediaQuery } from "react-responsive";

const Saved = ({ isLogout }) => {
  const token = Cookies.get("token");
  const { isLoading } = usePhotoQuery(token);
  const saved = useSelector((state) => state.UserPhotoSlice.savePost);
  //(saved);

  const nav = useNavigate();
  useEffect(() => {
    if (!token) {
      nav("/login");
    }
  }, []);

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 991px)",
  });
  const isDesktop = useMediaQuery({ query: "(min-width: 992px)" });

  if (isDesktop) {
    return (
      <div className=" flex  bg-[#121212] w-[100%] min-h-screen ">
        <div className=" justify-start items-start pt-[4rem] px-[1rem] shadow-md border-r-[1px] shadow-[#000] border-[#b6b5b59c] flex flex-col w-[28%] bg-[#3333336f] h-full min-h-screen ">
          <div className=" w-[100%] px-[8px] py-[8px] justify-start items-start h-[4rem] flex text-2xl font-bold text-[#fff] ">
            <p>Saved</p>
          </div>
          <div className=" cursor-pointer hover:bg-[#333333] rounded-[8px] w-[100%] px-[8px] py-[8px] justify-start items-center gap-3 h-[4rem] flex text-base font-medium text-[#fff] ">
            <div className="bg-[#1877F2] rounded-full w-[36px] h-[36px] flex justify-center items-center ">
              <i className="savedItems  "></i>
            </div>
            <p>Saved items</p>
          </div>
        </div>

        <div className=" text-[#fff] justify-start items-start pt-[4rem] px-[1rem] shadow-md border-r-[1px] shadow-[#000] border-[#b6b5b59c] flex flex-col w-[72%] gap-4  h-full min-h-screen ">
          <div className=" w-[100%] px-[8px] py-[8px] justify-start items-start h-[4rem] flex text-2xl font-bold text-[#fff] ">
            <p>All</p>
          </div>
          {saved?.length < 1 && (
            <div className=" justify-center items-center  cursor-pointer bg-[#413f3f50] rounded-[8px] w-[100%] px-[8px] py-[8px]  gap-3 h-[14rem] flex text-xl font-medium text-[#fff] ">
              <p>Empty!</p>
            </div>
          )}
          {saved?.length > 0 &&
            saved?.map((data) => {
              return (
                <SavedCard isLogout={isLogout} data={data} key={data?.id} />
              );
            })}
        </div>
      </div>
    );
  }
  if (isMobile) {
    return (
      <div className=" flex flex-col bg-[#121212] w-[100%] min-h-screen ">
        <div className=" justify-evenly items-center py-[1rem] px-[1rem] shadow-md border-b-[1px] shadow-[#000] border-[#b6b5b59c] flex  w-[100%] bg-[#3333336f] h-auto  ">
          {/* <div className=' w-[100%] px-[8px] py-[8px] justify-start items-start h-[4rem] flex text-2xl font-bold text-[#fff] ' >
                    <p>Saved</p>
                </div> */}
          <div className=" cursor-pointer hover:bg-[#333333] rounded-[8px] w-[100%] px-[8px] py-[8px] justify-start items-center gap-3 h-[4rem] flex text-base font-medium text-[#fff] ">
            <div className="bg-[#1877F2] rounded-full w-[36px] h-[36px] flex justify-center items-center ">
              <i className="savedItems  "></i>
            </div>
            <p>Saved items</p>
          </div>
          <div className=" w-[100%] px-[8px] h-[4rem] py-[8px] justify-end items-center  flex text-base font-medium text-[#fff] ">
            <p>All</p>
          </div>
        </div>

        <div className=" text-[#fff] justify-start items-start py-[1rem] px-[1rem] shadow-md  shadow-[#000]  flex flex-col w-[100%] gap-4  h-full min-h-screen ">
          {saved?.length < 1 && (
            <div className=" justify-center items-center  cursor-pointer bg-[#413f3f50] rounded-[8px] w-[100%] px-[8px] py-[8px]  gap-3 h-[20%] flex text-xl font-medium text-[#fff] ">
              <p>Empty!</p>
            </div>
          )}
          {saved?.length > 0 &&
            saved?.map((data) => {
              return (
                <SavedCard isLogout={isLogout} data={data} key={data?.id} />
              );
            })}
        </div>
      </div>
    );
  }
};

export default Saved;
