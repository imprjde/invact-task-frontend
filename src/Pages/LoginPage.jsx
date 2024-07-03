import React, { useEffect } from "react";
import Login from "../components/Login/Login";
import { useNavigate } from "react-router-dom";
export default function LoginPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <div>
      <Login />
    </div>
  );
}
