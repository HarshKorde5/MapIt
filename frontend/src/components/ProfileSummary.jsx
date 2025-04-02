import React from "react";
import { useSelector } from "react-redux";
import MapComponent from "./MapComponent";

const ProfileSummary = () => {
  const profile = useSelector((state) => state.profile.selectedProfile); // Get profile from Redux

  if (!profile) return <div className="text-center text-xl">Profile not found.</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-6">
      {/* Card Container */}
      <div className="flex w-[90vw] bg-gray-200 p-8 rounded-3xl shadow-xl">
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
