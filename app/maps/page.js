"use client"
import { useAuth } from "@/context/auth"

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from "axios";
import Map from "@/components/Map/Map";

// const Map = dynamic(() => import('../components/Map/Map'), { ssr: false });

export default function Home({ initialShips }) {
    const [ships, setShips] = useState([]);
    const [selectedShip, setSelectedShip] = useState(null);
    const { auth } = useAuth()

    useEffect(() => {
        // Sample data
        const initialShips = [
            { id: 1, name: 'Ship 1', lat: 0, lng: 0 },
            { id: 2, name: 'Ship 2', lat: 10, lng: 10 },
        ];
        setShips(initialShips);
    }, []);

  //   useEffect(() => {
  //       // Function to fetch data from the API
  //       const fetchData = async () => {
  //         try {
  //           const response = await axios.get('https://data.aishub.net/ws.php?username=USERNAME&format=1&output=json&compress=3&latmin=20.5&latmax=30.8&lonmin=-15&lonmax=18.6');
  //           setShips(response.data);
  //         } catch (error) {
  //           console.error('Error fetching data:', error);
  //         }
  //       };

  //       fetchData();
  // }, []);


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


        const deleteShip = (shipId) => {
          setShips(ships.filter((ship) => ship.id !== shipId));
        };

        const updateShip = (shipId, newShip) => {
          setShips(ships.map((ship) => (ship.id === shipId ? newShip : ship)));
        };
      

    return (
        <>
            {auth?.token && auth?.user ? (
                <div>
                    <h1>Ship Tracking App</h1>
                    <button onClick={addShip}>Add Ship</button>
                    <Map ships={ships} deleteShip={deleteShip} updateShip={updateShip}  />
                </div>
            ) : (
                <p className="d-flex justify-content-center align-items-center vh-100 text-danger">
                    Access denied
                </p>
            )}
        </>
    );
}

// export async function getServerSideProps() {
//     // Function to fetch initial data for server-side rendering
//     const response = await axios.get('https://data.aishub.net/ws.php?username=USERNAME&format=1&output=json&compress=3&latmin=20.5&latmax=30.8&lonmin=-15&lonmax=18.6');
//     const initialShips = response.data;
  
//     return {
//       props: {
//         initialShips,
//       },
//     };
//   }