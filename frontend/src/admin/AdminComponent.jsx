import { motion } from "framer-motion";
import { 
  FiUser, 
  FiPlus, 
  FiLogOut, 
  FiSearch,
  FiSettings,
  FiBell,
  FiMail
} from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProfiles, setSelectedProfile } from "../store/profileSlice.js";
import React, { useState, useEffect } from "react";


export default function AdminComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get profiles & selected profile from Redux
    const { profiles, selectedProfile, loading, error } = useSelector((state) => state.profile);

    console.log(profiles)
    //  Fetch profiles once when the component mounts
    useEffect(() => {
        dispatch(fetchProfiles());
    }, [dispatch]);


    useEffect(() => {
        if (users.length === 0 && profiles.length > 0) {
            setUsers(profiles);
        }
    }, [profiles]);
    

    const [users, setUsers] = useState(profiles);

    const [searchTerm, setSearchTerm] = useState("");

    const [editingUser, setEditingUser] = useState(null);
    const [editedData, setEditedData] = useState({
        name: "",
        email: "",
        location: "",
        description: "",
        image:"",
        lat:"",
        lng:"",
    });
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const addUser = async () => {
        const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
        const newUser = { 
            id: `${newId}`, 
            name: `New User ${newId}`, 
            email: `user${newId}@example.com`, 
            image: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            location: `Pune`,
            description: `Working at bynry.inc`,
            lat : 18.5204,
            lng : 73.8567
        };

        fetch("http://localhost:5000/profiles", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser)
        })
        .then(response => response.json())
        .then(data => {
            setUsers([...users, data]);  // Add new user to state
        })
        .catch(error => console.error("Error adding user:", error));
    };

    const removeUser = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            fetch(`http://localhost:5000/profiles/${id}`, { method: "DELETE" })
            .then(() => {
                setUsers(users.filter(user => user.id !== id));
            })
            .catch(error => console.error("Error deleting user:", error));
        }
    };


    const startEditingUser = (user) => {
        setEditingUser(user);
        setEditedData(user); // Pre-fill form with existing data
    };
    const handleInputChange = (e) => {
        setEditedData({ ...editedData, [e.target.name]: e.target.value });
    };
    const saveEdit = () => {
        fetch(`http://localhost:5000/profiles/${editingUser.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editedData)
        })
        .then(response => response.json())
        .then(data => {
            setUsers(users.map(user => (user.id === editingUser.id ? data : user))); // Update local state
            setEditingUser(null); // Close form after saving
        })
        .catch(error => console.error("Error updating user:", error));
    };
    

    const cancelEdit = () => {
        setEditingUser(null); // Close form without saving
    };

    
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6">
        {/* Navbar */}
        <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 shadow-sm rounded-xl mb-6"
        >
            <div className="flex items-center mb-4 sm:mb-0">
            <h1 className="text-2xl font-bold text-blue-600">UserAdmin</h1>
            <div className="ml-6 relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                type="text"
                placeholder="Search users..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            </div>
            
            <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full">
                <FiMail />
            </button>
            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full relative">
                <FiBell />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full">
                <FiSettings />
            </button>
            <button
                onClick={addUser}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
                <FiPlus className="mr-2" />
                Add User
            </button>
            <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all">
                <FiLogOut className="mr-2" />
                Logout
            </button>
            </div>
        </motion.div>

        {/* User List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredUsers.map((user, index) => (
                
            <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
                {editingUser?.id === user.id ? (
                    // Edit Form
                    <div className="space-y-3">
                        <input 
                            type="text"
                            name="name"
                            value={editedData.name}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                        />
                        <input 
                            type="email"
                            name="email"
                            value={editedData.email}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                        />
                        <input 
                            type="text"
                            name="location"
                            value={editedData.location}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                        />
                        <input 
                            type="text"
                            name="image"
                            value= {editedData.image}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                        />
                        <input 
                            type="text"
                            name="lat"
                            value= {editedData.lat}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                        />
                        <input 
                            type="text"
                            name="lng"
                            value= {editedData.lng}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                        />
                        <textarea
                            name="description"
                            value={editedData.description}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                        />
                        <div className="flex space-x-2">
                            <button onClick={saveEdit} className="px-4 py-2 bg-green-600 text-white rounded">
                                Save
                            </button>
                            <button onClick={cancelEdit} className="px-4 py-2 bg-gray-400 text-white rounded">
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                <>
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold mr-4">
                                        <img src={user.image} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">{user.name}</h3>
                                        <p className="text-gray-500 text-sm">{user.email}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between text-sm mb-4">
                                    <span className="text-gray-500">Location:</span>
                                    <span className="font-medium text-gray-700">
                                        {user.location}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Description:</span>
                                    <span className="text-gray-700">{user.description}</span>
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-100 flex space-x-2">
                                    <button onClick={() => startEditingUser(user)} className="flex-1 py-2 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100">
                                        Edit
                                    </button>
                                    <button onClick={() => removeUser(user.id)} className="flex-1 py-2 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100">
                                        Remove
                                    </button>
                                </div></>
        )}
            </motion.div>
            ))}
        </div>

        {filteredUsers.length === 0 && (
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-8 rounded-xl shadow-sm text-center"
            >
            <p className="text-gray-500">No users found matching your search</p>
            <button
                onClick={addUser}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
                Add New User
            </button>
            </motion.div>
        )}
        </div>
    );
}