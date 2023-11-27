import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ ships, addNewShip, deleteShip, updateShip }) => {

  const [selectedShip, setSelectedShip] = useState(null);


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
      const marker = L.marker([ship.lat, ship.lng])
      
        .addTo(map)
        .bindPopup(`<b>${ship.name}</b><br>ID: ${ship.id}<br>Latitude: ${ship.lat}<br>Longitude: ${ship.lng}`)
        .on('contextmenu', function (e) {
          e.originalEvent.preventDefault();
          const confirmDelete = window.confirm(`Do you want to delete ${ship.name}?`);
          if (confirmDelete) {
            deleteShip(ship.id);
          }
        })
        .on('click', function () {
          setSelectedShip(ship);
        });
    };


    const handleUpdate = () => {
      const newName = prompt('Enter new name:');
      const newLat = parseFloat(prompt('Enter new latitude:'));
      const newLng = parseFloat(prompt('Enter new longitude:'));
  
      if (newName !== null && !isNaN(newLat) && !isNaN(newLng)) {
        updateShip(selectedShip.id, { ...selectedShip, name: newName, lat: newLat, lng: newLng });
        setSelectedShip(null);
      } else {
        alert('Invalid input. Please try again.');
      }
    };

  return (
    <div>
      <div id="map" style={{ height: '500px', maxWidth: '100%' }} />;
      {selectedShip && (
        <div>
          <h3>Update Ship</h3>
          <p>ID: {selectedShip.id}</p>
          <p>Name: {selectedShip.name}</p>
          <p>Latitude: {selectedShip.lat}</p>
          <p>Longitude: {selectedShip.lng}</p>
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}
    </div>
  );
};

export default Map;