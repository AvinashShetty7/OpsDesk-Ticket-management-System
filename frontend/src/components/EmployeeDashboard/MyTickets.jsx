import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import EditTicket from "./EditTicket.jsx";
import { useNavigate } from "react-router-dom";

export default function MyTickets() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, [filter]);

  const fetchTickets = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/ticket/getempticket`,
        { withCredentials: true }
      );
      setTickets(res.data);
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

  const handleEdit = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  const handleUpdate = () => {
    axios
      .get("http://localhost:3000/api/ticket/getempticket", {
        withCredentials: true,
      })
      .then((res) => setTickets(res.data))
      .catch((err) => console.error("Error fetching updated tickets:", err));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/ticket/deleteticket/${id}`,
          { withCredentials: true }
        );
        setTickets(tickets.filter((ticket) => ticket._id !== id));
      } catch (err) {
        console.error("Error deleting ticket:", err);
      }
    }
  };

  const filteredTickets =
    filter === "all"
      ? tickets
      : tickets.filter((t) => t.status.toLowerCase() === filter);

  const getStatusStyles = (status) => {
    const styles = {
      open: "bg-gradient-to-r from-yellow-400 to-orange-500 text-yellow-900 ring-2 ring-yellow-300/50",
      "in-progress": "bg-gradient-to-r from-blue-400 to-indigo-500 text-blue-900 ring-2 ring-blue-300/50",
      resolved: "bg-gradient-to-r from-emerald-400 to-teal-500 text-emerald-900 ring-2 ring-emerald-300/50",
      closed: "bg-gradient-to-r from-gray-400 to-gray-600 text-gray-900 ring-2 ring-gray-300/50"
    };
    return styles[status.toLowerCase()] || "bg-gray-400 text-gray-900";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black bg-gradient-to-r from-blue-800 via-purple-800 to-indigo-900 bg-clip-text text-transparent drop-shadow-2xl mb-4">
          My Tickets
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full shadow-lg" />
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap justify-center gap-3 mb-12 max-w-4xl mx-auto">
        {["all", "open", "in-progress", "resolved", "closed"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`group relative px-8 py-4 rounded-3xl font-semibold text-lg transition-all duration-500 backdrop-blur-sm shadow-xl ${
              filter === status
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white scale-105 ring-4 ring-blue-400/50 shadow-blue-500/25 translate-y-1"
                : "bg-white/80 hover:bg-white hover:shadow-2xl hover:scale-105 hover:-translate-y-1 text-gray-700 hover:text-gray-900 border border-gray-200/50 hover:border-blue-300/50"
            }`}
          >
            {status === "all" ? "All Tickets" : status.charAt(0).toUpperCase() + status.slice(1)}
            <div className={`absolute inset-0 rounded-3xl blur opacity-75 transition-all duration-500 ${
              filter === status ? "bg-white/20" : "bg-blue-200/30 group-hover:bg-blue-300/50"
            }`} />
          </button>
        ))}
      </div>

      {/* Tickets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => (
            <div
              key={ticket._id}
              className="group relative bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/50 hover:border-blue-300/50 hover:shadow-blue-500/20 transition-all duration-700 hover:-translate-y-4 hover:scale-[1.02]"
            >
              {/* Status Badge */}
              <div className="absolute -top-4 left-6">
                <span
                  className={`px-4 py-2 rounded-2xl font-bold text-sm shadow-lg transform rotate-3 ${getStatusStyles(ticket.status)}`}
                >
                  {ticket.status.toUpperCase()}
                </span>
              </div>

              {/* Header */}
              <div className="flex justify-between items-start mb-6 pb-6 border-b border-gray-100">
                <h2 className="text-2xl font-black text-gray-900 line-clamp-2 group-hover:text-blue-700 transition-colors pr-4">
                  {ticket.title}
                </h2>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-base mb-8 line-clamp-3 leading-relaxed bg-gradient-to-r from-transparent via-white to-transparent px-2 py-3 rounded-2xl backdrop-blur-sm">
                {ticket.description}
              </p>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                <div className="space-y-2">
                  <p><span className="font-semibold text-gray-700">Ticket ID:</span> <span className="font-mono bg-gray-100 px-2 py-1 rounded-lg text-xs">{ticket._id.slice(-8)}</span></p>
                  <p><span className="font-semibold text-gray-700">Priority:</span> <span className="font-bold text-lg">{ticket.priority || "N/A"}</span></p>
                  <p><span className="font-semibold text-gray-700">Created:</span> {ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : "N/A"}</p>
                </div>
                <div className="space-y-2">
                  <p><span className="font-semibold text-gray-700">Creator:</span> {ticket.createdBy?.email?.split('@')[0] || "N/A"}</p>
                  <p><span className="font-semibold text-gray-700">Technician:</span> <span className="font-medium">{ticket.assignedTo ? ticket.assignedTo.name : "Unassigned"}</span></p>
                  <p><span className="font-semibold text-gray-700">Time:</span> {ticket.createdAt ? new Date(ticket.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : "N/A"}</p>
                </div>
              </div>

              {/* Status Update & Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-100">
                <div className="flex-1 flex items-center space-x-3">
                  <label className="font-semibold text-gray-700 text-sm">Update Status:</label>
                  <select
                    value={ticket.status}
                    onChange={(e) => handleStatusChange(ticket._id, e.target.value)}
                    className="flex-1 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200/50 rounded-xl px-4 py-2 text-sm font-medium focus:ring-4 focus:ring-blue-300/50 focus:border-blue-400 transition-all duration-300 hover:shadow-md"
                  >
                    {["open", "in-progress", "resolved", "closed"].map((status) => (
                      <option key={status} value={status} className="bg-white">
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                
                {ticket.status.toLowerCase() === "open" && !ticket.assignedTo && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(ticket)}
                      className="group relative px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-yellow-500/50 hover:scale-105 hover:-translate-y-1 transition-all duration-300 focus:ring-4 focus:ring-yellow-400/50"
                    >
                      <span>✏️ Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(ticket._id)}
                      className="group relative px-6 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-red-500/50 hover:scale-105 hover:-translate-y-1 transition-all duration-300 focus:ring-4 focus:ring-red-400/50"
                    >
                      <span>🗑️ Delete</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/0 via-blue-400/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-24">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              🎟️
            </div>
            <p className="text-2xl font-bold text-gray-500 mb-2">No tickets found</p>
            <p className="text-gray-400">Create your first ticket to get started</p>
          </div>
        )}
      </div>

      <EditTicket
        ticket={selectedTicket}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onUpdate={handleUpdate}
      />
    </div>
  );
}





// import React from "react";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import EditTicket from "./EditTicket.jsx";
// import { useNavigate } from "react-router-dom";

// export default function MyTickets() {
//   const navigate = useNavigate();
//   const [tickets, setTickets] = useState([]);
//   const [filter, setFilter] = useState("all");
//   const [selectedTicket, setSelectedTicket] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     fetchTickets();
//   }, [filter, setTickets]);

//   const fetchTickets = async () => {
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_URL}/api/ticket/getempticket`,
//         { withCredentials: true }
//       );
//       setTickets(res.data);
//     } catch (err) {
//       if (err.status === 401) {
//         navigate("/");
//       }
//       console.error("Error fetching tickets:", err);
//     }
//   };

//   const handleStatusChange = async (ticketId, newStatus) => {
//     try {
//       await axios.put(
//         `${import.meta.env.VITE_API_URL}/api/ticket/updateticket/${ticketId}`,
//         { status: newStatus },
//         { withCredentials: true }
//       );

//       // Update UI instantly without refetching
//       setTickets((prevTickets) =>
//         prevTickets.map((t) =>
//           t._id === ticketId ? { ...t, status: newStatus } : t
//         )
//       );
//     } catch (err) {
//       console.error("Error updating ticket status:", err);
//       alert("Failed to update status");
//     }
//   };

//   const handleEdit = (ticket) => {
//     setSelectedTicket(ticket);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedTicket(null); // Reset selected ticket
//   };

//   const handleUpdate = () => {
//     // Re-fetch tickets after update
//     axios
//       .get("http://localhost:3000/api/ticket/getempticket", {
//         withCredentials: true,
//       })
//       .then((res) => setTickets(res.data))
//       .catch((err) => console.error("Error fetching updated tickets:", err));
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this ticket?")) {
//       try {
//         await axios.delete(
//           `${import.meta.env.VITE_API_URL}/api/ticket/deleteticket/${id}`,
//           { withCredentials: true }
//         );
//         setTickets(tickets.filter((ticket) => ticket._id !== id));
//       } catch (err) {
//         console.error("Error deleting ticket:", err);
//       }
//     }
//   };

//   const filteredTickets =
//     filter === "all"
//       ? tickets
//       : tickets.filter((t) => t.status.toLowerCase() === filter);

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-6 text-center">Tickets</h1>
//       <div className="flex justify-center gap-3 mb-8 flex-wrap">
//         {["all", "open", "in-progress", "resolved", "closed"].map((status) => (
//           <button
//             key={status}
//             onClick={() => setFilter(status)}
//             className={`px-4 py-2 rounded-lg transition-all duration-200 ${
//               filter === status
//                 ? "bg-blue-600 text-white shadow"
//                 : "bg-gray-300 hover:bg-gray-400"
//             }`}
//           >
//             {status.charAt(0).toUpperCase() + status.slice(1)}
//           </button>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredTickets.length > 0 ? (
//           filteredTickets.map((ticket) => (
//             <div
//               key={ticket._id}
//               className="bg-white p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
//             >
//               <div className="flex justify-between items-center mb-3">
//                 <h2 className="text-lg font-semibold text-gray-800">
//                   {ticket.title}
//                 </h2>

//                 <span
//                   className={`text-xs px-3 py-1 rounded-full font-medium ${
//                     ticket.status === "open"
//                       ? "bg-yellow-200 text-yellow-800"
//                       : ticket.status === "in-progress"
//                       ? "bg-blue-200 text-blue-800"
//                       : "bg-green-200 text-green-800"
//                   }`}
//                 >
//                   {ticket.status}
//                 </span>
//               </div>

//               <p className="text-gray-700 text-sm mb-3 line-clamp-3">
//                 {ticket.description}
//               </p>

//               <div className="text-sm text-gray-600 space-y-1 mb-4">
//                 <p>
//                   <strong>Ticket ID:</strong> {ticket._id}
//                 </p>
//                 <p>
//                   <strong>Priority:</strong> {ticket.priority || "N/A"}
//                 </p>
//                 <p>
//                   <strong>createdby:</strong> {ticket.createdBy.email || "N/A"}
//                 </p>
//                 <p>
//                   <strong>Created On:</strong>{" "}
//                   {ticket.createdAt
//                     ? new Date(ticket.createdAt).toLocaleString()
//                     : "N/A"}
//                 </p>
//                 <p>
//                   <strong>Technician:</strong>{" "}
//                   {ticket.assignedTo ? ticket.assignedTo.name : "Unassigned"}
//                 </p>
//               </div>

//               <div className="flex justify-between items-center mt-3">
//                 <label className="text-sm font-medium text-gray-700">
//                   Update Status:
//                 </label>
//                 <select
//                   value={ticket.status}
//                   onChange={(e) =>
//                     handleStatusChange(ticket._id, e.target.value)
//                   }
//                   className="ml-2 border border-gray-300 rounded-md px-2 py-1 text-sm"
//                 >
//                   {["open", "closed"].map((status) => (
//                     <option key={status} value={status}>
//                       {status.charAt(0).toUpperCase() + status.slice(1)}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               {ticket.status.toLowerCase() === "open" &&
//                 ticket.assignedTo === undefined && (
//                   <span>
//                     <button
//                       onClick={() => handleEdit(ticket)}
//                       className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(ticket._id)}
//                       className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//                     >
//                       Delete
//                     </button>
//                   </span>
//                 )}
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500 col-span-full">
//             No tickets found.
//           </p>
//         )}
//       </div>

//       <EditTicket
//         ticket={selectedTicket}
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         onUpdate={handleUpdate}
//       />
//     </div>
//   );
// }
