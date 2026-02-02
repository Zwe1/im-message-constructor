
import React, { useState } from 'react';
import { MessageMode } from '../types';
import { MODES } from '../constants';

interface ModeSelectorProps {
  onModeChange: (mode: MessageMode) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ onModeChange }) => {
  const [selectedMode, setSelectedMode] = useState<MessageMode>(MODES[0]);

  const handleConfirm = () => {
    onModeChange(selectedMode);
    alert(`模式已切换为: ${selectedMode}`);
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h1 className="text-lg font-bold text-gray-800">IM对话构造器</h1>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative">
          <select
            value={selectedMode}
            onChange={(e) => setSelectedMode(e.target.value as MessageMode)}
            className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 pr-10 py-2 outline-none cursor-pointer hover:bg-gray-100 transition-colors"
          >
            {MODES.map(mode => (
              <option key={mode} value={mode}>{mode}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <button
          onClick={handleConfirm}
          className="bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-blue-700 active:scale-95 transition-all shadow-sm"
        >
          确认
        </button>
      </div>
    </div>
  );
};

export default ModeSelector;
