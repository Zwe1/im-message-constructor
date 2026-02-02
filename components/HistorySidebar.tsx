
import React from 'react';
import { Conversation } from '../types';

interface HistorySidebarProps {
  history: Conversation[];
  onSelect: (conv: Conversation) => void;
  onNewChat: () => void;
  activeId?: string;
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({ history, onSelect, onNewChat, activeId }) => {
  return (
    <div className="w-64 h-full bg-white border-r border-gray-200 flex flex-col shrink-0">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <h2 className="text-sm font-bold text-gray-700 flex items-center">
          <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          历史记录
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 opacity-30 mt-10">
            <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-[10px]">暂无构造历史</p>
          </div>
        ) : (
          history.map((conv) => (
            <div 
              key={conv.id}
              onClick={() => onSelect(conv)}
              className={`group relative p-3 rounded-xl border cursor-pointer transition-all hover:shadow-md ${
                activeId === conv.id 
                  ? 'bg-blue-50 border-blue-200 ring-1 ring-blue-100' 
                  : 'bg-white border-gray-100 hover:border-gray-200'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`text-[11px] font-bold truncate ${activeId === conv.id ? 'text-blue-700' : 'text-gray-800'}`}>
                  {conv.title || '未命名对话'}
                </span>
              </div>
              <div className="flex justify-between items-center text-[10px] text-gray-500">
                <span>{conv.messages.length} 条消息</span>
                <span>{new Date(conv.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="mt-1 flex items-center">
                <span className="text-[9px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded-md font-medium">
                  {conv.mode}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-gray-100 bg-white">
        <button 
          onClick={onNewChat}
          className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] group"
        >
          <svg className="w-4 h-4 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span className="text-sm font-semibold">新建记录</span>
        </button>
      </div>
    </div>
  );
};

export default HistorySidebar;
