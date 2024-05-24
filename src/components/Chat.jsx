import { useContext, useState } from "react";
import { VideoCameraBack, PersonAdd, MoreHoriz } from "@mui/icons-material";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import Dialog from "./Dialog";

const Chat = () => {
  const { data } = useContext(ChatContext);
  const [image, setImage] = useState("");
  const [isImg, setIsImg] = useState(false);
  const [imgURL, setImgUrl] = useState("");

  return (
    <div className="chat">
      {data.chatId ? (
        <>
          <div className="chatInfo">
            <span>{data.user?.displayName || ""}</span>
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
