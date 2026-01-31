import React, { createContext, useState, useContext } from 'react';

const VehicleContext = createContext();

export const VehicleProvider = ({ children }) => {
    const [vehicles, setVehicles] = useState([]);

    const addVehicle = (vehicle) => {
        // Determine the ID based on existing length (simplified for now)
        const newVehicle = { ...vehicle, id: (vehicles.length + 1).toString() };
        setVehicles([...vehicles, newVehicle]);
    };

    return (
        <VehicleContext.Provider value={{ vehicles, addVehicle }}>
            {children}
        </VehicleContext.Provider>
    );
};

export const useVehicles = () => useContext(VehicleContext);
