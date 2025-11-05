import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import EditUserModal from './EditUserModal';
import { useNavigate } from 'react-router-dom';


export default function Edituser() {
    const navigate=useNavigate()
  // Fetch all users except admin
 const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch all users except admin
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/fetchuser`,{withCredentials:true});
        setUsers(res.data);        
      } catch (err) {
        if(err.status===401)
        {
          navigate("/")
        }
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);


    const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null); // Reset selected user
  };


    const handleUpdate = () => {
    // Re-fetch users after update
    axios
      .get("http://localhost:3000/api/user/fetchuser",{withCredentials:true})
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching updated users:", err));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/user/deleteuser/${id}`,{withCredentials:true});
        setUsers(users.filter((user) => user._id !== id));
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };

  return (
    <div className="max-w-fit p-4 ml-10">
        <h2 className="text-xl font-semibold mb-4">Edit User Login Information</h2>
            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Password</th>
                  <th className="border p-2">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-100">
                <td className=" border p-3">{user.name}</td>
                <td className="border p-3">{user.email}</td>
                <td className=" border p-3">{user.password}</td>
                <td className=" border p-3 capitalize">{user.role}</td>
                <td className=" border p-3 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-4 text-center text-gray-500">
                No users found.
              </td>
            </tr>
          )}
              </tbody>
            </table>
        <EditUserModal
            user={selectedUser}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onUpdate={handleUpdate}
        />


    </div>
  )
}
