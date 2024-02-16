import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { AuthContext } from "../context/AuthContext";
const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  useEffect(() => {
    let percentage = 0;
    const interval = setInterval(() => {
      percentage += 1;
      setLoadingPercentage(percentage);

      if (percentage >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    }, 30);
  }, []);

  const handleClick = () => {
    setIsLoading(!isLoading);
  };
  return (
    <div className="home">
      <Loader
        active={isLoading}
        percentage={loadingPercentage}
        handleClick={handleClick}
      />
      {!isLoading && (
        <div className="container">
          <Sidebar />
          <Chat />
        </div>
      )}
    </div>
  );
};
export default Home;
