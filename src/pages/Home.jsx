import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import Loader from "../components/Loader"; // Import the Loader component
import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const isSmallScreen = useMediaQuery("(max-width:776px)");
  const [showChat, setShowChat] = useState(false);
  const [loading, setLoading] = useState(true); // State to manage loader visibility
  const [percentage, setPercentage] = useState(0); // State to manage loading percentage
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      // Simulate loading process for demo purposes
      const interval = setInterval(() => {
        setPercentage((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setLoading(false);
            return 100;
          }
          return prev + 1; // Adjust increment value and speed as needed
        });
      }, 20); // Adjust the interval duration as needed

      return () => clearInterval(interval);
    }
  }, [currentUser]);

  if (loading) {
    return <Loader active={loading} percentage={percentage} />; // Pass the percentage dynamically
  }

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
