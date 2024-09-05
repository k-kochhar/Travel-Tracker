import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';


import axios from 'axios';

const customIcon = new L.Icon({
    iconUrl: '/pindrop.png',
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Anchor of the icon
    popupAnchor: [0, -32] // Anchor of the popup
});

const Map = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        // Fetch locations from backend
        axios.get('http://127.0.0.1:5000/locations')
            .then(response => {
                // Update state with fetched locations
                setLocations(response.data);
            })
            .catch(error => console.error('Error fetching locations:', error));
    }, []);

    useEffect(() => {
        socket.on('newLocation', (locationData) => {
            const { location, coordinates } = locationData;
            addMarker(coordinates.lat, coordinates.lng, location);
        });

        return () => {
            socket.off('newLocation');
        };
    }, [socket]);

    return (
        <MapContainer center={[20.7749, 0]} zoom={3} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {locations.map((loc, index) => (
                <Marker key={index} position={[loc.latitude, loc.longitude]} icon={customIcon}>
                    <Popup>{loc.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;