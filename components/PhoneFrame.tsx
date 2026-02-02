
import React, { useState, useEffect } from 'react';
import styles from './PhoneFrame.module.less';

interface PhoneFrameProps {
  children: React.ReactNode;
}

const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000 * 60);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  return (
    <div className={styles.container}>
      <div className={styles.phoneWrapper}>
        <div className={styles.outerShell}>
          <div className={styles.innerBezel}></div>

          <div className={styles.notchContainer}>
            <div className={styles.notch}>
              <div className={styles.pulse}></div>
            </div>
          </div>

          <div className={styles.statusBar}>
            <span className={styles.time}>{formatTime(currentTime)}</span>
            <div className={styles.indicators}>
              <div className={styles.signal}>
                <div></div><div></div><div></div><div></div>
              </div>
              <span className={styles.fiveG}>5G</span>
              <div className={styles.battery}>
                <div className={styles.level}></div>
                <div className={styles.cap}></div>
              </div>
            </div>
          </div>

          <div className={styles.screen}>
            {children}
          </div>

          <div className={styles.homeIndicatorWrapper}>
            <div className={styles.indicator}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneFrame;
