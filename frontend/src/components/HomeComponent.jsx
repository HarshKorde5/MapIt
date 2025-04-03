import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfiles } from "../store/profileSlice.js";

import ProfileList from "./ProfileList";
import MapComponent from "./MapComponent";

function HomeComponent() {
    const [showFilters, setShowFilters] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({ location: "" });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get profiles & selected profile from Redux
    const { profiles, selectedProfile, loading, error } = useSelector((state) => state.profile);

    // Fetch profiles once when the component mounts
    useEffect(() => {
        dispatch(fetchProfiles());
    }, [dispatch]);

    // Apply search & filters
    const filteredProfiles = profiles.filter((profile) => {
        return (
            (filters.location === "" || profile.location === filters.location) &&
            (searchQuery === "" ||
                profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                profile.location.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    });

    const uniqueCities = [...new Set(profiles.map((profile) => profile.location))];

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <div className="flex h-screen">
                {/* Left Section */}
                <div className="flex-1 flex flex-col bg-gray-100 mt-6 mb-6 ml-6 mr-2 p-4 rounded-xl overflow-hidden">
                    {/* Navbar */}
                    <nav className="flex items-center justify-between p-4 bg-white shadow-md rounded-xl">
                        <div className="flex items-center gap-2">
                            <button variant="ghost" onClick={() => setShowFilters(!showFilters)}>
                                <Menu className="w-6 h-6" />
                            </button>
                            <div className="text-xl font-bold">MapIt</div>
                        </div>

                        {/* Search Input */}
                        <div className="flex-1 mx-4 max-w-md">
                            <input
                                type="text"
                                placeholder="Search by name or city..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>

                        {/* Logout Button */}
                        <button
                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                            onClick={() => {
                                localStorage.removeItem("isAuthenticated");
                                navigate("/");
                            }}
                        >
                            Logout
                        </button>
                    </nav>

                    <div className="flex flex-1 mt-4">
                        {/* Sidebar Filters */}
                        {showFilters && (
                            <div className="w-44 bg-white shadow-md rounded-xl mr-2 p-4">
                                <h2 className="text-lg font-bold mb-2">Filters</h2>

                                {/* Location Filter */}
                                <label className="block text-sm font-medium">Location</label>
                                <select
                                    className="w-full p-2 border rounded-md mb-3"
                                    value={filters.location}
                                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                                >
                                    <option value="">All Cities</option>
                                    {uniqueCities.map((city, index) => (
                                        <option key={index} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                                {/* Reset Button */}
                                <button
                                    className="mt-3 px-4 py-2 bg-gray-300 rounded-md w-full"
                                    onClick={() => setFilters({ location: "" })}
                                >
                                    Reset Filters
                                </button>
                            </div>
                        )}

                        {/* Main Content */}
                        <div className="flex-1 p-4 bg-white rounded-xl shadow-md overflow-y-auto max-h-[76vh]">
                            {/*Pass filtered profiles to ProfileList */}
                            <ProfileList profiles={filteredProfiles} />
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="w-1/4 bg-gray-100 mt-6 mr-6 mb-6 rounded-xl flex h-[94vh]">
                    <MapComponent
                        lat={selectedProfile?.lat || 37.7749}
                        lng={selectedProfile?.lng || -122.4194}
                    />
                </div>
            </div>
        </>
    );
}

export default HomeComponent;