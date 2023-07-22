"use client"

import React, { useState } from "react";
import { useRouter } from 'next/router';
import { UserCredential, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Provider, useDispatch  } from 'react-redux';
import { auth } from "../firebase/firebaseApi"; 
import store from "@/redux/store";
import { login } from "@/redux/authSlice";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      
      const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        const userData = {
          id: user.uid,
          name: user.displayName || "", 
          email: user.email || "",
        };
  
      
        dispatch(login(userData));
        router.push('/dashboard');
      }
    } catch (error) {
      setError("Invalid email or password"); 
    }
  };
  
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential: UserCredential = await signInWithPopup(auth, provider);
  
      const user = userCredential.user;
      if (user) {
        const userData = {
          id: user.uid,
          name: user.displayName || "", 
          email: user.email || "",
        };
        dispatch(login(userData));
        router.push('/dashboard');
      }
    } catch (error) {
      setError("Failed to sign in with Google");
    }
  };

  return (
    <Provider store={store}>
      <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-80 p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">Login</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="py-2 px-3 border rounded-lg focus:ring focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="py-2 px-3 border rounded-lg focus:ring focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <div className="mt-4">
          <span className="text-sm">Or login with:</span>
          <button
            className="w-full mt-2 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700"
            onClick={handleGoogleLogin}
          >
            Google
          </button>
        </div>
      </div>
    </div>
    </Provider>
  );
};

export default LoginForm;
