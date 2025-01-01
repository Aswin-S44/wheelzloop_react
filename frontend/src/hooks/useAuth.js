import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const useAuth = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [email,setEmail] = useState(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUsername(user.firstName);
      setIsLoggedIn(true);
      setCurrentUser(user);
      setEmail(user.email)
    }
  }, [navigate]);

  const logout = () => {
    removeCookie("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return { username, logout, isLoggedIn, currentUser,email };
};

export default useAuth;
