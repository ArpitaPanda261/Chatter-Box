// Chat Application Constants

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  CHAT: '/chat',
  FORGOT_PASSWORD: "/forgot-password",
  SETTINGS: '/settings',
} as const;

export const MESSAGE_STATUS = {
  SENDING: 'sending',
  SENT: 'sent',
  DELIVERED: 'delivered',
  READ: 'read',
} as const;

export const USER_STATUS = {
  ONLINE: 'online',
  AWAY: 'away',
  OFFLINE: 'offline',
} as const;

export const CHAT_TYPES = {
  DIRECT: 'direct',
  GROUP: 'group',
} as const;

export const FILE_TYPES = {
  IMAGE: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  DOCUMENT: ['application/pdf', 'application/msword', 'text/plain'],
  ALL_ALLOWED: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'application/msword', 'text/plain'],
} as const;

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 250,
  SLOW: 400,
} as const;

// TODO: Replace with real API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    SIGNUP: '/api/auth/signup',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
  },
  CHAT: {
    LIST: '/api/chats',
    MESSAGES: (chatId: string) => `/api/chats/${chatId}/messages`,
    SEND: (chatId: string) => `/api/chats/${chatId}/messages`,
  },
  USER: {
    PROFILE: '/api/user/profile',
    STATUS: '/api/user/status',
  },
} as const;

// Mock data for development
export const MOCK_USERS = [
  {
    id: '1',
    username: 'Alice Johnson',
    email: 'alice@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b3e5?w=150&h=150&fit=crop&crop=face',
    status: 'online' as const,
  },
  {
    id: '2',
    username: 'Bob Smith',
    email: 'bob@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    status: 'away' as const,
  },
  {
    id: '3',
    username: 'Carol Davis',
    email: 'carol@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    status: 'offline' as const,
  },
] as const;

export const MOCK_MESSAGES = [
  {
    id: '1',
    content: 'Hey everyone! How\'s the project coming along?',
    senderId: '1',
    chatId: '1',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    status: 'read' as const,
    type: 'text' as const,
  },
  {
    id: '2',
    content: 'Going great! Just finished the authentication flow.',
    senderId: '2',
    chatId: '1',
    timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
    status: 'read' as const,
    type: 'text' as const,
  },
  {
    id: '3',
    content: 'Awesome! I\'m working on the chat interface now. Should have it ready soon.',
    senderId: 'current-user',
    chatId: '1',
    timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 minutes ago
    status: 'read' as const,
    type: 'text' as const,
  },
  {
    id: '4',
    content: 'Perfect! Can\'t wait to see it. The design looks really clean.',
    senderId: '3',
    chatId: '1',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    status: 'delivered' as const,
    type: 'text' as const,
  },
] as const;