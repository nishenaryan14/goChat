import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

const Home = () => {
  const isSmallScreen = useMediaQuery("(max-width:776px)");
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="home">
      <div className="container">
        {!isSmallScreen || !showChat ? (
          <Sidebar setShowChat={setShowChat} />
        ) : null}
        {(!isSmallScreen || showChat) && (
          <Chat showChat={showChat} setShowChat={setShowChat} />
        )}
      </div>
    </div>
  );
};

export default Home;
