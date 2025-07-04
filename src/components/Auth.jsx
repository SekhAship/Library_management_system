import { useState } from "react";
import Login from "./Login";
import Signup from "./SignUp";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-200 to-indigo-200">
      <div className="relative w-[768px] min-h-[480px] bg-white shadow-lg rounded-3xl overflow-hidden">
        <div className={`absolute top-0 h-full w-1/2 transition-transform duration-500 ease-in-out ${isSignUp ? "translate-x-full opacity-100 z-10" : "opacity-100 z-10"}`}>
          {isSignUp ? <Signup toggleAuth={() => setIsSignUp(false)} /> : <Login toggleAuth={() => setIsSignUp(true)} />}
        </div>

        <div className="absolute top-0 right-0 h-full w-1/2 bg-purple-700 text-white flex flex-col items-center justify-center p-10 transition-transform duration-500 ease-in-out" style={{ transform: isSignUp ? "translateX(-100%)" : "translateX(0)" }}>
          <h1 className="text-2xl font-bold">{isSignUp ? "Welcome Back!" : "Hello, Friend!"}</h1>
          <p className="text-center text-sm mt-2">{isSignUp ? "Enter your personal details to use all of site features" : "Register with your personal details to use all of site features"}</p>
          <button className="mt-4 px-5 py-2 border border-white rounded" onClick={() => setIsSignUp(!isSignUp)}>{isSignUp ? "Sign In" : "Sign Up"}</button>
        </div>
      </div>
    </div>
  );
}
