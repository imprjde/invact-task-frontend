import React, { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/authSlice";
import LoginLoader from "../Loaders/LoginLoader";
import { toast, Toaster } from "sonner";

export default function Login() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const { status, error, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(loginUser(formData));
  };
  useEffect(() => {
    if (status === "failed" && error) {
      toast.error("Login Failed! Try Again Later");
      setErrorMessage(error.message);
    }
    if (status === "succeeded") {
      toast.error("Login Successful");
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userToken", user.token);
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, error]);

  return (
    <div className="login-container">
      <Toaster position="top-center" />
      <div className="login-box">
        <div id="top">
          <span className="login-title">Login Here</span>
        </div>
        <form onSubmit={handleLogin} id="fields">
          <span className="login-field">
            <label htmlFor="email">Email</label>
            <input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email"
            />
          </span>
          <span className="login-field">
            <label htmlFor="password">Password</label>
            <input
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              id="password"
              name="password"
              type="password"
              placeholder="Password"
            />
          </span>
          {errorMessage && (
            <span className="error">
              <p className="error-text">{errorMessage}</p>
            </span>
          )}
          <span>
            <button type="submit" className="login-button">
              {status === "loading" ? <LoginLoader /> : "Login"}
            </button>
          </span>
          <span className="signup-link">
            <span className="ques"> Don't have an account? </span>
            <Link to="/signup" className="snnn">
              Sign up
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}
