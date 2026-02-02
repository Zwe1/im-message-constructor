
import React, { useState } from 'react';
import { MessageType, Speaker } from '../types';
import { RANDOM_SPEAKERS } from '../constants';
import styles from './InputForm.module.less';

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
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.innerForm}>
        <div className={styles.controlsRow}>
          <div className={styles.typeSelector}>
            <button
              type="button"
              onClick={() => setType('received')}
              className={type === 'received' ? styles.active : ''}
            >
              回复消息
            </button>
            <button
              type="button"
              onClick={() => setType('sent')}
              className={type === 'sent' ? styles.active : ''}
            >
              输入消息
            </button>
          </div>

          <div className={styles.speakerSelector}>
            <label>发言人:</label>
            <select
              value={selectedSpeaker.id}
              onChange={(e) => {
                const speaker = RANDOM_SPEAKERS.find(s => s.id === e.target.value);
                if (speaker) setSelectedSpeaker(speaker);
              }}
            >
              {RANDOM_SPEAKERS.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.inputArea}>
          <div className={styles.textAreaWrapper}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="在这里输入你想构造的消息内容..."
              rows={2}
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
            className={styles.btnSubmit}
          >
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
