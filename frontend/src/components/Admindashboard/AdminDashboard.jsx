import { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";

export default function AdminDashboard() {
  // const [activeTab, setActiveTab] = useState("register");

  const renderSection = () => {
    
          
  };

  return (
    <>
     <Navbar/>
    <div className="sideb">
    <Sidebar/>
    <Outlet/>
    </div>
    </>
  );
}



















































// import { useState } from "react";

// export default function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState("register");

//   const renderSection = () => {
//     switch (activeTab) {
//       case "register":
//         return (
//           <div>
//             <h2 className="text-xl font-semibold mb-4">Register Employees / Technicians</h2>
//             <form className="space-y-3">
//               <input
//                 type="text"
//                 placeholder="Full Name"
//                 className="w-full border p-2 rounded-md"
//               />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 className="w-full border p-2 rounded-md"
//               />
//               <input
//                 type="password"
//                 placeholder="Set Password"
//                 className="w-full border p-2 rounded-md"
//               />
//               <select className="w-full border p-2 rounded-md">
//                 <option value="employee">Employee</option>
//                 <option value="technician">Technician</option>
//               </select>
//               <button
//                 type="submit"
//                 className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
//               >
//                 Create User
//               </button>
//             </form>
//           </div>
//         );

//       case "editUsers":
//         return (
//           <div>
//             <h2 className="text-xl font-semibold mb-4">Edit User Login Information</h2>
//             <table className="w-full border">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="border p-2">Name</th>
//                   <th className="border p-2">Email</th>
//                   <th className="border p-2">Role</th>
//                   <th className="border p-2">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="border p-2">John Doe</td>
//                   <td className="border p-2">john@company.com</td>
//                   <td className="border p-2">Employee</td>
//                   <td className="border p-2">
//                     <button className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2">
//                       Edit
//                     </button>
//                     <button className="bg-red-500 text-white px-2 py-1 rounded-md">
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         );

//       case "tickets":
//         return (
//           <div>
//             <h2 className="text-xl font-semibold mb-4">All Tickets</h2>
//             <div className="mb-4 flex gap-3">
//               <button className="bg-blue-500 text-white px-3 py-1 rounded-md">All</button>
//               <button className="bg-green-500 text-white px-3 py-1 rounded-md">Resolved</button>
//               <button className="bg-yellow-500 text-white px-3 py-1 rounded-md">Open</button>
//             </div>
//             <table className="w-full border">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="border p-2">Ticket ID</th>
//                   <th className="border p-2">Title</th>
//                   <th className="border p-2">Status</th>
//                   <th className="border p-2">Assigned To</th>
//                   <th className="border p-2">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="border p-2">#TCK123</td>
//                   <td className="border p-2">Printer not working</td>
//                   <td className="border p-2 text-yellow-600 font-medium">Open</td>
//                   <td className="border p-2">Unassigned</td>
//                   <td className="border p-2">
//                     <button className="bg-blue-500 text-white px-2 py-1 rounded-md">
//                       Assign
//                     </button>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         );

//       case "viewUsers":
//         return (
//           <div>
//             <h2 className="text-xl font-semibold mb-4">All Users & Technicians</h2>
//             <table className="w-full border">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="border p-2">Name</th>
//                   <th className="border p-2">Email</th>
//                   <th className="border p-2">Role</th>
//                   <th className="border p-2">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="border p-2">Jane Smith</td>
//                   <td className="border p-2">jane@company.com</td>
//                   <td className="border p-2">Technician</td>
//                   <td className="border p-2 text-green-600">Active</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         );

//       case "assignTickets":
//         return (
//           <div>
//             <h2 className="text-xl font-semibold mb-4">Assign Tickets to Technicians</h2>
//             <form className="space-y-3">
//               <input
//                 type="text"
//                 placeholder="Ticket ID"
//                 className="w-full border p-2 rounded-md"
//               />
//               <select className="w-full border p-2 rounded-md">
//                 <option>Select Technician</option>
//                 <option value="tech1">John - Technician</option>
//                 <option value="tech2">Jane - Technician</option>
//               </select>
//               <button
//                 type="submit"
//                 className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
//               >
//                 Assign Ticket
//               </button>
//             </form>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen flex bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-blue-800 text-white p-5 space-y-5">
//         <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//         <ul className="space-y-2">
//           <li>
//             <button
//               onClick={() => setActiveTab("register")}
//               className={`w-full text-left p-2 rounded-md ${
//                 activeTab === "register" ? "bg-blue-600" : "hover:bg-blue-700"
//               }`}
//             >
//               ➕ Register Users
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => setActiveTab("editUsers")}
//               className={`w-full text-left p-2 rounded-md ${
//                 activeTab === "editUsers" ? "bg-blue-600" : "hover:bg-blue-700"
//               }`}
//             >
//               ✏️ Edit User Info
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => setActiveTab("tickets")}
//               className={`w-full text-left p-2 rounded-md ${
//                 activeTab === "tickets" ? "bg-blue-600" : "hover:bg-blue-700"
//               }`}
//             >
//               🎟️ View Tickets
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => setActiveTab("viewUsers")}
//               className={`w-full text-left p-2 rounded-md ${
//                 activeTab === "viewUsers" ? "bg-blue-600" : "hover:bg-blue-700"
//               }`}
//             >
//               👥 View All Users
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => setActiveTab("assignTickets")}
//               className={`w-full text-left p-2 rounded-md ${
//                 activeTab === "assignTickets" ? "bg-blue-600" : "hover:bg-blue-700"
//               }`}
//             >
//               🧾 Assign Tickets
//             </button>
//           </li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-8">{renderSection()}</div>
//     </div>
//   );
// }
