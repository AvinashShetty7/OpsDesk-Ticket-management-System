import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function TechTickets() {
  const navigate=useNavigate()
  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchTickets();
  }, [filter]);

  const fetchTickets = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}http://localhost:3000/api/ticket/gettechticket`,
        { withCredentials: true }
      );
      setTickets(res.data);
      console.log(res.data);
    } catch (err) {
      if (err.status === 401) {
        navigate("/");
      }
      console.error("Error fetching tickets:", err);
    }
  };

  const handleStatusChange = async (ticketId, newStatus) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/ticket/updateticket/${ticketId}`,
        { status: newStatus },
        { withCredentials: true }
      );

      // Update UI instantly without refetching
      setTickets((prevTickets) =>
        prevTickets.map((t) =>
          t._id === ticketId ? { ...t, status: newStatus } : t
        )
      );
    } catch (err) {
      console.error("Error updating ticket status:", err);
      alert("Failed to update status");
    }
  };

  const filteredTickets =
    filter === "all"
      ? tickets
      : tickets.filter((t) => t.status.toLowerCase() === filter);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Tickets</h1>
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
                  {ticket.assignedTo ? ticket.assignedTo.name : "Unassigned"}
                </p>
              </div>

              <div className="flex justify-between items-center mt-3">
                <label className="text-sm font-medium text-gray-700">
                  Update Status:
                </label>
                <select
                  value={ticket.status}
                  onChange={(e) =>
                    handleStatusChange(ticket._id, e.target.value)
                  }
                  className="ml-2 border border-gray-300 rounded-md px-2 py-1 text-sm"
                >
                  {["open", "in-progress", "resolved"].map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
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
