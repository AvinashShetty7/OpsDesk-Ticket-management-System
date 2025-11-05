import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Tickets() {
  const navigate=useNavigate()
  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState("all");
  const [technicians, setTechnicians] = useState([]);
  const [assignData, setAssignData] = useState({ ticketId: "", techId: "" });

  useEffect(() => {
    fetchTickets();
    fetchTechnicians();
  }, [filter]);

  const fetchTickets = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/ticket/getallticket`,{withCredentials:true}
      );
      setTickets(res.data);
    } catch (err) {
      if (err.status === 401) {
        navigate("/");
      }
      console.error("Error fetching tickets:", err);
    }
  };

  const fetchTechnicians = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/fetchtechnicians`,{withCredentials:true}
      );
      setTechnicians(res.data);
    } catch (err) {
      console.error("Error fetching technicians:", err);
    }
  };

  const handleAssign = async (ticketId) => {
    if (!assignData.techId) return alert("Please select a technician!");
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/ticket/updateticket/${ticketId}`,{
        assignedTo: assignData.techId, 
      },{withCredentials:true} );
      alert("Ticket assigned successfully!");
      fetchTickets();
    } catch (err) {
      console.error("Error assigning ticket:", err);
    }
  };

  const filteredTickets =
    filter === "all"
      ? tickets
      : tickets.filter((t) => t.status.toLowerCase() === filter);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Admin Ticket Management
      </h1>

      {/* Filter buttons */}
      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        {["all", "open", "in-progress", "resolved", "closed"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              filter === status
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Tickets container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold text-gray-800">
                  {ticket.title}
                </h2>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    ticket.status === "open"
                      ? "bg-yellow-200 text-yellow-800"
                      : ticket.status === "in-progress"
                      ? "bg-blue-200 text-blue-800"
                      : "bg-green-200 text-green-800"
                  }`}
                >
                  {ticket.status}
                </span>
              </div>

              <p className="text-gray-700 text-sm mb-3 line-clamp-3">
                {ticket.description}
              </p>

              <div className="text-sm text-gray-600 space-y-1 mb-4">
                <p>
                  <strong>Ticket ID:</strong> {ticket._id}
                </p>
                <p>
                  <strong>Priority:</strong> {ticket.priority || "N/A"}
                </p>
                <p>
                  <strong>createdby:</strong> {ticket.createdBy.email || "N/A"}
                </p>
                <p>
                  <strong>Created On:</strong>{" "}
                  {ticket.createdAt
                    ? new Date(ticket.createdAt).toLocaleString()
                    : "N/A"}
                </p>
                <p>
                  <strong>Technician:</strong>{" "}
                  {ticket.assignedTo ? ticket.assignedTo.email : "Unassigned"}
                </p>
              </div>

              <div className="flex gap-2 items-center">
                <select
                  onChange={(e) =>
                    setAssignData({
                      ticketId: ticket._id,
                      techId:e.target.value,
                    })
                  }
                  className="border rounded-lg px-2 py-1 w-full"
                >
                  <option value="">Select Technician</option>
                  {technicians.map((tech) => (
                    <option key={tech._id} value={tech._id}>
                      {tech.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => handleAssign(ticket._id)}
                  className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Assign
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No tickets found.
          </p>
        )}
      </div>
    </div>
  );
}
