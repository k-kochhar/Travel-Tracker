import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const Map = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        // Fetch locations from backend
        axios.get('http://127.0.0.1:5000/locations')
            .then(response => setLocations(response.data))
            .catch(error => console.error('Error fetching locations:', error));
    }, []);

    return (
        <MapContainer center={[37.7749, -122.4194]} zoom={5} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {locations.map((loc, index) => (
                <Marker key={index} position={[loc.latitude, loc.longitude]}>
                    <Popup>{loc.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;