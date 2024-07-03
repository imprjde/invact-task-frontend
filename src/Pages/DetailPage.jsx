import React, { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Details from "../components/Details/Details";
import { useNavigate } from "react-router-dom";

export default function DetailPage() {
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
      <Details />
    </div>
  );
}
