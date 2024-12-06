import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./LoginScreen.css";
import axios from "axios";
import { BACKEND_URL } from "../../constants/urls";
import Swal from "sweetalert2";

function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email or phone number is required")
      .matches(
        /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,3}$|^[0-9]{10}$/,
        "Invalid email or phone number"
      ),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
 
  const handleSubmit = async (values) => {
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/v1/user/login`,
        {
          values,
        },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        Swal.fire({
          title: "Good job!",
          text: "Successfully loggedIn",
          icon: "success",
        });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        // handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email or Phone Number</label>
              <Field
                type="text"
                name="email"
                id="email"
                className="form-input"
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-wrapper">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  className="form-input"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <button type="submit" className="submit-btn">
              Login
            </button>
          </Form>
        </Formik>
        <div className="login-links">
          <p onClick={() => navigate("/register")} className="link-text">
            Create New Account
          </p>
          <p onClick={() => navigate("/reset-password")} className="link-text">
            Forgot Password?
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
