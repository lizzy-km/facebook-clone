import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateNewCollectionMutation,
  useDeleteCollectionMutation,
  useUserCollectionQuery,
  useUserQuery,
} from "../redux/api/PhotoApi";
import axios from "axios";

const Movie = () => {
  const token = Cookies.get("token");
  const user = useUserQuery();
  const userCol = useUserCollectionQuery();
  const [deleteC] = useDeleteCollectionMutation();
  // //(user);
  //(userCol?.data);
  const userC = userCol?.data;
  const data = {
    id: Date.now(),
    title: "Lizzy",
    description:
      "https://i.pinimg.com/564x/a2/e4/d7/a2e4d7266325623ee91180dcf37f0842.jpg",
    private: false,
    preview_photos:
      "https://i.pinimg.com/564x/a2/e4/d7/a2e4d7266325623ee91180dcf37f0842.jpg",
  };
  const [post] = useCreateNewCollectionMutation();
  const postU = async () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts`, {
        body: JSON.stringify({
          title: "Vincy",
          body: "bar",
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then((response) => {
        //(response);
      })
      .catch((error) => {
        //(error);
      });
  };
  const nav = useNavigate();
  useEffect(() => {
    if (token === null) {
      nav("/login");
    }
  }, []);
  const [isShow, setIsShow] = useState(false);

  return (
    <div>
      Movie
      <div className=" p-[2rem] bg-black " onClick={postU}>
        Post
      </div>
      <div className=" flex flex-wrap w-[100%] gap-4 ">
        {userC?.map((data) => {
          return (
            <img
              onClick={() => deleteC(data?.id)}
              key={data?.id}
              className=" w-[5rem] h-[8rem] object-cover "
              src={data?.description}
              alt=""
            />
          );
        })}
      </div>
      <button onClick={postU}>Click</button>
    </div>
  );
};

export default Movie;
