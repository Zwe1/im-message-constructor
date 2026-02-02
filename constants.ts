
import { Speaker, MessageMode } from './types';

export const RANDOM_SPEAKERS: Speaker[] = [
  { id: '1', name: '张伟', avatarColor: 'bg-blue-500' },
  { id: '2', name: '王芳', avatarColor: 'bg-pink-500' },
  { id: '3', name: '李明', avatarColor: 'bg-green-500' },
  { id: '4', name: '陈静', avatarColor: 'bg-purple-500' },
  { id: '5', name: '刘洋', avatarColor: 'bg-yellow-500' },
  { id: '6', name: '周杰', avatarColor: 'bg-indigo-500' },
];

export const MODES: MessageMode[] = [
  MessageMode.NORMAL,
  MessageMode.SECRET,
  MessageMode.BUSINESS,
  MessageMode.EMOJI
];
