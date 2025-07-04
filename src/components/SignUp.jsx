import React, { useState } from "react";
import toast from "react-hot-toast";
import { auth, fireDB } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Loader from "./loader/Loader";

export default function Signup({ toggleAuth }) {
  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // Add role if needed
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userSignupFunction = async () => {
    // Basic Validation
    if (userSignup.name === "" || userSignup.email === "" || userSignup.password === "") {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      // Firebase Authentication
      const users = await createUserWithEmailAndPassword(
        auth, 
        userSignup.email, 
        userSignup.password
      );

      // Create user object for Firestore
      const user = {
        name: userSignup.name,
        email: users.user.email,
        uid: users.user.uid,
        role: userSignup.role,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      // Reference to "users" collection
      const userReference = collection(fireDB, "users"); // Ensure it's "users", not "user"

      // Add user to Firestore
      await addDoc(userReference, user);

      // Reset form
      setUserSignup({
        name: "",
        email: "",
        password: "",
        role: "user",
      });

      toast.success("Signup successful!");
      setLoading(false);
      navigate('/login');
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.message || "Failed to sign up");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-10">
      <h1 className="text-2xl font-bold">Create Account</h1>
      
      <div className="flex gap-2 mt-4">
        <a href="#" className="p-2 border rounded-full"><i className="fab fa-google"></i></a>
        <a href="#" className="p-2 border rounded-full"><i className="fab fa-facebook-f"></i></a>
        <a href="#" className="p-2 border rounded-full"><i className="fab fa-github"></i></a>
        <a href="#" className="p-2 border rounded-full"><i className="fab fa-linkedin-in"></i></a>
      </div>

      <span className="text-sm mt-3">or use your email for registration</span>

      <input
        value={userSignup.name}
        onChange={(e) => setUserSignup({ ...userSignup, name: e.target.value })}
        type="text"
        placeholder="Name"
        className="w-full p-2 mt-2 bg-gray-200 rounded"
      />

      <input
        value={userSignup.email}
        onChange={(e) => setUserSignup({ ...userSignup, email: e.target.value })}
        type="email"
        placeholder="Email"
        className="w-full p-2 mt-2 bg-gray-200 rounded"
      />

      <input
        value={userSignup.password}
        onChange={(e) => setUserSignup({ ...userSignup, password: e.target.value })}
        type="password"
        placeholder="Password"
        className="w-full p-2 mt-2 bg-gray-200 rounded"
      />

      <button
        onClick={userSignupFunction}
        className="w-full bg-purple-600 text-white py-2 rounded mt-2"
        disabled={loading}
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>

      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <button className="text-purple-600" onClick={toggleAuth}>
          Sign In
        </button>
      </p>
    </div>
  );
}
