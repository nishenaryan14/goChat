import { useContext, useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { StringAvatar } from "./Avatar";

const Chats = ({ setShowChat }) => {
  const [chats, setChats] = useState({});
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
    setShowChat(true);
  };

  return (
    <div className="chats">
      {chats &&
        Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <div
              className="userChat"
              key={chat[0]}
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              {chat[1].userInfo.photoURL ? (
                <img src={chat[1].userInfo.photoURL} alt="" />
              ) : (
                <Avatar {...StringAvatar(chat[1].userInfo.displayName)} />
              )}
              <div className="userChatInfo">
                <span>{chat[1].userInfo.displayName}</span>
                <p>{chat[1].lastMessage?.text}</p>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Chats;
