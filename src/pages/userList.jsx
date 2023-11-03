import { Badge, Flex, Link } from "@chakra-ui/react";
import Cookies from "js-cookie";
import React from "react";
import AuthFun from "./AuthFun";

const UserList = ({ data }) => {
  const { useOnlineStatus } = AuthFun();

  const isOnline = useOnlineStatus();
  return (
    <Flex w={"100%"}>
      <Link
        key={data?.id}
        className="min-w-[40px] h-[40px] relative   rounded-full"
        onClick={() => Cookies.set("UserId", data?.id)}
        to={`/${data?.name}`}
      >
        <img
          className="p_o_p w-[40px] h-[40px]  rounded-full  object-cover m-2"
          src={data?.avatar}
          alt={`${data?.name}'s profile picture`}
        />
        <Badge
          border={"1.5px solid #333333"}
          right={"-1"}
          bottom={"-2"}
          position={"absolute"}
          p={"1"}
          rounded={"full"}
          bg={isOnline ? "green.500" : "gray.600"}
        />
      </Link>
    </Flex>
  );
};

export default UserList;
