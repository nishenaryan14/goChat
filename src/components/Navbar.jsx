import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Avatar } from "@mui/material";
import { StringAvatar } from "./Avatar";
import { ChatContext } from "../context/ChatContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <span className="logo">Go Chat</span>
      <div className="user">
        {currentUser.photoURL ? (
          <img src={currentUser.photoURL} alt="" />
        ) : (
          <Avatar {...StringAvatar(currentUser.displayName)} />
        )}
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>logout</button>
      </div>
    </div>
  );
};
export default Navbar;
