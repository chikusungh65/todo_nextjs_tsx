"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";


const LoginForm = () => {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-80 p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">Login</h2>
        <form className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="py-2 px-3 border rounded-lg focus:ring focus:outline-none"
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
              required
            />
          </div>
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
          >
            Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
