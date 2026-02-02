
import React from 'react';
import { Conversation } from '../types';
import styles from './HistorySidebar.module.less';

interface HistorySidebarProps {
  history: Conversation[];
  onSelect: (conv: Conversation) => void;
  onNewChat: () => void;
  activeId?: string;
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({ history, onSelect, onNewChat, activeId }) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <h2>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          历史记录
        </h2>
      </div>

      <div className={styles.historyList}>
        {history.length === 0 ? (
          <div className={styles.emptyState}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p>暂无构造历史</p>
          </div>
        ) : (
          history.map((conv) => (
            <div 
              key={conv.id}
              onClick={() => onSelect(conv)}
              className={`${styles.historyItem} ${activeId === conv.id ? styles.active : ''}`}
            >
              <span className={styles.title}>
                {conv.title || '未命名对话'}
              </span>
              <div className={styles.meta}>
                <span>{conv.messages.length} 条消息</span>
                <span>{new Date(conv.createdAt).toLocaleDateString()}</span>
              </div>
              <div className={styles.tag}>
                {conv.mode}
              </div>
            </div>
          ))
        )}
      </div>

      <div className={styles.footer}>
        <button onClick={onNewChat} className={styles.btnNewChat}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>新建记录</span>
        </button>
      </div>
    </div>
  );
};

export default HistorySidebar;
