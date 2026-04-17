// src/components/MapComponent.tsx
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import { useGeolocation } from '../hooks/useGeolocation';
import { getAddress } from '../services/opencagedata';
import './MapComponent.css';

// Sub-componente para re-centrar el mapa [cite: 1397]
const RecenterMap = ({ position }: { position: any }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView([position.latitude, position.longitude]);
    }
  }, [position]);
  return null;
};

const MapComponent: React.FC = () => {
  const { position, startTracking, stopTracking } = useGeolocation();
  const [path, setPath] = useState<any[]>([]);
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    if (position) {
      // Añadir coordenadas actuales al camino [cite: 1443]
      setPath((prev) => [...prev, [position.latitude, position.longitude]]);
      
      // Obtener dirección real [cite: 1446]
      getAddress(position.latitude, position.longitude).then(res => {
        setAddress(res?.results[0]?.formatted || "Dirección no encontrada");
      });
    }
  }, [position]);

  return (
    <div className="map-container">
      {position ? (
        <MapContainer center={[position.latitude, position.longitude]} zoom={18} scrollWheelZoom={true}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <RecenterMap position={position} />
          <Marker position={[position.latitude, position.longitude]} />
          <Polyline positions={path} color="blue" />
        </MapContainer>
      ) : (
        <p>Esperando señal GPS...</p>
      )}
    </div>
  );
};

export default MapComponent;