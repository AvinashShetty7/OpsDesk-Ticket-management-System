import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee", // default role
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/register`,
        formData,
        { withCredentials: true }
      );

      setMessage("✅ User created successfully!");
      setFormData({ name: "", email: "", password: "", role: "employee" });
    } catch (error) {
      if (error.status === 401) {
        navigate("/");
      }
      if (error.response) {
        // Server responded with a non-2xx status
        setMessage(`❌ ${error.response.data.message || "Server error"}`);
      } else if (error.request) {
        // Request made but no response
        setMessage("❌ No response from server");
      } else {
        // Something else went wrong
        setMessage("❌ Something went wrong");
      }
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="min-h-screen flex  justify-center ml-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          👑 Add New User
        </h2>

        {message && (
          <p
            className={`text-center font-medium ${
              message.startsWith("✅") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Set Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          required
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="employee">Employee</option>
          <option value="technician">Technician</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Create User
        </button>
      </form>
    </div>
  );
}
