import { AttachFile, AddPhotoAlternate } from "@mui/icons-material";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import Compressor from "image-compressor.js";
import EmojiPicker from "emoji-picker-react";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = ({ setImage, setIsImg, setImgUrl }) => {
  const [text, setText] = useState("");

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const compressedFile = await new Compressor(file, {
      quality: 0.6,
      maxWidth: 800,
      maxHeight: 600,
      mimeType: "image/jpeg",
      success(result) {
        console.log("img compression success");
        setIsImg(true);
        setImgUrl(URL.createObjectURL(result));
        setImage(result); // Set the selected image in the state
      },
      error(err) {
        console.error("Image compression error:", err);
      },
    });
  };

  const handleSend = async () => {
    text &&
      (await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      }));

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text: text || "Image",
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text: text || "Image",
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImage(null);
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <AttachFile style={{ cursor: "pointer" }} />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => handleFileChange(e)}
        />
        <label htmlFor="file">
          <AddPhotoAlternate style={{ cursor: "pointer" }} />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
