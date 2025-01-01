import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./LoginScreen.css";
import axios from "axios";
import Swal from "sweetalert2";
import { login } from "../../services/apis";

function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
      setLoading(true);
      setError(null);
      const response = await login(values);
      setLoading(false);

      if (response.success) {
        localStorage.setItem("user", JSON.stringify(response.user));

        Swal.fire({
          title: "Good job!",
          text: "Successfully logged in",
          icon: "success",
        });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setError(response.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && (
        <div className="overlay show">
          <div className="message">Please Wait...</div>
        </div>
      )}
      <div className="login-container">
        <div className="login-card">
          {error && (
            <div
              style={{
                backgroundColor: "#ffa8a5",
                display: "flex",
                justifyContent: "center",
                padding: "20px",
                borderRadius: "10px",
                color: "#222",
                marginBottom: "10px",
              }}
            >
              {error}
            </div>
          )}
          <h1 className="login-title">Login</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email or Phone Number</label>
                <Field type="text" name="email" id="email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-wrapper">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>
              <button type="submit" className="submit-btn" disabled={loading}>
                Login
              </button>
            </Form>
          </Formik>
          <div className="login-links">
            <p onClick={() => navigate("/register")} className="link-text">
              Create New Account
            </p>
            <p
              onClick={() => navigate("/reset-password")}
              className="link-text"
            >
              Forgot Password?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
