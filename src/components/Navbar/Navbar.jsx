import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";

import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Logoutloader from "../Loaders/Logoutloader";

export default function Navbar() {
  const [userName, setUserName] = useState(null);
  const [loader, setLoader] = useState(false);
  const { wishlist } = useSelector((state) => state.wishlist);
  const navigate = useNavigate();
  useEffect(() => {
    let name = localStorage.getItem("userName");
    setUserName(name);
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      setLoader(true);
      localStorage.clear();
      setTimeout(() => {
        setLoader(false);
        navigate("/login");
      }, 3000);
    }
  };
  return (
    <div className="navbar">
      {loader && <Logoutloader />}
      <div className="navbar-logo">
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <div>
            <span>MY WISHLIST</span>
          </div>
        </Link>
      </div>
      <div className="navbar-left">
        <div className="user-info">
          <span>Welcome {userName && userName}</span>
        </div>
      </div>
      <div className="navbar-right">
        <span className="wishlist-info">
          Total Wishlist: {wishlist?.data?.length}
        </span>
        <Link to="/addmovie" className="create-wishlist">
          <span>Create Movie Wishlist</span>
          <span>
            <IoMdAdd size={20} />
          </span>
        </Link>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
}
