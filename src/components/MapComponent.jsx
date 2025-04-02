import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "665px",
  borderRadius: "15px",
  overflow: "hidden",
};


const MapComponent = ({lat, lng}) => {
  return (
    <div>
        <LoadScript googleMapsApiKey= {import.meta.env.VITE_MAP_API_KEY}>
        <GoogleMap mapContainerStyle={containerStyle} center={{lat,lng}} zoom={12}>
            <Marker position={{lat, lng}} />
        </GoogleMap>
        </LoadScript>
    </div>
  );
};

export default MapComponent;
