import React, { useEffect, useState } from 'react';
import CourtList from './CourtList';
import CourtDetail from './CourtDetail';
import { Court } from '../commons/Court';
import { useAnimate } from 'framer-motion';
import SGMap from './SGMap';
import { courts } from '../data/CourtsInfo';


const courtDetailAnimate = {
  hidden: {
    transform: 'scaleY(0)', 
    pointerEvents: 'none',
  },
  active: {
    transform: 'scaleY(1)', 
    pointerEvents: 'auto',
  }
};

const courtDetailZIndex = {
  hidden: {
    zIndex: -1,
  },
  active: {
    zIndex: 50,
  }
};

const courtDetailTransitions = {
  type: 'spring' as const, // has to add this "as const" otherwise gives type error
  duration: 1,
} 

const App: React.FC = () => {
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const animateCourtDetail = async () => {
      if (selectedCourt) {
        animate('#court-detail-container', courtDetailAnimate.active, courtDetailTransitions);
        animate('#court-detail-container', courtDetailZIndex.active);
      } else {
        await animate('#court-detail-container', courtDetailAnimate.hidden, courtDetailTransitions);
        if (selectedCourt) { // allow users to click on another court while the current court is exiting
          animate('#court-detail-container', courtDetailZIndex.hidden).complete(); //set the z index to -1 after the exit animation
        }
      }
    };
    animateCourtDetail();
  }, [selectedCourt]);

  const handleCourtSelect = (court: Court) => {
    setSelectedCourt(court);
  };

  const handleBack = () => {
    setSelectedCourt(null);
  };

  return (
    <div className="min-h-screen bg-gray-100" ref={scope}>
      <div className="fixed top-0 left-0 right-0 h-48 z-10 bg-gray-100">
        <SGMap courts={courts} selectedCourt={selectedCourt} handleCourtSelect={handleCourtSelect} />
      </div>
      <div className='pt-48 z-10'>
        <CourtList courts={courts} onCourtSelect={handleCourtSelect} />
      </div>
      <div
        className="fixed inset-x-4 top-48 bottom-0 bg-white shadow-lg p-4 overflow-y-auto z-50 opacity-100"
        id='court-detail-container'
        style={{ transformOrigin: 'bottom' }} // Set transformOrigin directly in the style
      >
        <CourtDetail court={selectedCourt} onBack={handleBack} />
      </div>
    </div>
  );
};

export default App;