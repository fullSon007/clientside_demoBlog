import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ ships, addNewShip }) => {
  useEffect(() => {
    const map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    ships.forEach((ship) => {
        addMarkerToMap(map, ship);
      });
  
      // Cleanup map when component unmounts
      return () => map.remove();
    }, [ships]);
  
    const addMarkerToMap = (map, ship) => {
      L.marker([ship.lat, ship.lng])
        .addTo(map)
        .bindPopup(`<b>${ship.name}</b><br>ID: ${ship.id}<br>Latitude: ${ship.lat}<br>Longitude: ${ship.lng}`);
    };

  return <div id="map" style={{ height: '400px', maxWidth: '100%' }} />;
};

export default Map;