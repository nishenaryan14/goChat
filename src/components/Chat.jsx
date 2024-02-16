import { useContext } from "react";
import { VideoCameraBack } from "@mui/icons-material";
import { PersonAdd } from "@mui/icons-material";
import { MoreHoriz } from "@mui/icons-material";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName || ""}</span>
        <div className="chatIcons">
          <VideoCameraBack className="chatIconsItems" />
          <PersonAdd className="chatIconsItems" />
          <MoreHoriz className="chatIconsItems" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
