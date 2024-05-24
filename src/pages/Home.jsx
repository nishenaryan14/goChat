import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [resize, setResize] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      console.log("Resized!");
      setResize(window.innerWidth <= 600);
    };
    console.log("Resize state:", resize);

    // Add event listener for resize when viewport width is 600px or less
    if (window.innerWidth <= 600) {
      window.addEventListener("resize", handleResize);
    }

    // Cleanup: Remove event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick = () => {
    setIsLoading(!isLoading);
  };

  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        {<Chat />}
      </div>
    </div>
  );
};

export default Home;
