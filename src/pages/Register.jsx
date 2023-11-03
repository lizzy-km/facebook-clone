import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import AuthFun from "./AuthFun";
import axios from "axios";
import Cookies from "js-cookie";
import { useUserLoginMutation } from "../redux/api/PostApi";


const Register = () => {

  const [signIn] = useUserLoginMutation()

  const LoginHandler = async () => {
    try {
      const user = {
        email:'lizzy@gmail.com',
        password:'123456',
      };

      //  if (data?.success) {

      const {data}= await signIn(user)


      const token = data?.access_token


      if (data) {
        Cookies.set('tokenApi', token)
      }
      

      
    } catch (error) {
      //(error);
    }
  };

  useEffect(()=>{
    LoginHandler()
  },[])

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [password_confirmation, setPassword_confirmation] = useState();
  const [avatar, setAvatar] = useState(
    "https://github.com/lizzy-km/image/blob/main/shopping-cat-with-cart-upscaled.png?raw=true"
  );

  const [imageFile, setImageFile] = useState(null);
  const [imgUrl, setImgUrl] = useState("https://github.com/lizzy-km/image/blob/main/shopping-cat-with-cart-upscaled.png?raw=true");

  const [error, setError] = useState([]);

  const [showPassword, setShowPassword] = useState(false);

  const { SignupHandler, isLoading } = AuthFun();

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


  function getFirstWord(str) {
    // Split the string into an array of words using whitespace as the delimiter
    const words = str?.split(/\s+/);

    // Return the first word (element at index 0)
    if (words?.length > 0) {
      return words[0];
    } else {
      // Handle the case where the input string is empty
      return "";
    }
  }

  let err = [];
  let i;
  for (i in error) {
    err.push(error[i]);
  }

  function isValidEmail(em) {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Use the test() method to check if the email matches the regex pattern
    return emailRegex.test(em);
  }

  function isAlphaNumeric(pas) {
    // Regular expression to match only letters and numbers (alphanumeric characters)
    const regex = /^[a-zA-Z0-9]+$/;

    // Use the test() method to check if the password matches the regex pattern
    return regex.test(pas);
  }

  

  return (
    <Flex
      mt={"6"}
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="userName" isRequired>
                  <FormLabel>User Name</FormLabel>
                  <Flex gap={"2"} flexDirection={"column"}>
                    {name?.length < 1 ? (
                      <Alert
                        my={"2"}
                        px={"1"}
                        py={0}
                        h={"auto"}
                        textAlign={"center"}
                        color={"red.500"}
                        bg={"blackAlpha.500"}
                        status="warning"
                      >
                        {" "}
                        name should not be empty{" "}
                      </Alert>
                    ) : null}
                  </Flex>

                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Flex gap={"2"} flexDirection={"column"}>
                {email?.length < 1 ? (
                  <Alert
                    mb={"2"}
                    px={"1"}
                    py={0}
                    h={"auto"}
                    textAlign={"center"}
                    color={"red.500"}
                    bg={"blackAlpha.500"}
                    status="warning"
                  >
                    {" "}
                    Email should not be empty{" "}
                  </Alert>
                ) : null}
                {!isValidEmail(email) ? (
                  <Alert
                    mb={"2"}
                    px={"1"}
                    py={0}
                    h={"auto"}
                    textAlign={"center"}
                    color={"red.500"}
                    bg={"blackAlpha.500"}
                    status="warning"
                  >
                    {" "}
                    Email should be an email{" "}
                  </Alert>
                ) : null}
              </Flex>

              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Flex gap={"2"} flexDirection={"column"}>
                {password?.length < 4 ? (
                  <Alert
                    mb={"2"}
                    px={"1"}
                    py={0}
                    h={"auto"}
                    textAlign={"left"}
                    color={"red.500"}
                    bg={"blackAlpha.500"}
                    status="warning"
                  >
                    {" "}
                    password must be longer than or equal to 4 characters{" "}
                  </Alert>
                ) : null}
                {!isAlphaNumeric(password) ? (
                  <Alert
                    mb={"2"}
                    px={"1"}
                    py={0}
                    h={"auto"}
                    textAlign={"left"}
                    color={"red.500"}
                    bg={"blackAlpha.500"}
                    status="warning"
                  >
                    {" "}
                    password must contain only letters and numbers{" "}
                  </Alert>
                ) : null}
              </Flex>

              <InputGroup>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              {password_confirmation?.length > 0 ? (
                password === password_confirmation ? null : (
                  <Alert
                    mb={"2"}
                    px={"1"}
                    py={0}
                    h={"auto"}
                    textAlign={"left"}
                    color={"red.500"}
                    bg={"blackAlpha.500"}
                    status="warning"
                  >
                    {" "}
                    Password doesn't match{" "}
                  </Alert>
                )
              ) : null}
              <InputGroup>
                <Input
                  value={password_confirmation}
                  onChange={(e) => setPassword_confirmation(e.target.value)}
                  type={showPassword ? "text" : "password"}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>
                Profile image{" "}
                <Text color={"red.500"}>(Paste your image Url)</Text>{" "}
              </FormLabel>
              <InputGroup>
                <Input
                  onChange={handleChange}
                  type="file"
                />
                <InputRightElement h={"full"}>
                  <Avatar src={imgUrl} />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Stack spacing={10} pt={2}>
              {isLoading && (
                <Button
                  loadingText="Submitting"
                  isLoading={<Skeleton />}
                  size="lg"
                  disabled
                  bg={"blue.900"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign up
                </Button>
              )}
              {!isLoading && (
                <Button
                  onClick={(e) =>
                    SignupHandler(
                      e,
                      name,
                      email,
                      password,
                      password_confirmation,
                      imgUrl,
                      setError
                    )
                  }
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign up
                </Button>
              )}
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link to={"/login"} color={"blue.400"}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Register;
