import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Admin credentials (In a real app, this should be stored securely on the server)
    const ADMIN_CREDENTIALS = {
        username: "admin",
        password: "123"
    };

    const handleLogin = (e) => {
        e.preventDefault();

        // Check if credentials match
        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            localStorage.setItem("isAuthenticated", "true"); // Store authentication status
            navigate("/admin"); // Redirect to the dashboard
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>

                {error && <p className="text-red-500 text-center mb-2">{error}</p>}

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block font-medium">Username</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-lg"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium">Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border rounded-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Login
                    </button>

                    {/* Cancel Button */}
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="w-full mt-2 bg-gray-300 text-gray-800 p-2 rounded-lg hover:bg-gray-400 transition duration-300"
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginComponent;
