import { useMediaQuery } from "react-responsive";
import { useUserQuery } from "../../../redux/api/PhotoApi";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFriend, unFriend } from "../../../redux/services/UserPhotoSlice";

const ProfileCard = ({ data, pdata }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 991px)",
  });
  const isDesktop = useMediaQuery({ query: "(min-width: 992px)" });
  const id = useParams();

  const { isLoading, isSuccess } = useUserQuery(id?.id);

  const dispatch = useDispatch();

  const friends = useSelector((state) => state.UserPhotoSlice.friend);
  const isExisted = friends?.find((item) => item.id === pdata.id);

  if (isDesktop) {
    return (
      <>
        {isLoading && (
          <div className="flex flex-col w-[100%] h-[100%] justify-center  items-center border-1">
            <div className=" flex w-[940px] bg-[2c2b2b] justify-center items-start h-[400.74px] ">
              <img
                className="flex min-w-[940px] h-[400.74px] bg-blur rounded-b-[8px] object-cover "
                src=""
                alt=""
              />
            </div>
            <div className=" text-[#efeeee] w-[940px] h-[200px] flex ">
              <div className=" relative flex justify-evenly  w-[50%] ">
                <div className=" flex justify-center items-center absolute top-[-20%] w-[172px] h-[172px] p-[4px] rounded-full bg-[#2c2b2b] left-[10%] ">
                  <img className="  rounded-full " src="" alt="" />
                </div>
                <div className=" flex justify-start items-start absolute left-[50%] top-[10%] text-4xl font-semibold ">
                  <h1> </h1>
                </div>
              </div>
              <div className=" flex w-[50%] justify-center gap-3 items-center ">
                <div className="  font-medium flex justify-evenly items-center w-[131.219px] h-[36px] bg-[#2374E1] rounded-[5px] ">
                  <p className=" text-xl ">+</p>
                  <h1>Send Friend Request</h1>
                </div>
                <div className="  font-medium flex justify-evenly items-center w-[131.219px] h-[36px] bg-[#333333] rounded-[5px] ">
                  <p className=" text-xl ">|</p>
                  <h1>Edit profile</h1>
                </div>
              </div>
            </div>
          </div>
        )}
        {isSuccess && (
          <div className="flex flex-col w-[100%] h-[100%] justify-center  items-center border-1">
            <div className=" flex w-[940px] justify-center h-[400.74px] ">
              <img
                loading="eager"
                className="flex min-w-[940px] h-[400.74px] rounded-b-[8px] object-cover "
                src={data[0]?.urls?.full}
                alt=""
              />
            </div>
            <div className=" text-[#efeeee]  w-[940px] h-[200px] flex ">
              <div className=" relative flex justify-evenly  w-[50%] ">
                <div className=" flex justify-center items-center absolute top-[-20%] w-[172px] h-[172px] rounded-full bg-[#2c2b2b] left-[10%] ">
                  <img
                    loading="eager"
                    className=" w-[90%] rounded-full "
                    src={pdata?.profile_image?.large}
                    alt="Loading..."
                  />
                </div>
                <div className=" flex justify-start items-start absolute left-[50%] top-[10%] text-4xl font-semibold ">
                  <h1> {pdata?.username} </h1>
                </div>
              </div>
              <div className=" flex w-[50%] justify-center gap-3 items-center ">
                {isExisted && (
                  <div
                    onClick={() => dispatch(unFriend(pdata))}
                    className=" cursor-pointer  font-medium flex justify-evenly items-center w-[131.219px] h-[36px] bg-[#2b2c2c] rounded-[5px] "
                  >
                    <p className=" text-xl ">-</p>
                    <h1>Unfriend</h1>
                  </div>
                )}
                {!isExisted && (
                  <div
                    onClick={() =>
                      dispatch(
                        addFriend({
                          id: pdata?.id,
                          profile_image: pdata?.profile_image?.large,
                          username: pdata?.username,
                        })
                      )
                    }
                    className=" cursor-pointer  font-medium flex justify-evenly items-center w-[131.219px] h-[36px] bg-[#2374E1] rounded-[5px] "
                  >
                    <p className=" text-xl ">+</p>
                    <h1>Add Friend</h1>
                  </div>
                )}

                <div className="  font-medium flex justify-evenly items-center w-[131.219px] h-[36px] bg-[#333333] rounded-[5px] ">
                  <p className=" text-xl ">+</p>
                  <h1>Follow</h1>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
  if (isMobile) {
    return (
      <>
        {isLoading && (
          <div className="flex flex-col w-[100%] h-[100%] pb-[1rem] justify-start  items-center border-1">
            <div className=" flex flex-col w-[100%] justify-start h-[200.74px] ">
              <img
                className="flex min-w-[100%] bg-[#222222]  h-[200.74px] rounded-b-[8px] object-cover "
                src=""
                alt=""
              />
            </div>
            <div className=" text-[#efeeee] w-[100%] h-auto gap-6 flex flex-col ">
              <div className=" relative gap-4 flex flex-col justify-evenly h-auto  w-[100%] ">
                <div className=" flex justify-center items-center  mt-[-20%] w-[100%] h-[172px] p-[4px] rounded-full  ">
                  <img
                    className=" w-[150px] h-[150px] bg-[#2c2b2b]  rounded-full "
                    src=""
                    alt=""
                  />
                </div>
                <div className=" flex justify-center items-start  text-4xl font-semibold ">
                  <h1> </h1>
                </div>
              </div>
              <div className=" flex w-[100%] justify-evenly gap-3 items-center ">
                <div className="  font-medium flex justify-evenly items-center w-[131.219px] h-[36px] bg-[#2374E1] rounded-[5px] ">
                  <p className=" text-xl ">+</p>
                  <h1>Add to story</h1>
                </div>
                <div className="  font-medium flex justify-evenly items-center w-[131.219px] h-[36px] bg-[#333333] rounded-[5px] ">
                  <p className=" text-xl ">|</p>
                  <h1>Edit profile</h1>
                </div>
              </div>
            </div>
          </div>
        )}
        {!isLoading && (
          <div className="flex flex-col w-[100%] h-[100%] pb-[1rem] justify-start  items-center border-1">
            <div className=" flex flex-col w-[100%] justify-start h-[200.74px] ">
              <img
                className="flex min-w-[100%] h-[200.74px] rounded-b-[8px] object-cover "
                src={data[0]?.urls?.full}
                alt=""
              />
            </div>
            <div className=" text-[#efeeee] w-[100%] h-auto gap-6 flex flex-col ">
              <div className=" relative gap-4 flex flex-col justify-evenly h-auto  w-[100%] ">
                <div className=" flex justify-center items-center  mt-[-20%] w-[100%] h-[172px]  rounded-full bg-[#2c2b2b00] ">
                  <img
                    className=" h-[90%] w-[40%] object-cover bg-[#363636] p-[3px]  rounded-full "
                    src={pdata?.profile_image?.large}
                    alt=""
                  />
                </div>
                <div className=" flex justify-center items-start  text-4xl font-semibold ">
                  <h1> {pdata?.username} </h1>
                </div>
              </div>
              <div className=" flex w-[100%] justify-evenly gap-3 items-center ">
                {isExisted && (
                  <div
                    onClick={() => dispatch(unFriend(pdata))}
                    className=" cursor-pointer  font-medium flex justify-evenly items-center w-[131.219px] h-[36px] bg-[#2b2c2c] rounded-[5px] "
                  >
                    <p className=" text-xl ">-</p>
                    <h1>Unfriend</h1>
                  </div>
                )}
                {!isExisted && (
                  <div
                    onClick={() =>
                      dispatch(
                        addFriend({
                          id: pdata?.id,
                          profile_image: pdata?.profile_image?.large,
                          username: pdata?.username,
                        })
                      )
                    }
                    className=" cursor-pointer  font-medium flex justify-evenly items-center w-[131.219px] h-[36px] bg-[#2374E1] rounded-[5px] "
                  >
                    <p className=" text-xl ">+</p>
                    <h1>Add Friend</h1>
                  </div>
                )}
                <div className="  font-medium flex justify-evenly items-center w-[131.219px] h-[36px] bg-[#333333] rounded-[5px] ">
                  <p className=" text-xl ">+</p>
                  <h1>Follow</h1>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
  if (isTablet) {
    return (
      <>
        {isLoading && (
          <div className="flex flex-col w-[100%] h-[100%] pb-[1rem] justify-start  items-center border-1">
            <div className=" flex flex-col w-[100%] justify-start h-[200.74px] ">
              <img
                className="flex min-w-[100%] bg-[#222222]  h-[200.74px] rounded-b-[8px] object-cover "
                src=""
                alt=""
              />
            </div>
            <div className=" text-[#efeeee] w-[100%] h-auto gap-6 flex flex-col ">
              <div className=" relative gap-4 flex flex-col justify-evenly h-auto  w-[100%] ">
                <div className=" flex justify-center items-center  mt-[-20%] w-[100%] h-[172px] p-[4px] rounded-full  ">
                  <img
                    className=" w-[150px] h-[150px] bg-[#2c2b2b]  rounded-full "
                    src=""
                    alt=""
                  />
                </div>
                <div className=" flex justify-center items-start  text-4xl font-semibold ">
                  <h1> </h1>
                </div>
              </div>
              <div className=" flex w-[100%] justify-evenly gap-3 items-center ">
                {isExisted && (
                  <div
                    onClick={() => dispatch(unFriend(pdata))}
                    className=" cursor-pointer  font-medium flex justify-evenly items-center w-[131.219px] h-[36px] bg-[#2b2c2c] rounded-[5px] "
                  >
                    <p className=" text-xl ">-</p>
                    <h1>Unfriend</h1>
                  </div>
                )}
                {!isExisted && (
                  <div
                    onClick={() =>
                      dispatch(
                        addFriend({
                          id: pdata?.id,
                          profile_image: pdata?.user?.profile_image?.large,
                          username: pdata?.user?.username,
                        })
                      )
                    }
                    className=" cursor-pointer  font-medium flex justify-evenly items-center w-[131.219px] h-[36px] bg-[#2374E1] rounded-[5px] "
                  >
                    <p className=" text-xl ">+</p>
                    <h1>Add Friend</h1>
                  </div>
                )}
                <div className="  font-medium flex justify-evenly items-center w-[131.219px] h-[36px] bg-[#333333] rounded-[5px] ">
                  <p className=" text-xl ">|</p>
                  <h1>Edit profile</h1>
                </div>
              </div>
            </div>
          </div>
        )}
        {!isLoading && (
          <div className="flex flex-col w-[100%] h-[100%] pb-[1rem] justify-start  items-center border-1">
            <div className=" flex flex-col w-[100%] justify-start h-[200.74px] ">
              <img
                className="flex min-w-[100%] h-[200.74px] rounded-b-[8px] object-cover "
                src={pdata?.urls?.full}
                alt=""
              />
            </div>
            <div className=" text-[#efeeee] w-[100%] h-auto gap-6 flex flex-col ">
              <div className=" relative gap-4 flex flex-col justify-evenly h-auto  w-[100%] ">
                <div className=" flex justify-center items-center  mt-[-20%] w-[100%] h-[172px]  rounded-full bg-[#2c2b2b00] ">
                  <img
                    className=" h-[90%] w-[40%] object-cover bg-[#363636] p-[3px]  rounded-full "
                    src={pdata?.user?.profile_image?.large}
                    alt=""
                  />
                </div>
                <div className=" flex justify-center items-start  text-4xl font-semibold ">
                  <h1> {pdata?.user?.username} </h1>
                </div>
              </div>
              <div className=" flex w-[100%] justify-evenly gap-3 items-center ">
                {isExisted && (
                  <div
                    onClick={() => dispatch(unFriend(pdata))}
                    className=" cursor-pointer  font-medium flex justify-evenly items-center w-[131.219px] h-[36px] bg-[#2b2c2c] rounded-[5px] "
                  >
                    <p className=" text-xl ">-</p>
                    <h1>Unfriend</h1>
                  </div>
                )}
                {!isExisted && (
                  <div
                    onClick={() =>
                      dispatch(
                        addFriend({
                          id: pdata?.id,
                          profile_image: pdata?.user?.profile_image?.large,
                          username: pdata?.user?.username,
                        })
                      )
                    }
                    className=" cursor-pointer  font-medium flex justify-evenly items-center w-[131.219px] h-[36px] bg-[#2374E1] rounded-[5px] "
                  >
                    <p className=" text-xl ">+</p>
                    <h1>Add Friend</h1>
                  </div>
                )}
                <div className="  font-medium flex justify-evenly items-center w-[131.219px] h-[36px] bg-[#333333] rounded-[5px] ">
                  <p className=" text-xl ">+</p>
                  <h1>Follow</h1>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
};

export default ProfileCard;
