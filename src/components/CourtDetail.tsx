// CourtDetail.tsx
import React from 'react';
import { Court, EmptyCourt } from '../commons/Court';

interface CourtDetailsProps {
  court: Court | null;
  onBack: () => void;
}

const CourtDetail: React.FC<CourtDetailsProps> = ({ court, onBack }) => {
  const displayCourt = court || new EmptyCourt();

  // Extract latitude and longitude from position
  const [latitude, longitude] = displayCourt.position;

  // Construct Google Maps URL with latitude and longitude
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  // Function to handle the click event
  const handleOpenInGoogleMaps = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = googleMapsUrl;
    } else {
      window.open(googleMapsUrl, '_blank');
    }
  };

  return (
    <div className="p-0 m-0 w-full h-full">
      <button onClick={onBack} className="mb-4 text-blue-500">Go back</button>
      <h2 className="text-2xl font-bold">{displayCourt.name}</h2>
      <p className="text-lg">{displayCourt.location}</p>
      <img src={displayCourt.img} alt={displayCourt.name} className="w-full h-64 object-cover mt-4 mb-4" />
      <p className="mt-2">
        Price: ${displayCourt.pricePeak} (peak) / ${displayCourt.priceNonPeak} (non-peak)
      </p>
      {
        displayCourt.bookingLink ? (
          <a href={displayCourt.bookingLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 mt-4 block">
            Book this court
          </a>
        ) : (
          <span className="text-gray-500 mt-4 block">Offline book only</span>
        )
      }
      <button onClick={handleOpenInGoogleMaps} className="text-blue-500 mt-4 block">
        Open in Google Map
      </button>
    </div>
  );
};

export default CourtDetail;