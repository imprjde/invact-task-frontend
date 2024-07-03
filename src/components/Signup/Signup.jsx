import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/userSlice";
import { useNavigate, Link } from "react-router-dom";
import LoginLoader from "../Loaders/LoginLoader";
import { toast, Toaster } from "sonner";

export default function Signup() {
  const [formField, setformField] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status, error } = useSelector((state) => state.user);

  const handleSignup = (e) => {
    e.preventDefault();
    if (formField.name.length < 4) {
      setErrorMessage("Name should have atleast 4 characters");
    } else if (!/\S+@\S+\.\S+/.test(formField.email)) {
      setErrorMessage("Invalid Email type");
    } else if (formField.password.length < 6) {
      setErrorMessage("Password should contain atleast 6 characters");
    } else {
      setErrorMessage("");
      dispatch(registerUser(formField));
    }
  };
  useEffect(() => {
    if (status === "succeeded") {
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userToken", user.token);

      navigate("/");
      console.log("User Registration Successful:", user);
      console.log("User Registration Successful:", user);
    } else if (status === "failed" && error) {
      toast.error("Signup Failed! Try again Later");
      console.error("User Registration Failed:", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, user, error]);
  return (
    <div className="login-container">
      <Toaster position="top-center" />
      <div className="login-box">
        <div id="top">
          <span className="login-title">Signup Here</span>
        </div>
        <form onSubmit={handleSignup} id="fields">
          <span className="login-field">
            <label htmlFor="name">Name</label>
            <input
              value={formField.name}
              onChange={(e) =>
                setformField({ ...formField, name: e.target.value })
              }
              id="name"
              name="name"
              type="name"
              required
              placeholder="Name"
            />
          </span>
          <span className="login-field">
            <label htmlFor="email">Email</label>
            <input
              value={formField.email}
              onChange={(e) =>
                setformField({ ...formField, email: e.target.value })
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
              value={formField.password}
              onChange={(e) =>
                setformField({ ...formField, password: e.target.value })
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
              {status === "loading" ? <LoginLoader /> : "Signup"}
            </button>
          </span>
          <span className="signup-link">
            <span className="ques"> Already have an account? </span>
            <Link to="/login" className="snnn">
              Login{" "}
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}
