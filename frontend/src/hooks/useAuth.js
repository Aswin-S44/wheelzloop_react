import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { BACKEND_URL } from "../constants/urls";

const useAuth = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        setIsLoggedIn(false);
      }
      const { data } = await axios.post(
        BACKEND_URL,
        {},
        { withCredentials: true }
      );
      console.log("data------------", data);
      const { status, user, me } = data;
      setUsername(user);
      setIsLoggedIn(true);
      setCurrentUser(me);
      if (status) {
      } else {
        removeCookie("token");
        // navigate("/login");
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const logout = () => {
    removeCookie("token");
    navigate("/");
  };

  return { username, logout, isLoggedIn, currentUser };
};

export default useAuth;
