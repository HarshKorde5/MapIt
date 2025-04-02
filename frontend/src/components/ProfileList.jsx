import React from "react";
import ProfileCard from "./ProfileCard";


const ProfileList = ({ profiles }) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {profiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>
    </>
  );
};

export default ProfileList;
