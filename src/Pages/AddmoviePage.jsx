import React, { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Addform from "../components/Addform/Addform";
import { useNavigate } from "react-router-dom";

export default function AddmoviePage() {
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
      <Addform />
    </div>
  );
}
