import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "665px",
  borderRadius: "15px",
  overflow: "hidden",
};

const center = {
  lat: 18.5204, // Example: Pune
  lng: 73.8567,
};

const MapComponent = () => {
  return (
    <div>
        <LoadScript googleMapsApiKey= {import.meta.env.VITE_MAP_API_KEY}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
            <Marker position={center} />
        </GoogleMap>
        </LoadScript>
    </div>
  );
};

export default MapComponent;
