import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { auth, fireDB } from "../firebase/firebaseConfig.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import myContext from "../context/myContext";
import Loader from "./loader/Loader";

export default function Login({ toggleAuth }) {
  const { loading, setLoading, login } = useContext(myContext);
  const navigate = useNavigate();

  // User Login State 
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: ""
  });

  // State to toggle between User and Teacherf login
  const [isTeacherLogin, setIsTeacherLogin] = useState(false);

  // User Login Function 
  const userLoginFunction = async () => {
    if (userLogin.email === "" || userLogin.password === "") {
      toast.error("All fields are required");
      return;
    }
  
    setLoading(true);
    try {
      const users = await signInWithEmailAndPassword(
        auth,
        userLogin.email,
        userLogin.password
      );
  
      const collectionName = isTeacherLogin ? "teachers" : "users";
      const q = query(
        collection(fireDB, collectionName),
        where("uid", "==", users?.user?.uid)
      );
  
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let user;
        querySnapshot.forEach((doc) => (user = doc.data()));
  
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          setUserLogin({ email: "", password: "" });
          toast.success("Login Successfully");
          login();
          setLoading(false);
  
          if (user.role === "user" || isTeacherLogin) {
            navigate("/dashboard");
          } else {
            navigate("/admin");
          }
  
          
        } else {
          toast.error("No user data found");
          setLoading(false);
        }
      });
  
      return () => unsubscribe();
    } catch (error) {
      console.error("Login Error:", error);
      setLoading(false);
      toast.error("Login Failed: " + error.message);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-full p-10">
      <h1 className="text-2xl font-bold">{isTeacherLogin ? "Librarian Login" : "User Login"}</h1>

      <input
        value={userLogin.email}
        onChange={(e) => setUserLogin({ ...userLogin, email: e.target.value })}
        type="email"
        placeholder="Email"
        className="w-full p-2 mt-2 bg-gray-200 rounded"
      />

      <input
        value={userLogin.password}
        onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })}
        type="password"
        placeholder="Password"
        className="w-full p-2 mt-2 bg-gray-200 rounded"
      />

      <button
        onClick={userLoginFunction}
        className="mt-4 px-5 py-2 bg-purple-600 text-white rounded"
        disabled={loading}
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>

      <div className="mt-2">
        <input
          type="checkbox"
          checked={isTeacherLogin}
          onChange={() => setIsTeacherLogin(!isTeacherLogin)}
          className="mr-2"
        />
        <label>Login as Librarian</label>
      </div>
    </div>
  );
}