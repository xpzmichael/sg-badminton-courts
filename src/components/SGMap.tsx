import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Court } from '../commons/Court';

// Import the default marker images
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import markerRetina from 'leaflet/dist/images/marker-icon-2x.png';

// Set the default icon
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconRetinaUrl: markerRetina,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

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