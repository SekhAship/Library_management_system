import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import myContext from "../context/myContext";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(myContext); // Use the logout function from context

  useEffect(() => {
    // Clear session or token data
    localStorage.clear(); // Clear localStorage/sessionStorage if needed
    logout(); // Call logout function from context
    console.log("User logged out.");

    // Redirect to auth page
    navigate("/auth");
  }, [navigate, logout]);

  return null;
};

export default Logout;
