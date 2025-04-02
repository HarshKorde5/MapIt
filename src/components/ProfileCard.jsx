import React from "react";
import { useDispatch } from "react-redux";
import { setSelectedProfile } from "../store/profileSlice";


const ProfileCard = ({ profile}) => {
  const dispatch = useDispatch();
  return (
    <div 
      onMouseEnter={() => dispatch(setSelectedProfile(profile))}
      className="relative bg-gray-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105 w-60 text-center text-black">
      {/* Profile Image */}
      <div className="relative w-24 h-24 mx-auto">
        <img
          src={profile.image}
          alt={profile.name}
          className="w-24 h-24 object-cover rounded-full border-4 border-orange-400 shadow-md"
        />
      </div>

      {/* Name & Location */}
      <h2 className="text-xl font-semibold mt-4">{profile.name} <span className="text-gray-500">| {profile.location}</span></h2>
      <p className="text-gray-600 mt-2 text-sm">{profile.description}</p>

      {/* Modern Summary Button - Fixed */}
      <button className="mt-6 px-6 py-2 text-white font-semibold tracking-wide rounded-full bg-orange-400 hover:from-indigo-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300">
        🔍 View Summary
      </button>
    </div>
  );
};

export default ProfileCard;
