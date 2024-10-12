import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Court } from '../commons/Court';

type SGMapProps = {
  courts: Court[];
  selectedCourt: Court | null;
  handleCourtSelect: (court: Court) => void;
};

const SGMap: React.FC<SGMapProps> = ({ courts, selectedCourt, handleCourtSelect }) => {
  return (
    <MapContainer center={[1.3521, 103.8198] as [number, number]} zoom={11} className="h-full w-full relative z-0">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {courts.map(court => (
        <Marker
          key={court.id}
          position={court.position}
          eventHandlers={{ click: () => handleCourtSelect(court) }}
        />
      ))}
      <MapUpdater selectedCourt={selectedCourt} />
    </MapContainer>
  );
};

type MapUpdaterProps = {
  selectedCourt: Court | null;
};

const MapUpdater: React.FC<MapUpdaterProps> = ({ selectedCourt }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedCourt) {
      map.flyTo(selectedCourt.position, 15, {
        duration: 1.5
      });
    } else {
      map.flyTo([1.3521, 103.8198], 11, {
        duration: 1.5
      });
    }
  }, [selectedCourt, map]);

  return null;
};

export default SGMap;