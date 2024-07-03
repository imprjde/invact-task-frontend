import React, { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Editform from "../components/Editform/Editform";
import { useNavigate } from "react-router-dom";

export default function EditmoviePage() {
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
      <Editform />
    </div>
  );
}
