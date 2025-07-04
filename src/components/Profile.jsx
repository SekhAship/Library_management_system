import { useContext, useEffect, useState } from "react";
import myContext from "../context/myContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { logout } = useContext(myContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    } else {
      navigate("/auth"); // Redirect to login if not authenticated
    }
  }, [navigate]);



  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="flex flex-col items-center justify-center p-10">
      <h1 className="text-2xl font-bold">Profile</h1>

      <div className="mt-4 p-5 bg-white rounded shadow-md w-100">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>UID:</strong> {user.uid}</p>
      </div>


    </div>
  );
};

export default Profile;