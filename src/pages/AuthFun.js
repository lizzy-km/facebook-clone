import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {
  useCreateCategoriesMutation,
  useFakeLoginMutation,
  useGetCategoriesQuery,
  useGetSingleUserQuery,
} from "../redux/api/PostApi";
import {
  useDebugValue,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import { useToast } from "@chakra-ui/react";

const AuthFun = () => {
  //   const  arr = [1,2,4,7,9,11,100,0,21,8];

  // let i ;
  // let max = -Infinity;

  //  for(i in arr){
  //     if(max < arr[i]) {
  //         max = arr[i]

  // }
  // }

  // console.log(max)

  // const Arr = arr.filter(data => data !== max)

  // let min = -Infinity

  // function minMaxFun (array){
  //     for(i in array){
  //     if(min < array[i]) {
  //         min = array[i]

  // }
  // }
  // }

  // minMaxFun(Arr)
  // console.log(min)

  // function sortArray(array) {

  //   for (let i = 0; i < array.length - 1; i++) {
  //      for (let j = 0; j < array.length - i - 1; j++) {
  //          if (array[j] > array[j + 1]) {
  //         const temp = array[j];
  //         array[j] = array[j + 1];
  //         array[j + 1] = temp;
  //       }
  //     }
  //   }
  // }

  // for(let i =0; i < arr.length -1; i++){
  //     for(let j = 0; j< arr.length -i -1; j++){
  //         if(arr[j] > arr[j + 1]){
  //             const tempArr = arr[j]
  //             arr[j] = arr[j + 1]
  //             arr[j + 1] = tempArr

  //         }

  //     }
  // }

  // sortArray(arr)

  // console.log(arr)

  // const sortedArray = arr.slice().sort((a, b) => a - b );

  // console.log(sortedArray);

  const useOnlineStatus = () => {
    const [online, setOnline] = useState(navigator.onLine);

    useEffect(() => {
      // Add event listeners to track online/offline status changes
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      // Cleanup by removing event listeners when the component unmounts
      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }, []);

    const handleOnline = () => {
      setOnline(true);
    };

    const handleOffline = () => {
      setOnline(false);
    };

    return online;
  };

  const [signup, { isLoading }] = useFakeLoginMutation();
  const [addCategory] = useCreateCategoriesMutation();
  const catList = useGetCategoriesQuery();

  let LID;
  if (!LID) {
    Cookies.set("userData", JSON.stringify("userData"));
  }
   LID = Cookies?.get("userData");

  

  const UID = JSON.parse(LID);
  let UserDataFromCookies;
  if (UID !== "userData") {
    UserDataFromCookies = UID?.find((data) => data);
  }
  // const UserDataFromCookies = UID?.find(data => data)
  const Data = useGetSingleUserQuery();
  const userData = Data?.data?.filter(
    (data) => data?.email === UserDataFromCookies?.email
  );

  const user = userData?.find((data) => data);

  // const user = userData?.find(data => data)

  let publicProfile;
  const publicFun = (props) => {
    const publicPf = Data?.data?.filter((pf) => pf?.id === props);

    publicProfile = publicPf?.find((pf) => pf);
    //(props);
    return { publicProfile };
  };

  const [viewImage, setViewImage] = useState();
  const [signUpRes, setSignUpRes] = useState();

  const LoginHandler = async (e, email, password) => {
    try {
      e.preventDefault();
      const user = {
        email,
        password,
      };

      //  dispatch(AddUser(user))
    } catch (error) {
      //(error);
    }
  };

  const navigate = useNavigate();

  const toast = useToast();

  const SignupHandler = async (
    e,
    name,
    email,
    password,
    password_confirmation,
    imgUrl,
    setError
  ) => {
    try {
      e.preventDefault();

      const body = {
        name,
        email,
        password,
        avatar:imgUrl,
      };
      const categoryPost = {
        name: "post",
        image: imgUrl,
      };
      const categoryStory = {
        name: "story",
        image: imgUrl,
      };
      //  if (user) {
      const res = await signup(body);
      console.log(res);
      setSignUpRes(res);
      if (res?.error?.data?.message) {
        setError(res?.error?.data?.message);
      }
      if (res?.data) {
        Cookies.set("LID", res?.data?.id);
        const isPostCat = catList?.data?.find((data) => data?.name === "post");
        const isStoryCat = catList?.data?.find(
          (data) => data?.name === "story"
        );
        if (!isPostCat) {
          const cateP = await addCategory(categoryPost);
        }
        if (!isStoryCat) {
          const cateS = await addCategory(categoryStory);
        }
        if (isPostCat && isStoryCat) {
          toast({
            position: "top-right",
            title: "Account create successfully!.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          navigate("/login");
        }
      }
      //  }
    } catch (error) {
      //(error);
    }

    return { isLoading };
  };

  return {
    SignupHandler,
    user,
    publicFun,
    viewImage,
    setViewImage,
    useOnlineStatus,
    signUpRes,
    isLoading,
  };
};

export default AuthFun;
