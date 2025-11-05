import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function CreateTicket() {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Low",
    
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send to backend API
    try{
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/ticket/createticket`,
      formData, { withCredentials: true },
    );

    const data = await res.data
    if (res.ok) {
      alert("Ticket created successfully!");
      setFormData({ title: "", description: "", priority: "Low" });
    } else {
      alert(data.message || "Failed to create ticket");
    }
  }catch(error){
    if (error.status === 401) {
        navigate("/");
      }
  }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">Create New Ticket</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border rounded-lg p-2"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your issue..."
          className="w-full border rounded-lg p-2"
          required
        />
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Submit Ticket
        </button>
      </form>
    </div>
  );
}
