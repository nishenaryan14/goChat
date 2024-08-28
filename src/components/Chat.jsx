import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import {
  VideoCameraBack,
  PersonAdd,
  MoreHoriz,
  ArrowBack,
} from "@mui/icons-material";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { Avatar } from "@mui/material";
import Dialog from "./Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";
import logo from "../img/gochatlogo.png";

const Chat = ({ showChat, setShowChat }) => {
  const { data } = useContext(ChatContext);
  const [image, setImage] = useState("");
  const [isImg, setIsImg] = useState(false);
  const [imgURL, setImgUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState(""); // State for logo URL
  const isSmallScreen = useMediaQuery("(max-width:776px)");

  useEffect(() => {
    // Fetch logo image URL from Firebase Storage
    const fetchLogoUrl = async () => {
      try {
        const imageUrl = await getDownloadURL(
          ref(storage, "chat-icon-removebg-preview.png")
        );
        setLogoUrl(imageUrl);
      } catch (error) {
        console.error("Error fetching logo URL:", error);
      }
    };

    fetchLogoUrl();
  }, []);

  if (!showChat) {
    return null;
  }

  return (
    <div className="chat">
      {data.chatId !== "null" ? (
        <>
          <div className="chatInfo">
            <div className="chatName">
              {isSmallScreen && (
                <ArrowBack
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowChat(false)} // Hide the chat when clicked
                />
              )}
              {isSmallScreen && (
                <Avatar
                  alt={data.user?.displayName}
                  src={data.user?.photoURL}
                />
              )}
              <span>{data.user?.displayName || ""}</span>
            </div>
            <div className="chatIcons">
              <VideoCameraBack className="chatIconsItems" />
              <PersonAdd className="chatIconsItems" />
              <MoreHoriz className="chatIconsItems" />
            </div>
          </div>
          <Messages />
          <Input
            image={image}
            setImage={setImage}
            isImg={isImg}
            setIsImg={setIsImg}
            setImgUrl={setImgUrl}
          />
        </>
      ) : (
        <div className="chatNotSelected">
          {/* Use logoUrl for the logo image source */}
          <img
            src={logoUrl || logo}
            alt="GoChat Logo"
            style={{ height: "150px", width: "180px" }}
          />
          <p>Please select a conversation</p>
        </div>
      )}
      {isImg && (
        <Dialog
          isImg={isImg}
          image={image}
          imgURL={imgURL}
          setIsImg={setIsImg}
          setImage={setImage}
        />
      )}
    </div>
  );
};

Chat.propTypes = {
  showChat: PropTypes.bool.isRequired,
  setShowChat: PropTypes.func.isRequired,
};

export default Chat;
