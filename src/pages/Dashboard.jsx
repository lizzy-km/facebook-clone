import Cookies from "js-cookie";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const user = useSelector((state) => state.authSlice.user);
  const token = useSelector((state) => state.authSlice.token);
  const nav = useNavigate();
  //(token);

  useEffect(() => {
    if (token === null) {
      nav("/login");
    }
  }, []);

  const logout = () => {
    Cookies.remove("user");
    window.location.reload();
  };

  // useEffect(()=>{
  //     nav('/login')
  // },[logout])

  return (
    <div className=" flex justify-between items-center p-[1rem] bg-slate-700 w-screen text-slate-100 h-[3rem]">
      <div>
        <h2 className=" font-medium text-xl"> {user?.name} </h2>
      </div>
      <div className=" flex gap-2 ">
        <p> {user?.email} </p>
        <Link onClick={logout} className=" hover:text-red-600 ">
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
