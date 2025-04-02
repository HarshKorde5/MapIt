import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "15px",
  overflow: "hidden",
};


const libraries = ["places"]; // Load required libraries

const MapComponent = ({ lat, lng }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY, // Load only once
    libraries,
  });

  if (loadError) return <p>Error loading maps</p>;
  if (!isLoaded) return <p>Loading maps...</p>;

  return (<div className="w-full h-full">
    <GoogleMap mapContainerStyle={containerStyle} center={{ lat, lng }} zoom={12}>
      <Marker position={{ lat, lng }} />
    </GoogleMap>
  </div>
  );
};

export default React.memo(MapComponent); // Prevent unnecessary re-renders
