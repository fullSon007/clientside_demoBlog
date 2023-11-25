"use client"
import { useAuth } from "@/context/auth"

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Map from "@/components/Map/Map";

// const Map = dynamic(() => import('../components/Map/Map'), { ssr: false });

export default function Home() {
    const [ships, setShips] = useState([]);
    const { auth } = useAuth()

    useEffect(() => {
        // Sample data
        const initialShips = [
            { id: 1, name: 'Ship 1', lat: 0, lng: 0 },
            { id: 2, name: 'Ship 2', lat: 10, lng: 10 },
        ];
        setShips(initialShips);
    }, []);

    const addShip = () => {
        const shipName = prompt('Enter ship name:');
        const lat = parseFloat(prompt('Enter latitude:'));
        const lng = parseFloat(prompt('Enter longitude:'));

        if (!isNaN(lat) && !isNaN(lng)) {
            const newShip = { id: ships.length + 1, name: shipName, lat, lng };
            setShips([...ships, newShip]);
          } else {
            alert('Invalid latitude or longitude. Please enter numeric values.');
          }
        };

    return (
        <>
            {auth?.token && auth?.user ? (
                <div>
                    <h1>Ship Tracking App</h1>
                    <button onClick={addShip}>Add Ship</button>
                    <Map ships={ships} />
                </div>
            ) : (
                <p className="d-flex justify-content-center align-items-center vh-100 text-danger">
                    Access denied
                </p>
            )}
        </>
    );
}