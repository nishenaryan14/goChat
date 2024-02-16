import { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { ChatContext } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  // const getChatColor = (chatId) => {
  //   const colors = ["#FF5733", "#33FFA8", "#336BFF", "#D133FF", "#FF33A2"];
  //   const index = chatId.charCodeAt(0) % colors.length;
  //   return colors[index];
  // };
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  // const chatColor = getChatColor(data.chatId);
  console.log(messages);
  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};
export default Messages;
