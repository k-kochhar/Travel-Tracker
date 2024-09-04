import React from 'react';
import Map from './components/Map';
import LocationForm from './components/LocationForm';

const App = () => {
    return (
        <div>
            <h1>TravelTracker</h1>
            <LocationForm />
            <Map />
        </div>
    );
};

export default App;