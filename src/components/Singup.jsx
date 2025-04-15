import React, { useState } from "react";
import apiClient from "../../service/apiClient";
import { useNavigate } from "react-router";

const Singup = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loding, setLoding] = useState(false);
  const [error, setError] = useState("");

    //for navigation
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoding(true);
    setError("");

    try {
      console.log(`Trying to do a singup`);
      const data = await apiClient.signup(username, email, password);
      console.log("Signup response: ", data);
      if (data.success) {
        navigate("/login");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (error) {
    } finally {
        setLoding(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition duration-200"
            disabled={loding}
          >
            {loding ? "Signup..." : "Signup"}
            {/* Register */}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Singup;
