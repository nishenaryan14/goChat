import Navbar from "../components/Navbar";
import Search from "../components/Search";
import Chats from "../components/Chats";

const Sidebar = ({ setShowChat }) => {
  return (
    <div className="sidebar">
      <Navbar />
      <Search />
      <Chats setShowChat={setShowChat} />
    </div>
  );
};

export default Sidebar;
