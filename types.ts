
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

export enum MessageMode {
  NORMAL = '普通模式',
  SECRET = '加密模式',
  BUSINESS = '商务模式',
  EMOJI = '表情模式'
}
