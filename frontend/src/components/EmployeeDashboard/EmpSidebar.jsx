import React from 'react'
import { Link } from 'react-router-dom'

export default function EmpSidebar() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-72 bg-gradient-to-b from-blue-800 via-blue-700 to-blue-900 text-white p-8 space-y-4 shadow-2xl border-r-4 border-blue-500/30 backdrop-blur-sm">
        <div className="flex items-center space-x-3 mb-10 pb-8 border-b-2 border-blue-400/50">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shadow-lg">
            👤
          </div>
          <h2 className="text-3xl font-black bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent drop-shadow-lg">
            Employee Panel
          </h2>
        </div>
        
        <Link
          to="createticket"
          className="group block w-full text-left px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 hover:backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/25 border-2 border-white/20 hover:border-white/40 hover:-translate-x-1 flex items-center space-x-4"
        >
          <span className="text-2xl group-hover:scale-110 transition-transform duration-200">➕</span>
          <span className="font-semibold text-lg tracking-wide">Create Ticket</span>
          <span className="ml-auto text-blue-200 group-hover:text-white transition-colors">→</span>
        </Link>
        
        <Link
          to="mytickets"
          className="group block w-full text-left px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 hover:backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/25 border-2 border-white/20 hover:border-white/40 hover:-translate-x-1 flex items-center space-x-4"
        >
          <span className="text-2xl group-hover:scale-110 transition-transform duration-200">🎟️</span>
          <span className="font-semibold text-lg tracking-wide">My Tickets</span>
          <span className="ml-auto text-blue-200 group-hover:text-white transition-colors">→</span>
        </Link>
      </div>
    </div>
  )
}




// import React from 'react'
// import { Link } from 'react-router-dom'
// export default function EmpSidebar() {
//   return (
//    <div className="flex min-h-screen bg-gray-100">
//       <div className="w-64 bg-blue-700 text-white p-6 space-y-6">
//         <h2 className="text-2xl font-bold mb-8">Employee Panel</h2>
//         <Link
//           to="createticket"
//           className={`block w-full text-left px-4 py-2 rounded-lg `}
//         >
//           ➕ Create Ticket
//         </Link>
//         <Link
//         to="mytickets"
//           className={`block w-full text-left px-4 py-2 rounded-lg `}
//         >
//           🎟️ My Tickets
//         </Link>
//       </div>
//     </div>
//   )
// }
