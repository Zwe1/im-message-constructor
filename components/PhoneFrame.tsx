
import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  return (
    <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
      {/* Phone Outer Shell */}
      <div className="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[700px] w-[340px] shadow-2xl overflow-hidden flex flex-col max-h-full">
        {/* Antenna/Side buttons simulation via relative positioning if needed, but keeping it clean for now */}
        
        {/* Top Notch / Dynamic Island */}
        <div className="absolute top-0 inset-x-0 h-8 z-20 flex justify-center pointer-events-none">
          <div className="mt-2 w-24 h-6 bg-black rounded-full flex items-center justify-end px-3">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse mr-1"></div>
          </div>
        </div>

        {/* Status Bar simulation */}
        <div className="h-8 w-full bg-[#f2f2f7] flex justify-between items-end px-6 pb-1 text-[10px] font-bold text-black z-10 shrink-0">
          <span>9:41</span>
          <div className="flex space-x-1 items-center">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>
          </div>
        </div>

        {/* The "Screen" - Chat Content */}
        <div className="flex-1 w-full bg-[#f2f2f7] relative overflow-hidden flex flex-col">
          {children}
        </div>

        {/* Home Indicator */}
        <div className="h-6 w-full bg-[#f2f2f7] flex justify-center items-center shrink-0">
          <div className="w-32 h-1 bg-black rounded-full opacity-20"></div>
        </div>
      </div>
    </div>
  );
};

export default PhoneFrame;
