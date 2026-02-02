
import React, { useState, useCallback } from 'react';
import { Message, MessageType, Speaker, MessageMode } from './types';
import ChatList from './components/ChatList';
import InputForm from './components/InputForm';
import ModeSelector from './components/ModeSelector';
import PhoneFrame from './components/PhoneFrame';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMode, setCurrentMode] = useState<MessageMode>(MessageMode.NORMAL);

  const handleSendMessage = useCallback((content: string, type: MessageType, speaker: Speaker) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      speakerId: speaker.id,
      speakerName: speaker.name,
      content,
      type,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  }, []);

  const handleModeChange = (mode: MessageMode) => {
    setCurrentMode(mode);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header with Mode Selection */}
      <header className="shrink-0">
        <ModeSelector onModeChange={handleModeChange} />
      </header>

      {/* Main Chat Area - Wrapped in iPhone Shell */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden bg-gray-200/50">
        <PhoneFrame>
          <ChatList messages={messages} />
        </PhoneFrame>
      </main>

      {/* Footer with Message Creation Controls */}
      <footer className="shrink-0 z-20">
        <InputForm onSendMessage={handleSendMessage} />
      </footer>
    </div>
  );
};

export default App;
