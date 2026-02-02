
import React, { useState, useCallback, useEffect } from 'react';
import { Message, MessageType, Speaker, Conversation, MODES } from './types';
import ChatList from './components/ChatList';
import InputForm from './components/InputForm';
import ModeSelector from './components/ModeSelector';
import PhoneFrame from './components/PhoneFrame';
import HistorySidebar from './components/HistorySidebar';
import { INITIAL_HISTORY } from './constants';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMode, setCurrentMode] = useState<string>(MODES[0]);
  const [history, setHistory] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | undefined>();
  const [showPublishModal, setShowPublishModal] = useState(false);

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('im_constructor_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Date objects need re-parsing
        const formatted = parsed.map((c: any) => ({
          ...c,
          createdAt: new Date(c.createdAt),
          messages: c.messages.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) }))
        }));
        setHistory(formatted);
      } catch (e) {
        console.error("Failed to parse history", e);
        setHistory(INITIAL_HISTORY);
      }
    } else {
      // Use mock history if first time visit
      setHistory(INITIAL_HISTORY);
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('im_constructor_history', JSON.stringify(history));
  }, [history]);

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

  const handleModeChange = (mode: string) => {
    setCurrentMode(mode);
  };

  const handleSaveToHistory = () => {
    if (messages.length === 0) {
      alert("请先构造一些消息再生成视频。");
      return;
    }

    const title = prompt("请输入对话名称:", `新对话 ${new Date().toLocaleTimeString()}`);
    if (title === null) return;

    const newConv: Conversation = {
      id: Date.now().toString(),
      title: title || `对话 ${history.length + 1}`,
      messages: [...messages],
      createdAt: new Date(),
      mode: currentMode,
      // In a real app, this would be null until generated. 
      // For this demo, we'll assign the mock URL.
      videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    };

    setHistory(prev => [newConv, ...prev]);
    setActiveConvId(newConv.id);
    setShowPublishModal(true);
  };

  const handleNewChat = () => {
    if (messages.length > 0 && !activeConvId && !confirm("确定要开启新对话吗？当前内容将丢失（除非已保存到历史）。")) {
      return;
    }
    setMessages([]);
    setActiveConvId(undefined);
  };

  const handleSelectConversation = (conv: Conversation) => {
    setMessages(conv.messages);
    setCurrentMode(conv.mode);
    setActiveConvId(conv.id);
  };

  const activeConversation = history.find(c => c.id === activeConvId);

  const handleDownloadVideo = async () => {
    if (!activeConversation?.videoUrl) {
      alert("该对话暂无可用视频资源。");
      return;
    }

    try {
      const response = await fetch(activeConversation.videoUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${activeConversation.title || 'video'}.mp4`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed", error);
      alert("视频下载失败，请稍后重试。");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden text-gray-900">
      {/* Left Side: History Sidebar */}
      <HistorySidebar 
        history={history} 
        onSelect={handleSelectConversation}
        onNewChat={handleNewChat}
        activeId={activeConvId}
      />

      {/* Right Side: Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-gray-50">
        <header className="shrink-0 z-10">
          <ModeSelector onModeChange={handleModeChange} />
        </header>

        <div className="bg-white/50 border-b border-gray-200 px-6 py-2 flex items-center justify-between shrink-0">
          <div className="text-xs font-medium text-gray-500">
            {activeConvId ? `查看历史记录 (只读)` : `正在构造：${currentMode}`}
          </div>
          <div className="flex space-x-2">
            {!activeConvId ? (
              <button 
                onClick={handleSaveToHistory}
                className="text-[11px] px-6 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 active:scale-[0.98] transition-all font-semibold shadow-sm"
              >
                生成视频
              </button>
            ) : (
              activeConversation?.videoUrl && (
                <button 
                  onClick={handleDownloadVideo}
                  className="text-[11px] px-4 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 active:scale-[0.98] transition-all font-semibold shadow-sm flex items-center space-x-1"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>下载视频</span>
                </button>
              )
            )}
          </div>
        </div>

        <main className="flex-1 flex flex-col min-h-0 overflow-hidden bg-gray-200/50">
          <PhoneFrame>
            <ChatList messages={messages} />
          </PhoneFrame>
        </main>

        <footer className="shrink-0 z-20">
          {activeConvId ? (
            <div className="bg-white border-t border-gray-200 p-6 text-center text-sm text-gray-400 font-medium italic">
              当前为历史记录查看模式，不支持发送消息。
              <button 
                onClick={handleNewChat}
                className="ml-2 text-blue-600 hover:underline not-italic font-bold"
              >
                点击新建记录
              </button>
            </div>
          ) : (
            <InputForm onSendMessage={handleSendMessage} />
          )}
        </footer>
      </div>

      {/* Publish Confirmation Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">视频生成申请已提交</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                内容审核通过后，将生成视频
              </p>
            </div>
            <div className="bg-gray-50 p-4 border-t border-gray-100">
              <button
                onClick={() => setShowPublishModal(false)}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors active:scale-[0.98]"
              >
                确认
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
