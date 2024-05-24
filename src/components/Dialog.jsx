import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { useContext, useEffect } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import CloseIcon from "@mui/icons-material/Close";

const Dialog = ({ image, imgURL, setImage, setIsImg, isImg }) => {
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext); // Get currentUser from AuthContext

  useEffect(() => {
    console.log(image);
  }, []);

  const handleSendImage = async (img) => {
    const storageRef = ref(storage, uuid());

    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on(
      (error) => {
        console.log(error);
      },
      () => {
        setIsImg(false);
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text: "", // No text for image message
              senderId: currentUser.uid, // Use the currentUser's uid as senderId
              date: Timestamp.now(),
              img: downloadURL,
            }),
          });
          setImage(null);
        });
      }
    );
  };
  const closeDialog = () => {
    setIsImg(false);
    setImage(null);
  };
  return (
    <div className="dialog">
      <div className="dialogImg">
        {isImg && (
          <CloseIcon
            sx={{
              position: "absolute",
              top: "5px",
              right: "5px",
              color: "black",
              cursor: "pointer",
            }}
            onClick={closeDialog} // Corrected onClick handler
          />
        )}
        <img src={imgURL} alt="" />
      </div>
      <div className="dialogBottom">
        <button onClick={() => handleSendImage(image)}>Send</button>
      </div>
    </div>
  );
};

export default Dialog;
