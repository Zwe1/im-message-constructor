
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Message, MessageType, Speaker, Conversation, MODES } from './types';
import { INITIAL_HISTORY } from './constants';

interface ChatState {
  messages: Message[];
  currentMode: string;
  history: Conversation[];
  activeConvId: string | undefined;
  showPublishModal: boolean;

  // Actions
  addMessage: (content: string, type: MessageType, speaker: Speaker) => void;
  setCurrentMode: (mode: string) => void;
  saveToHistory: (title: string) => void;
  newChat: () => void;
  selectConversation: (conv: Conversation) => void;
  setShowPublishModal: (show: boolean) => void;
  setHistory: (history: Conversation[]) => void;
}

export const useStore = create<ChatState>()(
  persist(
    (set, get) => ({
      messages: [],
      currentMode: MODES[0],
      history: INITIAL_HISTORY,
      activeConvId: undefined,
      showPublishModal: false,

      addMessage: (content, type, speaker) => {
        const newMessage: Message = {
          id: Date.now().toString(),
          speakerId: speaker.id,
          speakerName: speaker.name,
          content,
          type,
          timestamp: new Date(),
        };
        set((state) => ({
          messages: [...state.messages, newMessage],
        }));
      },

      setCurrentMode: (mode) => set({ currentMode: mode }),

      saveToHistory: (title) => {
        const { messages, currentMode, history } = get();
        const newConv: Conversation = {
          id: Date.now().toString(),
          title: title || `对话 ${history.length + 1}`,
          messages: [...messages],
          createdAt: new Date(),
          mode: currentMode,
          videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        };

        set((state) => ({
          history: [newConv, ...state.history],
          activeConvId: newConv.id,
          showPublishModal: true,
        }));
      },

      newChat: () => {
        set({
          messages: [],
          activeConvId: undefined,
        });
      },

      selectConversation: (conv) => {
        set({
          messages: conv.messages,
          currentMode: conv.mode,
          activeConvId: conv.id,
        });
      },

      setShowPublishModal: (show) => set({ showPublishModal: show }),
      setHistory: (history) => set({ history }),
    }),
    {
      name: 'im_constructor_storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.history = state.history.map(c => ({
            ...c,
            createdAt: new Date(c.createdAt),
            messages: c.messages.map(m => ({ ...m, timestamp: new Date(m.timestamp) }))
          }));
          state.messages = state.messages.map(m => ({ ...m, timestamp: new Date(m.timestamp) }));
        }
      },
    }
  )
);
