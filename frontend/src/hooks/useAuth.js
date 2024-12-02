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
      const { status, user } = data;
      setUsername(user);
      setIsLoggedIn(true);
      if (status) {
        toast(`Hello ${user}`, {
          position: "top-right",
        });
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

  return { username, logout, isLoggedIn };
};

export default useAuth;
