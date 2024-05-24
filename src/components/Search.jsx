import { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDoc,
  setDoc,
  serverTimestamp,
  doc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async (searchValue) => {
    setUsername(searchValue);
    const q = query(
      collection(db, "users"),
      where("displayName", "==", searchValue)
    );
    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        // If there's a user matching the search value, set the user state
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
          setErr(false); // Reset error state if a user is found
        });
      } else {
        setUser(null);
        setErr(true); // Set error state if no user is found
      }
    } catch (error) {
      console.error("Error searching for user:", error);
      setErr(true); // Set error state if an error occurs
    }
  };
  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists ,if it does'nt then create new one
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      setErr(true);
    }

    setUser(null);
    setUsername("");
  };
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onChange={(e) => handleSearch(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User Not Found</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
