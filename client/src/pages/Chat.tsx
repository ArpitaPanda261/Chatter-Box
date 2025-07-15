import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatSidebar } from '@/components/layout/ChatSidebar';
import { ChatHeader } from '@/components/layout/ChatHeader';
import { MessageBubble } from '@/components/chat/MessageBubble';
import { TypingIndicator } from '@/components/chat/TypingIndicator';
import { MessageInput } from '@/components/chat/MessageInput';
import { useToast } from '@/hooks/use-toast';
import type { Chat, Message, User, ThemeMode } from '@/types';
import { MOCK_USERS, MOCK_MESSAGES } from '@/constants';
import { useAuthStore} from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants';

// Mock current user
const CURRENT_USER: User = {
  id: 'current-user',
  username: 'You',
  email: 'you@example.com',
  status: 'online',
};

// Mock chats
const MOCK_CHATS: Chat[] = [
  {
    id: '1',
    type: 'group',
    name: 'Project Team',
    participants: [CURRENT_USER, ...MOCK_USERS],
    lastMessage: MOCK_MESSAGES[MOCK_MESSAGES.length - 1],
    unreadCount: 2,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
  },
  {
    id: '2',
    type: 'direct',
    participants: [CURRENT_USER, MOCK_USERS[0]],
    lastMessage: {
      id: 'last-2',
      content: 'See you tomorrow!',
      senderId: MOCK_USERS[0].id,
      chatId: '2',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      status: 'read',
      type: 'text',
    },
    unreadCount: 0,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: '3',
    type: 'direct',
    participants: [CURRENT_USER, MOCK_USERS[1]],
    lastMessage: {
      id: 'last-3',
      content: 'Perfect, thanks!',
      senderId: CURRENT_USER.id,
      chatId: '3',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      status: 'read',
      type: 'text',
    },
    unreadCount: 1,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // 1 day ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
];

export default function Chat() {
  const [chats] = useState<Chat[]>(MOCK_CHATS);
  const [messages, setMessages] = useState<Message[]>([...MOCK_MESSAGES]);
  const [selectedChatId, setSelectedChatId] = useState<string>(MOCK_CHATS[0].id);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState<User[]>([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>('light');
  const user = useAuthStore(state => state.user);
  const navigate = useNavigate();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const selectedChat = chats.find(chat => chat.id === selectedChatId);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!user) {
      navigate(ROUTES.LOGIN);
    }
  }, [user]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleSendMessage = (content: string) => {
    if (!selectedChatId) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content,
      senderId: CURRENT_USER.id,
      chatId: selectedChatId,
      timestamp: new Date(),
      status: 'sending',
      type: 'text',
    };

    setMessages(prev => [...prev, newMessage]);

    // Simulate message delivery
    setTimeout(() => {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === newMessage.id
            ? { ...msg, status: 'delivered' as const }
            : msg
        )
      );
    }, 1000);

    // Simulate message read
    setTimeout(() => {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === newMessage.id
            ? { ...msg, status: 'read' as const }
            : msg
        )
      );
    }, 2000);

    toast({
      title: "Message sent",
      description: "Your message has been delivered.",
    });
  };

  const handleTypingStart = () => {
    setIsTyping(true);
    // TODO: Send typing indicator to other users
  };

  const handleTypingEnd = () => {
    setIsTyping(false);
    // TODO: Stop typing indicator for other users
  };

  const handleNewChat = () => {
    toast({
      title: "New Chat",
      description: "Feature coming soon!",
    });
  };

  const handleThemeToggle = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const getCurrentChatMessages = () => {
    return messages.filter(msg => msg.chatId === selectedChatId);
  };

  const getMessageSender = (senderId: string): User => {
    if (senderId === CURRENT_USER.id) return CURRENT_USER;
    return MOCK_USERS.find(user => user.id === senderId) || MOCK_USERS[0];
  };

  if (!selectedChat) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className="h-screen bg-chat-background flex overflow-hidden">
      {/* Sidebar */}
      <ChatSidebar
        chats={chats}
        currentUser={CURRENT_USER}
        selectedChatId={selectedChatId}
        onChatSelect={setSelectedChatId}
        onNewChat={handleNewChat}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        theme={theme}
        onThemeToggle={handleThemeToggle}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <ChatHeader chat={selectedChat} currentUser={CURRENT_USER} />

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {getCurrentChatMessages().map((message, index) => {
              const sender = getMessageSender(message.senderId);
              const isOwn = message.senderId === CURRENT_USER.id;
              const prevMessage = getCurrentChatMessages()[index - 1];
              const showAvatar = !prevMessage || 
                prevMessage.senderId !== message.senderId ||
                message.timestamp.getTime() - prevMessage.timestamp.getTime() > 5 * 60 * 1000; // 5 minutes

              return (
                <MessageBubble
                  key={message.id}
                  message={message}
                  sender={sender}
                  isOwn={isOwn}
                  showAvatar={showAvatar}
                  isLast={index === getCurrentChatMessages().length - 1}
                />
              );
            })}
          </AnimatePresence>

          {/* Typing Indicator */}
          <AnimatePresence>
            {typingUsers.length > 0 && (
              <TypingIndicator users={typingUsers} />
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <MessageInput
          onSendMessage={handleSendMessage}
          onTypingStart={handleTypingStart}
          onTypingEnd={handleTypingEnd}
          placeholder={`Message ${selectedChat.name || selectedChat.participants.find(p => p.id !== CURRENT_USER.id)?.username}...`}
        />
      </div>
    </div>
  );
}