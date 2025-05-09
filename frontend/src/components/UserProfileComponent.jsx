import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Facebook,
  Instagram,
  MapPin,
  MessageSquare,
  Linkedin,
  Globe,
  Phone
} from "lucide-react";
import { useSelector } from "react-redux";
import MapComponent from "./MapComponent.jsx";

const UserProfileComponent = () => {
  const navigate = useNavigate();


  const reduxProfile = useSelector((state) => state.profile.selectedProfile);
  const [profile, setProfile] = useState(reduxProfile || JSON.parse(localStorage.getItem("selectedProfile")));

  useEffect(() => {
    if (!reduxProfile) {
      setProfile(JSON.parse(localStorage.getItem("selectedProfile")));
    }
  }, [reduxProfile]);

  if (!profile) return <div className="text-center text-xl">Profile not found.</div>;

  // User data
  const userData = {
    name: profile.name,
    title: profile.description,
    location: profile.location,
    bio: profile.bio,
    avatar: profile.image,
    coverImage: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=1600",
    social: {
      email: profile.email,
      facebook: "",
      instagram: "",
      linkedin: ""
    },
    stats: {
      followers: profile.followers,
      following: profile.following
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content left side */}
      <main className="flex-1 p-6">

        {/* Back Button */}
        <button
          onClick={() => navigate("/home")}
          className="flex items-center mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition-all"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </button>

        {/* Cover Image with Gradient Overlay */}
        <div className="relative w-full h-48 rounded-xl overflow-hidden shadow-lg">
          <img
            src={userData.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Profile Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative -mt-16 flex items-start md:items-center space-x-4 p-6 bg-white rounded-xl shadow-lg"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative"
          >
            <img
              src={userData.avatar}
              alt="Profile"
              className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-white shadow-xl object-cover"
            />
            <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-1 rounded-full">
              <MessageSquare size={16} />
            </div>
          </motion.div>

          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{userData.name}</h2>
                <p className="text-gray-600">{userData.title}</p>
                <div className="flex items-center mt-1 text-gray-500">
                  <MapPin size={16} className="mr-1" />
                  <span>{userData.location}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4 md:mt-0 px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Send Message
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* About Me */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 bg-white p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">About Me</h3>
          <p className="text-gray-600 leading-relaxed">{profile.bio}</p>

          {/* Stats */}
          <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
            {Object.entries(userData.stats).map(([key, value]) => (
              <div key={key} className="text-center">
                <p className="text-xl font-bold text-gray-800">{value}</p>
                <p className="text-sm text-gray-500 capitalize">{key}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Right Sidebar */}
      <motion.aside
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="hidden lg:block w-80 p-6 bg-white rounded-xl shadow-lg ml-6"
      >
        <div className="sticky top-6 space-y-6">
          {/* Location */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="flex items-center text-lg font-semibold text-gray-800">
              <MapPin className="mr-2 text-blue-500" size={18} />
              Location
            </h3>
            <p className="mt-2 text-gray-600">{profile.location}</p>
            <div className="mt-3 h-40 bg-gray-200 rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                <MapComponent lat={profile?.lat || 37.7749} lng={profile?.lng || -122.4194} />
              </div>
            </div>
          </div>

          {/* Connect */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Connect</h3>
            <div className="space-y-3">
              <motion.a
                whileHover={{ x: 5 }}
                href={`mailto:${userData.social.email}`}
                className="flex items-center text-gray-700 hover:text-blue-600"
              >
                <Mail className="mr-3 text-blue-500" size={18} />
                <span>{userData.social.email}</span>
              </motion.a>
              <motion.a
                whileHover={{ x: 5 }}
                href={`https://linkedin.com/`}
                target="_blank"
                className="flex items-center text-gray-700 hover:text-blue-600"
              >
                <Linkedin className="mr-3 text-blue-500" size={18} />
                <span>LinkedIn</span>
              </motion.a>
            </div>
          </div>

          {/* Contact */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-700">
                <Globe className="mr-3 text-blue-500" size={18} />
                <span>{profile.name}.design</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Phone className="mr-3 text-blue-500" size={18} />
                <span>{profile.contact}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </div>
  );
};

export default UserProfileComponent;
