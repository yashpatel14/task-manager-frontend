import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../service/apiClient";

const Home = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await apiClient.getProfile();
        console.log("data",data.data);
        if (!data.data || !data.data.username) {
          navigate("/login");
        } else {
          setProfile(data.data);
        }
      } catch (err) {
        setError("Failed to load profile.");
        console.error(err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const onLogout = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log(`Trying to do a logout`);
      const data = await apiClient.logout();

      if (data.success) {
        navigate("/login");
      } else {
        setError(data.message || "Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold text-gray-800">Welcome 👋</h1>
          <button
            onClick={onLogout}
            className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
          >
            Logout
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading profile...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : profile ? (
          <div className="space-y-3">
            <div>
              <span className="font-semibold">Username:</span>{" "}
              <span>{profile.username}</span>
            </div>
            <div>
              <span className="font-semibold">Email:</span>{" "}
              <span>{profile.email}</span>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No profile data found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
