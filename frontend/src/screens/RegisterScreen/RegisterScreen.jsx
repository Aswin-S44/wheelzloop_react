import React, { useState } from "react";
import "./RegisterScreen.css";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { BACKEND_URL } from "../../constants/urls";
import axios from "axios";

function RegisterScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const initialValues = {
    firstName: "",
    phoneNumber: "",
    email: "",
    password: "",
    hasShop: false,
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Invalid phone number")
      .required("Phone number is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    hasShop: Yup.boolean().required("Please specify if you have a shop"),
  });

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${BACKEND_URL}/api/v1/user/register`,
        values
      );
      setLoading(false);
      if (data.success) {
        Swal.fire({
          title: "Good job!",
          text: "Successfully Created Account",
          icon: "success",
        });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <section>
      <div>
        {loading && (
          <div className="overlay show">
            <div className="message">Please Wait...</div>
          </div>
        )}
        <div className="login-container">
          <div className="login-card">
            <h1 className="login-title">Register</h1>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue }) => (
                <Form className="login-form">
                  <div className="form-group">
                    <label htmlFor="firstName">Full Name</label>
                    <Field type="text" name="firstName" id="firstName" />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <Field type="text" name="phoneNumber" id="phoneNumber" />
                    <ErrorMessage
                      name="phoneNumber"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field type="text" name="email" id="email" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="hasShop">Do you have a shop?</label>
                    <Field
                      as="select"
                      name="hasShop"
                      id="hasShop"
                      onChange={(e) =>
                        setFieldValue("hasShop", e.target.value === "true")
                      }
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </Field>
                    <ErrorMessage
                      name="hasShop"
                      component="div"
                      className="error"
                    />
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
                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={loading}
                  >
                    Create Account
                  </button>
                </Form>
              )}
            </Formik>
            <div className="login-links">
              <p onClick={() => navigate("/login")} className="link-text">
                Already have an account? Login
              </p>
              {/* <p
                onClick={() => navigate("/reset-password")}
                className="link-text"
              >
                Forgot Password?
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterScreen;
