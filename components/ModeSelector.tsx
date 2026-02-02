
import React, { useState, useRef, useEffect } from 'react';
import { MODES } from '../types';

interface ModeSelectorProps {
  onModeChange: (mode: string) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ onModeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMode, setSelectedMode] = useState(MODES[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredModes = MODES.filter(mode =>
    mode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (mode: string) => {
    setSelectedMode(mode);
    setSearchTerm('');
    setIsOpen(false);
    onModeChange(mode);
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h1 className="text-lg font-bold text-gray-800">对话构造器</h1>
      </div>
      
      <div className="relative w-64" ref={dropdownRef}>
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className={`group flex items-center justify-between bg-white border ${isOpen ? 'border-blue-500 ring-2 ring-blue-50' : 'border-gray-300'} text-gray-900 text-sm rounded-full pl-4 pr-3 py-2 cursor-pointer transition-all hover:bg-gray-50`}
        >
          <span className="truncate flex-1 font-medium">{isOpen ? (searchTerm || "搜索作品...") : selectedMode}</span>
          <svg className={`w-4 h-4 ml-2 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {isOpen && (
          <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
            <div className="p-2 border-b border-gray-100">
              <input
                autoFocus
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="搜索作品..."
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="max-h-60 overflow-y-auto custom-scrollbar">
              {filteredModes.length > 0 ? (
                filteredModes.map((mode) => (
                  <div
                    key={mode}
                    onClick={() => handleSelect(mode)}
                    className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                      selectedMode === mode ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {mode}
                  </div>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-xs text-gray-400">未找到匹配作品</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModeSelector;
