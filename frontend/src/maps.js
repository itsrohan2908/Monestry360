import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const MapComponent = () => {
  const containerStyle = { width: '100vw', height: '400px' };
  const center = { lat: 28.6139, lng: 77.2090 }; // example: Delhi

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      />
    </LoadScript>
  );
};

export default MapComponent;
