import { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { ChatContext } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    let unSub;

    const fetchMessages = async () => {
      try {
        // console.log("Subscribing to chat ID:", data.chatId);
        const docRef = doc(db, "chats", data.chatId);
        unSub = onSnapshot(docRef, (doc) => {
          if (doc.exists()) {
            setMessages(doc.data().messages);
            console.log(messages);
          } else {
            console.error("No such document!");
          }
        });
      } catch (error) {
        console.error("Error subscribing to document:", error);
      }
    };

    if (data.chatId) {
      fetchMessages();
    } else {
      console.error("Chat ID is undefined");
    }

    return () => {
      if (unSub) {
        unSub();
      }
    };
  }, [data.chatId]);

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
