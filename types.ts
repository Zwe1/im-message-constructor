
export type MessageType = 'sent' | 'received';

export interface Speaker {
  id: string;
  name: string;
  avatarColor: string;
}

export interface Message {
  id: string;
  speakerId: string;
  speakerName: string;
  content: string;
  type: MessageType;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  mode: string;
  videoUrl?: string; // Optional URL for the generated video
}

export const MODES = [
  "《霸道总裁爱上我》",
  "《修真归来：我在都市当神医》",
  "《重生之我是大文豪》",
  "《冷面王爷的小娇妃》",
  "《全球高武：我有一卷进化经》",
  "《诡秘之主：旧日支配者》",
  "《剑破苍穹：万古第一帝》",
  "《斗破苍穹：三年之约》",
  "《凡人修仙传：仙界篇》",
  "《大奉打更人》"
];

export enum MessageMode {
  NORMAL = '普通模式',
  SECRET = '加密模式',
  BUSINESS = '商务模式',
  EMOJI = '表情模式'
}
