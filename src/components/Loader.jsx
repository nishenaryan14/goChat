// Loader.js
import React, { useContext } from "react";
import "./Loader.css";
import { AuthContext } from "../context/AuthContext";

const Loader = ({ active, percentage, handleClick }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className={`loader ${active ? "active" : ""}`}>
      <div className="loader-content">
        <img className="loaderProfile" src={currentUser.photoURL} alt="" />

        <div className="loader-text">
          {active ? `Loading ${percentage}%` : "Loading Complete"}
        </div>
        {/* <button onClick={handleClick}>Toggle Loader</button> */}
      </div>
    </div>
  );
};

export default Loader;
