
import React, { useState } from 'react';
import { MessageType, Speaker } from '../types';
import { RANDOM_SPEAKERS } from '../constants';

interface InputFormProps {
  onSendMessage: (content: string, type: MessageType, speaker: Speaker) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSendMessage }) => {
  const [content, setContent] = useState('');
  const [type, setType] = useState<MessageType>('sent');
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker>(RANDOM_SPEAKERS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSendMessage(content, type, selectedSpeaker);
    setContent('');
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
      <form onSubmit={handleSubmit} className="space-y-3 max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Message Type Selector */}
            <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-lg border border-gray-200">
              <button
                type="button"
                onClick={() => setType('received')}
                className={`px-4 py-1.5 text-xs rounded-md transition-all ${type === 'received' ? 'bg-white shadow-sm text-blue-600 font-bold' : 'text-gray-500'}`}
              >
                回复消息
              </button>
              <button
                type="button"
                onClick={() => setType('sent')}
                className={`px-4 py-1.5 text-xs rounded-md transition-all ${type === 'sent' ? 'bg-white shadow-sm text-blue-600 font-bold' : 'text-gray-500'}`}
              >
                输入消息
              </button>
            </div>

            {/* Speaker Selector */}
            <div className="flex items-center space-x-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">发言人:</label>
              <select
                value={selectedSpeaker.id}
                onChange={(e) => {
                  const speaker = RANDOM_SPEAKERS.find(s => s.id === e.target.value);
                  if (speaker) setSelectedSpeaker(speaker);
                }}
                className="bg-gray-50 border border-gray-200 text-gray-800 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 outline-none font-medium cursor-pointer"
              >
                {RANDOM_SPEAKERS.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Text Input and Send */}
        <div className="flex items-end space-x-3">
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="在这里输入你想构造的消息内容..."
              rows={2}
              className="block w-full p-3 text-sm text-gray-900 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 resize-none outline-none transition-all placeholder:text-gray-400"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
          </div>
          <button
            type="submit"
            disabled={!content.trim()}
            className="inline-flex items-center justify-center h-[54px] w-[54px] text-white bg-blue-600 rounded-xl hover:bg-blue-700 active:scale-95 focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed shadow-md shadow-blue-200"
          >
            <svg className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
