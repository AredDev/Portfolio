import React from 'react';

const Accueil = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col justify-between px-20 py-10">
      {/* Main text container */}
      <div className="flex flex-col gap-y-4">
        {/* "Wear the" text */}
        <div className="text-white text-8xl font-light leading-none">
          Wear the
        </div>
        
        {/* "Future." text */}
        <div className="flex items-center">
          <span className="text-orange-500 text-8xl font-light leading-none">Future</span>
          <span className="text-orange-500 text-8xl font-light leading-none">.</span>
        </div>
      </div>

      {/* Bottom section with three text items */}
      <div className="flex justify-between items-end mt-auto pt-52 pb-10">
        <p className="text-white text-sm max-w-xs leading-tight">
          Experience the effortless flow of Financial success with cutting-edge Tools.
        </p>
        <p className="text-white text-sm leading-tight">
          Summer Portfolio 2025
        </p>
        <p className="text-white text-sm text-right leading-tight">
          The future isn't tailored it's experimented
        </p>
      </div>
    </div>
  );
};

export default Accueil;