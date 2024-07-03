import React, { useEffect } from "react";
import Signup from "../components/Signup/Signup";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <div>
      <Signup />
    </div>
  );
}
