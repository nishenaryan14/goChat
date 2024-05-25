import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import LinearProgress from "@mui/material/LinearProgress";

const ProtectedRoute = ({ children }) => {
  const { currentUser, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <div style={{ position: "fixed", top: 0, left: 0, right: 0 }}>
        <LinearProgress />
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
