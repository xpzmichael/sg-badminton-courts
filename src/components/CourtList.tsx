import React from 'react';
import { motion } from 'framer-motion';
import { Court } from '../commons/Court';

interface CourtListProps {
  courts: Court[];
  onCourtSelect: (court: Court) => void;
}

const CourtList: React.FC<CourtListProps> = ({ courts, onCourtSelect }) => {
  return (
    <div className="p-4 space-y-4">
      {courts.map((court) => (
        <motion.div
          key={court.id}
          className="flex flex-col text-center justify-center bg-gray-300 border-black shadow p-4 rounded-lg cursor-pointer h-32 w-full"
          onClick={() => onCourtSelect(court)}
          id={"court-" + court.id}
          whileTap={{ scale: 0.9 }}
        >
          <div>
            <h2 className="font-bold text-lg">{court.name}</h2>
            <p>{court.location}</p>
          </div>
          <div className="text-center">
            <p className="text-green-600 font-bold">${court.pricePeak}/{court.priceNonPeak}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CourtList;