
import React from 'react';
import { useStore } from './store';
import ChatList from './components/ChatList';
import InputForm from './components/InputForm';
import ModeSelector from './components/ModeSelector';
import PhoneFrame from './components/PhoneFrame';
import HistorySidebar from './components/HistorySidebar';
import styles from './App.module.less';

const App: React.FC = () => {
  const {
    messages,
    currentMode,
    history,
    activeConvId,
    showPublishModal,
    addMessage,
    setCurrentMode,
    saveToHistory,
    newChat,
    selectConversation,
    setShowPublishModal,
  } = useStore();

  const handleSaveToHistory = () => {
    if (messages.length === 0) {
      alert("请先构造一些消息再生成视频。");
      return;
    }

    const title = prompt("请输入对话名称:", `新对话 ${new Date().toLocaleTimeString()}`);
    if (title === null) return;

    saveToHistory(title);
  };

  const handleNewChat = () => {
    if (messages.length > 0 && !activeConvId && !confirm("确定要开启新对话吗？当前内容将丢失（除非已保存到历史）。")) {
      return;
    }
    newChat();
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
    <div className={styles.appContainer}>
      <HistorySidebar 
        history={history} 
        onSelect={selectConversation}
        onNewChat={handleNewChat}
        activeId={activeConvId}
      />

      <div className={styles.mainArea}>
        <header className={styles.headerBar}>
          <ModeSelector onModeChange={setCurrentMode} />
        </header>

        <div className={styles.subHeader}>
          <div className={styles.modeInfo}>
            {activeConvId ? `查看历史记录 (只读)` : `正在构造：${currentMode}`}
          </div>
          <div className={styles.buttonGroup}>
            {!activeConvId ? (
              <button onClick={handleSaveToHistory} className={styles.btnGenerate}>
                生成视频
              </button>
            ) : (
              activeConversation?.videoUrl && (
                <button onClick={handleDownloadVideo} className={styles.btnDownload}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>下载视频</span>
                </button>
              )
            )}
          </div>
        </div>

        <main className={styles.contentBody}>
          <PhoneFrame>
            <ChatList messages={messages} />
          </PhoneFrame>
        </main>

        <footer className={styles.footer}>
          {activeConvId ? (
            <div className={styles.readOnlyBanner}>
              当前为历史记录查看模式，不支持发送消息。
              <span onClick={handleNewChat} className={styles.newChatLink}>
                点击新建记录
              </span>
            </div>
          ) : (
            <InputForm onSendMessage={addMessage} />
          )}
        </footer>
      </div>

      {showPublishModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalBody}>
              <div className={styles.iconWrapper}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3>视频生成申请已提交</h3>
              <p>内容审核通过后，将生成视频</p>
            </div>
            <div className={styles.modalFooter}>
              <button onClick={() => setShowPublishModal(false)} className={styles.btnConfirm}>
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
