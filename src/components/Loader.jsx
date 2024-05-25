import React, { useContext } from "react";
import "./Loader.css";
import { AuthContext } from "../context/AuthContext";

const Loader = ({ active, percentage }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className={`loader ${active ? "active" : ""}`}>
      <div className="loader-content">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/chatapp-6b154.appspot.com/o/chat-icon-removebg-preview.png?alt=media&token=d2784dca-65b2-4141-bcb0-8dbdabc157fc"
          alt=""
          className="chatLogo"
        />
        <p className="loaderLogoText">GoChat</p>
        <img className="loaderProfile" src={currentUser?.photoURL} alt="" />
        <div className="loader-text">
          {/* {active ? `Loading ${percentage}%` : "Loading Complete"} */}
          Welcome {currentUser?.displayName}!
        </div>
      </div>
    </div>
  );
};

export default Loader;
