// import React from 'react'
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from "react";


export default function Techsidebar() {
  //   const [tickets, setTickets] = useState([]);
  // const [filteredTickets, setFilteredTickets] = useState([]);
  // const [statusFilter, setStatusFilter] = useState("all");
  // const [loading, setLoading] = useState(true);

  // const techId = localStorage.getItem("techId"); // example

  // // Fetch assigned tickets
  // useEffect(() => {
  //   const fetchTickets = async () => {
  //     try {
  //       const res = await fetch(`/api/tickets/assigned/${techId}`);
  //       const data = await res.json();
  //       setTickets(data);
  //       setFilteredTickets(data);
  //     } catch (err) {
  //       console.error("Error fetching tickets:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchTickets();
  // }, [techId]);

  // // Filter tickets by status
  // useEffect(() => {
  //   if (statusFilter === "all") setFilteredTickets(tickets);
  //   else setFilteredTickets(tickets.filter((t) => t.status === statusFilter));
  // }, [statusFilter, tickets]);

  // // Update ticket status
  // const handleStatusChange = async (ticketId, newStatus) => {
  //   try {
  //     const res = await fetch(`/api/tickets/${ticketId}/status`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ status: newStatus }),
  //     });
  //     const updated = await res.json();

  //     // Update UI locally
  //     setTickets((prev) =>
  //       prev.map((t) => (t._id === ticketId ? { ...t, status: updated.status } : t))
  //     );
  //   } catch (err) {
  //     console.error("Error updating status:", err);
  //   }
  // };

  // if (loading) return <p className="text-center mt-10">Loading tickets...</p>;



  return (
    
          <div  className="min-h-screen flex bg-gray-100">
          {/* Sidebar */}
          <div className="w-64 bg-blue-800 text-white p-5 space-y-5">
            <h1 className="text-2xl font-bold">Technician Dashboard</h1>
            <ul className="space-y-2">
              <li>
                <Link
                  to="tickets"
                  className={`w-full text-left p-2 rounded-md `}
                >
                  Tickets
                </Link>
              </li>
            </ul>
          </div>
        </div>
    
  //     <div className="w-64 bg-blue-800 text-white p-5 space-y-5">
  //     <h1 className="text-2xl font-bold mb-6">🧰 Technician Dashboard</h1>

  //     {/* Filter Section */}
  //     <div className="mb-6 flex gap-4">
  //       <select
  //         value={statusFilter}
  //         onChange={(e) => setStatusFilter(e.target.value)}
  //         className="border border-gray-300 rounded-md px-4 py-2"
  //       >
  //         <option value="all">All</option>
  //         <option value="open">Open</option>
  //         <option value="in-progress">In Progress</option>
  //         <option value="resolved">Resolved</option>
  //       </select>
  //     </div>

  //     {/* Tickets List */}
  //     {filteredTickets.length === 0 ? (
  //       <p>No tickets found.</p>
  //     ) : (
  //       <div className="grid gap-4">
  //         {filteredTickets.map((ticket) => (
  //           <div
  //             key={ticket._id}
  //             className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
  //           >
  //             <div className="flex justify-between items-center mb-2">
  //               <h2 className="font-semibold text-lg">{ticket.title}</h2>
  //               <span
  //                 className={`px-3 py-1 rounded text-sm font-medium ${
  //                   ticket.status === "resolved"
  //                     ? "bg-green-100 text-green-700"
  //                     : ticket.status === "in-progress"
  //                     ? "bg-yellow-100 text-yellow-700"
  //                     : "bg-red-100 text-red-700"
  //                 }`}
  //               >
  //                 {ticket.status}
  //               </span>
  //             </div>
  //             <p className="text-gray-600 mb-3">{ticket.description}</p>
  //             <div className="flex justify-end">
  //               <select
  //                 value={ticket.status}
  //                 onChange={(e) =>
  //                   handleStatusChange(ticket._id, e.target.value)
  //                 }
  //                 className="border border-gray-300 rounded-md px-3 py-1"
  //               >
  //                 <option value="open">Open</option>
  //                 <option value="in-progress">In Progress</option>
  //                 <option value="resolved">Resolved</option>
  //               </select>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     )}
  //   </div>
    
  )
}
