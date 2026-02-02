
import React, { useState, useRef, useEffect } from 'react';
import { MODES } from '../types';
import styles from './ModeSelector.module.less';

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
    <div className={styles.container}>
      <div className={styles.brand}>
        <div className={styles.logo}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h1>对话构造器</h1>
      </div>
      
      <div className={styles.dropdownWrapper} ref={dropdownRef}>
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className={`${styles.trigger} ${isOpen ? styles.isOpen : ''}`}
        >
          <span className={styles.label}>{isOpen ? (searchTerm || "搜索作品...") : selectedMode}</span>
          <svg className={`${styles.arrow} ${isOpen ? styles.isOpen : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {isOpen && (
          <div className={styles.dropdownMenu}>
            <div className={styles.searchBox}>
              <input
                autoFocus
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="搜索作品..."
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className={styles.menuList}>
              {filteredModes.length > 0 ? (
                filteredModes.map((mode) => (
                  <div
                    key={mode}
                    onClick={() => handleSelect(mode)}
                    className={`${styles.menuItem} ${selectedMode === mode ? styles.selected : ''}`}
                  >
                    {mode}
                  </div>
                ))
              ) : (
                <div className={styles.noResults}>未找到匹配作品</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModeSelector;
