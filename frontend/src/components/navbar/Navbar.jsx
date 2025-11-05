import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Navbar({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/logout`,
        {},
        { withCredentials: true }
      );
      console.log("Logout success");
      navigate("");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="bg-blue-700 text-white shadow-md px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-semibold">🎫 OpsDesk</h1>

      <div className="flex items-center gap-4">
        <span className="font-medium">{user?.name || "User"}</span>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
