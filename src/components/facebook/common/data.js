import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRegisterMutation } from "../../../redux/api/AuthApi";
import { useFakeLoginMutation } from "../../../redux/api/PostApi";
import { useNavigate } from "react-router-dom";

function extractEmails(text) {
  return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
}

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

const SignupHandler = async (
  e,
  name,
  email,
  password,
  password_confirmation,
  avatar
) => {
  const [register] = useRegisterMutation();
  const [signup] = useFakeLoginMutation();
  const [error, setError] = useState([]);

  const navigate = useNavigate();
  try {
    e.preventDefault();

    const body = {
      name,
      email,
      password,
      avatar,
    };
    const user = {
      id: Date.now(),
      name,
      email,
      password,
      password_confirmation,
    };
    const { data } = await register(user);
    const { error } = await register(user);
    //(data);
    if (data?.success) {
      const res = await signup(body);
      //(res);
      if (res?.error?.data?.message) {
        setError(res?.error?.data?.message);
      }
      if (res?.data) {
        Cookies.set("LID", res?.data?.id);
        // setNewAcc(!newAcc)
        // navigate('/login')
      }
    }
  } catch (error) {
    //(error);
  }
};

function useFetchDataFromApi(RequestType, Param) {
  const token = "4014|u4yp9RlCwObTqWeu9SoKIEnhAUXd90FsosqjEEYT";
  const [data, setData] = useState();
  useEffect(() => {
    if (RequestType === "POST") {
      axios
        .post(`https://contact-app.mmsdev.site/api/v1/${Param}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setData(response);
        })
        .catch((error) => {
          //(error);
        });
    } else if (RequestType === "GET") {
      axios
        .get(`https://contact-app.mmsdev.site/api/v1/${Param}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setData(response);
        })
        .catch((error) => {
          //(error);
        });
    } else if (RequestType === "PUT") {
      axios
        .put(`https://contact-app.mmsdev.site/api/v1/${Param}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setData(response);
        })
        .catch((error) => {
          //(error);
        });
    } else if (RequestType === "DELETE") {
      axios
        .delete(`https://contact-app.mmsdev.site/api/v1/${Param}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setData(response);
        })
        .catch((error) => {
          //(error);
        });
    } else if (RequestType === "PATH") {
      axios
        .path(`https://contact-app.mmsdev.site/api/v1/${Param}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setData(response);
        })
        .catch((error) => {
          //(error);
        });
    }

    return {
      data,
    };
  }, []);
}

function useFetchPost(setData, setPage, page) {
  const dispatch = useDispatch();
  const token = "4014|u4yp9RlCwObTqWeu9SoKIEnhAUXd90FsosqjEEYT";

  useEffect(() => {
    axios
      .get(`https://contact-app.mmsdev.site/api/v1/contact?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
        // setPage(response.data.contacts.last_page)
      })
      .catch((error) => {
        //(error);
      });

    // }
  }, []);
  useEffect(() => {
    axios
      .get(`https://contact-app.mmsdev.site/api/v1/contact?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        //(error);
      });

    // }
  }, [page]);
}

function isValidUrl(urlString) {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
}
function postDate(data) {
  var dateNow = Date.now();
  var created_at = data?.creationAt;

  const now = new Date(dateNow);
  const nowYear = now.getUTCFullYear();
  const nowMonth = now.getUTCMonth();
  const nowDay = now.getDate();
  const nowHour = now.getUTCHours();
  const nowMinute = now.getUTCMinutes();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const postDate = new Date(created_at);

  const postYear = postDate.getUTCFullYear();
  const postMonth = postDate.getUTCMonth();
  const postDay = postDate.getDate();
  const postHour = postDate.getUTCHours();
  const postMinute = postDate.getUTCMinutes();

  var diffDay = nowDay - postDay;
  var diffHour = diffDay * 24 + nowHour - postHour;

  var diffMinute = nowMinute - postMinute;
  var diffYear = postYear - nowYear;

  const month = monthNames[postMonth].slice("", 3);
  return {
    diffYear,
    postYear,
    nowYear,
    month,
    diffDay,
    diffHour,
    diffMinute,
    postMonth,
    postDay,
    nowMonth,
  };
}

export {
  extractEmails,
  useFetchPost,
  isValidUrl,
  postDate,
  LoginHandler,
  SignupHandler,
};
