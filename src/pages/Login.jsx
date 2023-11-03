import { useEffect, useState } from "react";
import { useLoginMutation } from "../redux/api/AuthApi";
import { Link, useNavigate } from "react-router-dom";
import { PasswordInput, TextInput } from "@mantine/core";
import Cookies from "js-cookie";
import { Button, Skeleton, useToast } from "@chakra-ui/react";
import { useGetSingleUserQuery, useUserLoginMutation } from "../redux/api/PostApi";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [error] = useState([]);

  const [{ isLoading }] = useLoginMutation();

  const nav = useNavigate();

  const token = Cookies.get("token");
  useEffect(() => {
    if (token) {
      nav("/");
    }
  }, []);

  const toast = useToast();

  const iu = useGetSingleUserQuery();
  const [signIn] = useUserLoginMutation()

  const LoginHandler = async (e) => {
    try {
      e.preventDefault();
      const user = {
        email,
        password,
      };

      //  if (data?.success) {

      const {data}= await signIn(user)


      const token = data?.access_token


      if (data) {
        Cookies.set('tokenApi', token)
      }
      const isUser = iu?.data?.find((data) => data?.email === email);
      const User = iu?.data?.filter((data) => data?.email === email);

      if (isUser) {
        Cookies.set("userData", JSON.stringify(User));

        Cookies.set("token", User?.password);

        window.location.replace("/");
      } else {
        toast({
          position: "top-right",
          title:
            "Account does not exist, Please try again after created account! .",
          status: "error",
          duration: 8000,
          isClosable: true,
        });
        window.location.replace("/register");
      }
    } catch (error) {
      //(error);
    }
  };

  return (
    <div className=" flex h-screen justify-center">
      <form
        onSubmit={LoginHandler}
        className=" w-96 p-7   flex flex-col shadow-lg gap-8  "
      >
        <h2 className=" self-center text-2xl text-gray-500 font-semibold ">
          Login
        </h2>

        <div>
          <TextInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email..."
          />
          <p className=" text-red-600 "> {error?.email} </p>
        </div>
        <div>
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password..."
          />
          <p className=" text-red-600 "> {error?.password} </p>
        </div>

        <div className=" self-center flex gap-2  ">
          <Link
            to="/register"
            className="   font-medium flex flex-col justify-center items-center "
          >
            {" "}
            <p>You don't have any account yet?</p>{" "}
            <p className=" text-blue-700 font-medium cursor-pointer ">Signup</p>{" "}
          </Link>
        </div>

        {isLoading && (
          <Button
            isLoading={<Skeleton />}
            className=" bg-blue-600 text-slate-100 rounded-md p-2 font-medium "
          >
            <p>Login</p>
          </Button>
        )}
        {!isLoading && (
          <button
            type="submit"
            className=" bg-blue-600 text-slate-100 rounded-md p-2 font-medium "
          >
            <p>Login</p>
          </button>
        )}
      </form>
    </div>
  );
};

export default Login;
