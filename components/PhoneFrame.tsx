
import React, { useState, useEffect } from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000 * 60); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 overflow-hidden select-none">
      {/* Phone Container */}
      <div className="relative mx-auto">
        {/* Phone Outer Shell - Thinner border (4px) and refined shadow */}
        <div className="relative border-gray-900 bg-gray-900 border-[4px] rounded-[3.5rem] h-[720px] w-[340px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col max-h-full">
          
          {/* Internal Screen Border (Thin Inner Bezel for depth) */}
          <div className="absolute inset-0 border-[2px] border-black rounded-[3.2rem] pointer-events-none z-30"></div>

          {/* Top Notch / Dynamic Island - Clean and proportional */}
          <div className="absolute top-0 inset-x-0 h-10 z-40 flex justify-center pointer-events-none">
            <div className="mt-3 w-24 h-6 bg-black rounded-full flex items-center justify-end px-3 border border-white/5">
              <div className="w-1 h-1 bg-blue-500/60 rounded-full animate-pulse blur-[0.5px]"></div>
            </div>
          </div>

          {/* Status Bar simulation - Minimalist iOS styling */}
          <div className="h-11 w-full bg-[#f2f2f7] flex justify-between items-end px-8 pb-1.5 text-[11px] font-semibold text-black z-10 shrink-0">
            <span className="tracking-tight">{formatTime(currentTime)}</span>
            <div className="flex space-x-1.5 items-center">
              <div className="flex space-x-0.5">
                <div className="w-0.5 h-1.5 bg-black rounded-full"></div>
                <div className="w-0.5 h-2 bg-black rounded-full"></div>
                <div className="w-0.5 h-2.5 bg-black rounded-full"></div>
                <div className="w-0.5 h-3 bg-black/20 rounded-full"></div>
              </div>
              <span className="text-[10px]">5G</span>
              <div className="w-5 h-2.5 border border-black/30 rounded-[2px] relative flex items-center p-[1px]">
                <div className="h-full w-[80%] bg-black rounded-[1px]"></div>
                <div className="absolute -right-1 w-0.5 h-1 bg-black/30 rounded-r-full"></div>
              </div>
            </div>
          </div>

          {/* The "Screen" - Chat Content Area */}
          <div className="flex-1 w-full bg-[#f2f2f7] relative overflow-hidden flex flex-col z-0">
            {children}
          </div>

          {/* Home Indicator Container */}
          <div className="h-6 w-full bg-[#f2f2f7] flex justify-center items-center shrink-0 z-10">
            <div className="w-28 h-1 bg-black rounded-full opacity-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneFrame;
