import React from 'react'
import {Link} from "react-router-dom"

export default function Sidebar() {
  return (
    
      <div  className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white p-5 space-y-5">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <ul className="space-y-2 ">
          <li className="mt-6 mb-6">
            <Link
              to="register"
              // onClick={() => setActiveTab("register")}
              className={`w-full text-left p-2 rounded-md `}
            >
              ➕ Register Users
            </Link>
          </li>
          <li className="mt-6 mb-6">
            <Link
            to="edituser"
              // onClick={() => setActiveTab("editUsers")}
              className={`w-full text-left p-2 rounded-md `}
            >
              ✏️ Edit User Info
            </Link>
          </li>
          <li className="mt-6 mb-6">
            <Link
            to="viewtickets"
              // onClick={() => setActiveTab("tickets")}
              className={`w-full text-left p-2 rounded-md `}
            >
              🎟️ View Tickets
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      {/* <div className="flex-1 p-8">{renderSection()}</div> */}
    </div>
    
  )
}
