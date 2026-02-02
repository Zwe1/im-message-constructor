
import React from 'react';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isSent = message.type === 'sent';

  return (
    <div className={`flex flex-col mb-3 ${isSent ? 'items-end' : 'items-start'}`}>
      <span className="text-[10px] text-gray-400 mb-0.5 px-1 font-medium">
        {!isSent && `${message.speakerName} · `}{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
      <div
        className={`max-w-[85%] px-3.5 py-2 rounded-[1.2rem] text-[14px] leading-relaxed break-words shadow-sm
          ${isSent 
            ? 'bg-[#007AFF] text-white rounded-tr-md' 
            : 'bg-white text-black rounded-tl-md border border-gray-100'
          }`}
      >
        {message.content}
      </div>
    </div>
  );
};

export default MessageBubble;
