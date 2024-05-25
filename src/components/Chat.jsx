import { useContext, useEffect, useState } from "react";
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

const Chat = ({ showChat, setShowChat }) => {
  const { data } = useContext(ChatContext);
  const [image, setImage] = useState("");
  const [isImg, setIsImg] = useState(false);
  const [imgURL, setImgUrl] = useState("");
  const isSmallScreen = useMediaQuery("(max-width:776px)");

  // useEffect(() => {
  //   console.log("Chat ID:", data?.chatId);
  //   console.log(data?.chatId == "null");
  //   console.log("User Data:", data?.user);
  // }, [data?.chatId, data?.user]);

  return (
    <div className="chat">
      {data.chatId != "null" ? (
        <>
          <div className="chatInfo">
            <div className="chatName">
              {isSmallScreen && (
                <ArrowBack
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowChat(false)}
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

export default Chat;
