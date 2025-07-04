import { useContext } from "react";
import { Navigate } from "react-router-dom";
import myContext from "../context/myContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(myContext);

  return isAuthenticated ? children : <Navigate to="/auth" replace />;
};

export default PrivateRoute;
