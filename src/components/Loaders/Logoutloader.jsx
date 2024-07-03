import React from "react";
import "./Logoutloader.css";

export default function Logoutloader() {
  return (
    <div className="loader-overlay">
      <div className="loader">
        <div className="loading-text">Logging Out...</div>
      </div>
    </div>
  );
}
