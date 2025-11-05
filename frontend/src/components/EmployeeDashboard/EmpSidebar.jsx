import React from 'react'
import { Link } from 'react-router-dom'
export default function EmpSidebar() {
  return (
   <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-blue-700 text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold mb-8">Employee Panel</h2>
        <Link
          to="createticket"
          className={`block w-full text-left px-4 py-2 rounded-lg `}
        >
          ➕ Create Ticket
        </Link>
        <Link
        to="mytickets"
          className={`block w-full text-left px-4 py-2 rounded-lg `}
        >
          🎟️ My Tickets
        </Link>
      </div>
    </div>
  )
}
