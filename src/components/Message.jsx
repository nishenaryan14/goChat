import { useContext, useEffect, useRef } from "react";
import { formatDistanceToNow } from "date-fns";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
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
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
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
