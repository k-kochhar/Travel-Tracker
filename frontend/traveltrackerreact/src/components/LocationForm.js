import React, { useState } from 'react';
import axios from 'axios';

const LocationForm = () => {
    const [name, setName] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:5000/locations', {
            name,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude)
        })
            .then(response => {
                alert(response.data.message);
                setName('');
                setLatitude('');
                setLongitude('');
            })
            .catch(error => console.error('Error adding location:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="number"
                step="any"
                placeholder="Latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                required
            />
            <input
                type="number"
                step="any"
                placeholder="Longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                required
            />
            <button type="submit">Add Location</button>
        </form>
    );
};

export default LocationForm;