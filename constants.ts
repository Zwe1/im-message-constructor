
import { Speaker, Conversation, MODES } from './types';

export const RANDOM_SPEAKERS: Speaker[] = [
  { id: 'narrator', name: '旁白', avatarColor: 'bg-gray-500' },
  { id: 'protagonist', name: '林枫', avatarColor: 'bg-blue-600' },
  { id: 'heroine', name: '苏婉清', avatarColor: 'bg-pink-500' },
  { id: 'ceo', name: '顾北渊', avatarColor: 'bg-slate-800' },
  { id: 'immortal', name: '叶辰', avatarColor: 'bg-purple-600' },
  { id: 'villain', name: '楚瑶', avatarColor: 'bg-red-500' },
];

// Mock video URL for demonstration
const MOCK_VIDEO_URL = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export const INITIAL_HISTORY: Conversation[] = [
  {
    id: 'mock-1',
    title: '深夜的总裁办公室',
    mode: MODES[0], // 《霸道总裁爱上我》
    createdAt: new Date(Date.now() - 3600000 * 24), // 1 day ago
    videoUrl: MOCK_VIDEO_URL,
    messages: [
      {
        id: 'm1-1',
        speakerId: 'heroine',
        speakerName: '苏婉清',
        content: '你到底什么时候才肯放我走？',
        type: 'received',
        timestamp: new Date(Date.now() - 3600000 * 24.1)
      },
      {
        id: 'm1-2',
        speakerId: 'ceo',
        speakerName: '顾北渊',
        content: '走？没有我的允许，你哪儿也别想去。',
        type: 'sent',
        timestamp: new Date(Date.now() - 3600000 * 24.05)
      },
      {
        id: 'm1-3',
        speakerId: 'narrator',
        speakerName: '旁白',
        content: '办公室的空气瞬间凝固，男人深邃的眼眸中闪烁着危险的光芒。',
        type: 'received',
        timestamp: new Date(Date.now() - 3600000 * 24.01)
      }
    ]
  },
  {
    id: 'mock-2',
    title: '禁忌的海边契约',
    mode: MODES[5], // 《诡秘之主：旧日支配者》
    createdAt: new Date(Date.now() - 3600000 * 12), // 12 hours ago
    videoUrl: MOCK_VIDEO_URL,
    messages: [
      {
        id: 'm2-1',
        speakerId: 'protagonist',
        speakerName: '林枫',
        content: '只要献祭这个，我就能获得力量吗？',
        type: 'received',
        timestamp: new Date(Date.now() - 3600000 * 12.1)
      },
      {
        id: 'm2-2',
        speakerId: 'immortal',
        speakerName: '叶辰',
        content: '力量总是有代价的。你准备好失去灵魂了吗？',
        type: 'sent',
        timestamp: new Date(Date.now() - 3600000 * 12.05)
      }
    ]
  },
  {
    id: 'mock-3',
    title: '打更人的巡逻日常',
    mode: MODES[9], // 《大奉打更人》
    createdAt: new Date(Date.now() - 3600000 * 2), // 2 hours ago
    videoUrl: MOCK_VIDEO_URL,
    messages: [
      {
        id: 'm3-1',
        speakerId: 'narrator',
        speakerName: '旁白',
        content: '月黑风高，京城的长街上一片寂静，唯有沉重的脚步声。',
        type: 'sent',
        timestamp: new Date(Date.now() - 3600000 * 2.1)
      },
      {
        id: 'm3-2',
        speakerId: 'villain',
        speakerName: '楚瑶',
        content: '官爷，这么晚了还在忙呢，喝口茶不？',
        type: 'received',
        timestamp: new Date(Date.now() - 3600000 * 2.05)
      },
      {
        id: 'm3-3',
        speakerId: 'protagonist',
        speakerName: '林枫',
        content: '公务在身，茶就不喝了，倒是你要注意门户。',
        type: 'sent',
        timestamp: new Date(Date.now() - 3600000 * 2.01)
      }
    ]
  }
];
