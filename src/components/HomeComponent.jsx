import React from "react";
import { useState } from "react";
import { Menu } from "lucide-react";
import MapComponent from "./MapComponent";
import ProfileList from "./ProfileList";
import {useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";

function HomeComponent(){
    const [showFilters, setShowFilters] = useState(false);

    const [profiles, setProfiles] = useState([
            {
              name: "John Doe",
              location: "Pune",
              image: "https://randomuser.me/api/portraits/men/32.jpg",
              description: "Software Engineer at Google",
              lat : 18.5204,
              lng : 73.8567,
            },
            {
              name: "Jane Smith",
              location: "New York",
              image: "https://randomuser.me/api/portraits/women/45.jpg",
              description: "Product Designer at Apple",
              lat : 40.7128,
              lng : 74.0060,
            },
            {
              name: "Alex Johnson",
              location: "Los Angeles",
              image: "https://randomuser.me/api/portraits/men/75.jpg",
              description: "Data Scientist at Meta",
              lat : 34.0549,
              lng : 118.2426,
            },
            {
              name: "Emily Davis",
              location: "Seattle",
              image: "https://randomuser.me/api/portraits/women/65.jpg",
              description: "Marketing Manager at Amazon",
              lat : 47.6061,
              lng : 122.3328,
            },
            {
              name: "Michael Brown",
              location: "Chicago",
              image: "https://randomuser.me/api/portraits/men/52.jpg",
              description: "Cybersecurity Specialist at IBM",
              lat : 41.8781,
              lng : 87.6298,
            },
            {
              name: "Sophia Wilson",
              location: "Austin",
              image: "https://randomuser.me/api/portraits/women/33.jpg",
              description: "UX/UI Designer at Tesla",
              lat : 30.2672,
              lng : 97.7431,
            },

    ]);

    const selectedProfile = useSelector((state) => state.profile.selectedProfile);
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <div className="flex h-screen">
                {/* Left Section */}
                <div className="flex-1 flex flex-col bg-gray-100 mt-6 mb-6 ml-6 mr-2 p-4 rounded-xl">
                    {/* Navbar */}
                    <nav className="flex items-center justify-between p-4 bg-white shadow-md rounded-xl ">
                        <div className="flex items-center gap-2">
                            <button variant="ghost" onClick={() => setShowFilters(!showFilters)}>
                            <Menu className="w-6 h-6" />
                            </button>
                            <div className="text-xl font-bold">MapIt</div>
                        </div>
                        <div className="flex-1 mx-4 max-w-md">
                            <input type="text" placeholder="Search..." className="w-full p-2 border rounded-md" />
                        </div>
                        <div
                            className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-300 cursor-pointer"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onClick={() => navigate("/profile-settings")}
                        >
                            <img
                                src="https://img.freepik.com/premium-vector/person-with-green-blue-logo-that-says-name_1076610-66914.jpg"
                                alt="user settings"
                                className="w-full h-full object-cover"
                            />

                            {/* Hover dropdown */}
                            {isHovered && (
                                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-40 bg-white shadow-lg rounded-lg p-2 text-sm z-50 border border-gray-200">
                                    <p className="font-medium text-gray-800 hover:text-blue-500 cursor-pointer">View Profile</p>
                                    <p className="text-gray-600 hover:text-blue-500 cursor-pointer">User Settings</p>
                                </div>
                            )}
                        </div>
                    </nav>

                    <div className="flex flex-1 mt-4 ">
                        {/* Sidebar Filter */}
                        {showFilters && (
                            <div className="w-44 bg-white shadow-md rounded-xl mr-2 p-4">
                                Filters...
                                    {/* FiltersComponent */}
                            </div>
                        )}

                        {/* Main Content */}
                        <div className="flex-1 p-4 bg-white rounded-xl shadow-md">
                            {/* ProfileComponent */}
                            <ProfileList profiles={profiles}/>
                            
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="w-1/4 bg-gray-100 mt-6 mr-6 mb-6 rounded-xl">
                    {/* MapComponent */}
                    <MapComponent lat={selectedProfile?.lat || 37.7749} lng={selectedProfile?.lng || -122.4194} />
                </div>
                </div>
        </>
    );
}

export default HomeComponent;