import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";

function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role || "Guest";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");

        // Navigate based on role
        if (data.role === "Manager") navigate("/manager",{ state:{username} });
        else if (data.role === "Pantry Staff") navigate("/pantry",{ state:{username} });
        else if (data.role === "Delivery Personnel") navigate("/delivery",{ state:{username} });
        else alert("Role not recognized!");
      } else {
        alert(data.message || "Login failed!");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-6">
          <h1 className="text-2xl font-bold text-center text-blue-600">
            Login as {role}
          </h1>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                name="username"
                placeholder="Enter your username"
                className="w-full mt-1 rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                name="password"
                placeholder="Enter your password"
                className="w-full mt-1 rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login
            </button>
          </form>
          <p className="text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => navigate("/Signup")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
