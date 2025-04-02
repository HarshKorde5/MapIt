import React from "react";
import { useState } from "react";
import { Menu } from "lucide-react";
import MapComponent from "./MapComponent";
function HomeComponent(){
    const [showFilters, setShowFilters] = useState(false);
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
                        <div className="w-10 h-10 bg-gray-300" >
                            <img 
                                src="https://img.freepik.com/premium-vector/person-with-green-blue-logo-that-says-name_1076610-66914.jpg"
                                alt="user settings"
                            />
                            {/* UserSettingsComponent */}
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
                            Main Content Area
                            
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="w-1/4 bg-gray-100 mt-6 mr-6 mb-6 rounded-xl">
                    {/* MapComponent */}
                    <MapComponent />
                </div>
                </div>
        </>
    );
}

export default HomeComponent;