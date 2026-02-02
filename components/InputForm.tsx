
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
    <div className="bg-white border-t border-gray-200 p-4 shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4 max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center gap-4">
          {/* Message Type Selector */}
          <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setType('received')}
              className={`px-3 py-1 text-sm rounded-md transition-all ${type === 'received' ? 'bg-white shadow-sm text-blue-600 font-medium' : 'text-gray-500'}`}
            >
              回复消息 (左侧)
            </button>
            <button
              type="button"
              onClick={() => setType('sent')}
              className={`px-3 py-1 text-sm rounded-md transition-all ${type === 'sent' ? 'bg-white shadow-sm text-blue-600 font-medium' : 'text-gray-500'}`}
            >
              输入消息 (右侧)
            </button>
          </div>

          {/* Speaker Selector */}
          <div className="flex items-center space-x-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">发言人:</label>
            <select
              value={selectedSpeaker.id}
              onChange={(e) => {
                const speaker = RANDOM_SPEAKERS.find(s => s.id === e.target.value);
                if (speaker) setSelectedSpeaker(speaker);
              }}
              className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 outline-none"
            >
              {RANDOM_SPEAKERS.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Text Input and Send */}
        <div className="flex items-end space-x-2">
          <div className="flex-1 relative">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="输入消息内容..."
              rows={2}
              className="block w-full p-3 text-sm text-gray-900 bg-gray-50 rounded-xl border border-gray-200 focus:ring-blue-500 focus:border-blue-500 resize-none outline-none transition-all"
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
            className="inline-flex items-center justify-center p-3 text-white bg-blue-600 rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed h-12 w-12"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
