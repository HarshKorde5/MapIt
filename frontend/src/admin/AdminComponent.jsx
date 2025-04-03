import {
    FiUser,
    FiPlus,
    FiLogOut,
    FiSearch,
    FiSettings,
    FiBell,
    FiMail
} from "react-icons/fi";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfiles } from "../store/profileSlice.js";


export default function AdminComponent() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated");
        navigate("/");
    };

    const dispatch = useDispatch();

    // Get profiles & selected profile from Redux
    const { profiles, selectedProfile, loading, error } = useSelector((state) => state.profile);

    // console.log(profiles)
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

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [editedData, setEditedData] = useState({
        name: "",
        email: "",
        location: "",
        description: "",
        image: "",
        lat: 18.5204,
        lng: 73.8567,
        bio: "",
        followers: 0,
        following: 0,
        contact: "",
        dob: "",
        gender: "",
        age: 0,
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
            lat: 18.5204,
            lng: 73.8567,
            bio: `Exploring the world one bite at a time. Passionate about street food and hidden travel gems.`,
            followers: 1532,
            following: 210,
            contact: "+91 9876543210",
            dob: "1990-05-15",
            gender: "Male",
            age: 34,
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
        setEditedData(user);
        setIsModalOpen(true)
    };
    const handleInputChange = (e) => {
        const { name, value, type } = e.target;

        // Convert numeric fields to numbers
        const newValue = type === "number" ? Number(value) : value;
        setEditedData({ ...editedData, [name]: newValue });

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
        setIsModalOpen(false);
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
                    <button
                        onClick={handleLogout}
                        className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all">
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
                            </div>
                        </>


                    </motion.div>
                ))}
            </div>


            {editingUser && isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-none bg-opacity-50">
                    <div className="bg-gray-100 p-6 overflow-auto h-[70vh] rounded-lg shadow-xl w-1/3">
                        <h2 className="text-xl font-bold mb-4">Edit User</h2>
                        {Object.keys(editingUser).map((key) => {
                            const isNumberField = ["following", "followers", "age", "lng", "lat"].includes(key);
                            return (
                                <div key={key} className="mb-2">
                                    <label className="block capitalize">{key.replace("_", " ")} : </label>
                                    <input
                                        type={isNumberField ? "number" : "text"}
                                        name={key}
                                        value={editedData[key] || 0}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                            );
                        })}
                        <div className="flex justify-end mt-4">
                            <button onClick={saveEdit} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
                            <button onClick={() => { cancelEdit() }} className="ml-2 px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
                        </div>
                    </div>
                </div>
            )}


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