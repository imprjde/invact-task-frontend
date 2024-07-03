import React, { useEffect } from "react";
import Home from "../components/Home/Home";
import Navbar from "../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div>
      <Navbar />
      <Home />
    </div>
  );
}
