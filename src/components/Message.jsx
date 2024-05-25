import { useContext, useEffect, useRef } from "react";
import { formatDistanceToNow } from "date-fns";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { StringAvatar } from "./Avatar";
import { Avatar } from "@mui/material";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    console.log(data);
  }, [message]);

  const formatTimestamp = (timestamp) => {
    // Convert Firestore Timestamp to JavaScript Date object
    const date = timestamp.toDate();
    // Format the date as a relative time string using date-fns
    return formatDistanceToNow(date, { addSuffix: true }); // e.g., "5 minutes ago"
  };

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div
        className={`messageInfo ${
          message.senderId === currentUser.uid && "ownerInfo"
        }`}
      >
        {message.senderId === currentUser.uid ? (
          <img src={currentUser.photoURL} alt="" />
        ) : data.user.photoURL ? (
          <img src={data.user.photoURL} alt="" />
        ) : (
          <Avatar {...StringAvatar(data.user.displayName)} />
        )}
        <span>{formatTimestamp(message.date)}</span>
      </div>
      <div className="messageContent">
        {message.text && <p>{message.text}</p>}
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
