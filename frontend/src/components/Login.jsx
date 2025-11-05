import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // for redirecting

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkValidUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/userpublic/validlogin`,
          { withCredentials: true }
        );
        if (res.data.user.role == "unauthorized") {
          console.log("invlaid user");
        } else {
          const validuser = res.data.user.role;

          if (validuser === "admin") navigate("/admin");
          else if (validuser === "technician") navigate("/technician");
          else if (validuser === "employee") navigate("/employee");
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    checkValidUser();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/userpublic/login`,
        formData,
        { withCredentials: true }
      );

      // If backend returns a token + user data
      if (res.status === 200) {
        // const { token, user } = res.data;
        const { user } = res.data;
        setMessage("✅ Login successful!");

        if (user.role === "admin") {
          navigate("/admin");
        } else if (user.role === "technician") {
          navigate("/technician");
        } else {                                                                                                        
          navigate("/employee");
        }
      }
    } catch (error) {
      if (error.response) {
        setMessage(
          `❌ ${error.response.data.message || "Invalid credentials"}`
        );
      } else {
        setMessage("❌ Server not responding");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-600 text-lg font-semibold animate-pulse"></p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          🔐 Login
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
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
}
