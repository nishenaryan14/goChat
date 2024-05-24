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

const Dialog = ({ image, imgURL, setImage, setIsImg }) => {
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
          setIsImg(false);
          setImage(null);
        });
      }
    );
  };

  return (
    <div className="dialog">
      <div className="dialogImg">
        <img src={imgURL} alt="" />
      </div>
      <div className="dialogBottom">
        <button onClick={() => handleSendImage(image)}>Send</button>
      </div>
    </div>
  );
};

export default Dialog;
