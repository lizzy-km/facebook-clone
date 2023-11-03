import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CatData, addFun, addSpam } from "../redux/services/PostCategorySlice";
import { useDispatch, useSelector } from "react-redux";

const Ecom = () => {
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const nav = useNavigate();
  useEffect(() => {
    if (token === null) {
      nav("/login");
    }
  }, []);

  const dataC = CatData;

  const SelectData = [
    "Spam",
    "Shit",
    "Fun",
    "Tech",
    "Trend",
    "All",
    "Art",
    "Edu",
    "Job",
    "Ecommerce",
    "Friends",
  ];

  const [cat, setCat] = useState([]);

  const dataFs = useSelector((state) => state.PostCategorySlice.Fun);

  const catD = dataC.filter((da) => da === cat);

  useEffect(() => {
    //(cat);
    // //(dataFs);
  }, [cat]);

  const handleInputChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCat((prevCat) => [...prevCat, value]);
    } else {
      // If the checkbox is unchecked, remove the value from the  cat array
      setCat((prevCat) => prevCat.filter((item) => item !== value));
    }
  };

  const AddPosts = () => {
    //  //(Fun);
    dispatch(
      addFun({
        id: "Fun",
        name: "FunData1",
      })
    );
  };

  //(dataFs);

  return (
    <div className=" flex flex-col justify-center ">
      {dataFs?.map((data) => {
        return (
          <p className=" p-[3rem] bg-slate-400 " key={data}>
            {data?.name}
          </p>
        );
      })}

      <div>
        <div className=" flex flex-col ">
          <h3>Select multiple values:</h3>
          {SelectData.map((dat) => {
            return (
              <label key={dat}>
                <input
                  type="checkbox"
                  value={dat}
                  checked={cat.includes(dat)}
                  onChange={handleInputChange}
                />
                {dat}
              </label>
            );
          })}

          {/* Add more checkbox inputs as needed */}

          <button
            className=" px-[2rem] py-[1rem] rounded-2xl bg-slate-500 "
            onClick={AddPosts}
            type="submit"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ecom;
