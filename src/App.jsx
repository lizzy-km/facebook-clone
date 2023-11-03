// import { useEffect, useState } from 'react'
import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Facebook from "./pages/Facebook";
import Movie from "./pages/Movie";
import Ecom from "./pages/Ecom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import NavBar from "./components/facebook/common/NavBar";
import UserProfile from "./components/facebook/others/UserProfile";
import NavBarM from "./components/m_facebook/common/NavBarM";
import { useMediaQuery } from "react-responsive";
import CreatePost from "./pages/CreatePost";
import AdminProfile from "./components/facebook/others/AdminProfile";
import Saved from "./pages/Saved";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { CatData } from "./redux/services/PostCategorySlice";
import { SavePost } from "./redux/services/UserPhotoSlice";
import { useUserLoginMutation } from "./redux/api/PostApi";

function App() {

  

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 991px)",
  });
  const isDesktop = useMediaQuery({ query: "(min-width: 992px)" });

  const [isLogout, setIsLogout] = useState(false);

  isLogout === true && Cookies.remove("*");

  return (
    <BrowserRouter>
      <div className="    w-[100%]  overflow-hidden h-auto ">
        {isMobile && <NavBarM setIsLogout={setIsLogout} />}
        {isTablet && <NavBar setIsLogout={setIsLogout} />}
        {isDesktop && <NavBar setIsLogout={setIsLogout} />}

        <Routes>
          <Route path="/" element={<Facebook isLogout={isLogout} />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/ecommerce" element={<Ecom />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile/:id" element={<UserProfile />} />
          <Route path="/:name" element={<AdminProfile />} />

          <Route path="/addpost" element={<CreatePost />} />
          <Route path="/savepost" element={<SavePost />} />

          <Route path="/saved" element={<Saved isLogout={isLogout} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
