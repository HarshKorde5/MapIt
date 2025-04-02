import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import MapComponent from "./MapComponent";
import { useState, useEffect } from "react";
const ProfileSummary = () => {
  const navigate = useNavigate();

  const reduxProfile = useSelector((state) => state.profile.selectedProfile);
  const [profile, setProfile] = useState(reduxProfile || JSON.parse(localStorage.getItem("selectedProfile")));

  useEffect(() => {
    if (!reduxProfile) {
      setProfile(JSON.parse(localStorage.getItem("selectedProfile")));
    }
  }, [reduxProfile]);

  if (!profile) return <div className="text-center text-xl">Profile not found.</div>;


  return (
    <div className="flex items-center justify-center h-screen bg-white p-6">
      {/* Card Container */}
      <div className="relative flex w-[90vw] h-[90vh] bg-gray-200 p-8 rounded-3xl shadow-xl">
        {/* Back Button */}
        <button
          onClick={() => navigate("/home")}
          className="absolute top-4 left-4 flex items-center px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400 transition-all"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </button>

        {/* Left Side: Profile Info */}
        <div className="w-1/4 flex flex-col items-center justify-center">
          <img src={profile.image} alt={profile.name} className="w-52 h-52 rounded-full shadow-lg" />
          <h2 className="text-3xl font-semibold mt-4">{profile.name}</h2>
          <p className="text-gray-500 text-lg">{profile.location}</p>
          <p className="mt-6 text-gray-600 text-center">{profile.description}</p>
        </div>

        {/* Right Side: Map */}
        <div className="w-3/4 flex justify-center items-center">
          <MapComponent lat={profile?.lat || 37.7749} lng={profile?.lng || -122.4194} />
        </div>
      </div>
    </div>
  );
};

export default ProfileSummary;
