import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Settings, Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/shared/Avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Chat, User, ThemeMode } from "@/types";
import { MOCK_USERS } from "@/constants";
import { LogoutButton } from "../shared/LogoutButton";

interface ChatSidebarProps {
  chats: Chat[];
  currentUser: User;
  selectedChatId?: string;
  onChatSelect: (chatId: string) => void;
  onNewChat: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  theme: ThemeMode;
  onThemeToggle: () => void;
}

export function ChatSidebar({
  chats,
  currentUser,
  selectedChatId,
  onChatSelect,
  onNewChat,
  isCollapsed,
  onToggleCollapse,
  theme,
  onThemeToggle,
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = chats.filter((chat) => {
    const chatName =
      chat.name ||
      chat.participants
        .filter((p) => p.id !== currentUser.id)
        .map((p) => p.username)
        .join(", ");

    return chatName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const formatLastMessage = (chat: Chat) => {
    if (!chat.lastMessage) return "No messages yet";

    const isOwn = chat.lastMessage.senderId === currentUser.id;
    const prefix = isOwn ? "You: " : "";

    return `${prefix}${chat.lastMessage.content}`;
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 7) {
      return date.toLocaleDateString();
    } else if (days > 0) {
      return `${days}d ago`;
    } else {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  const getChatDisplayName = (chat: Chat) => {
    if (chat.name) return chat.name;

    return chat.participants
      .filter((p) => p.id !== currentUser.id)
      .map((p) => p.username)
      .join(", ");
  };

  const getChatParticipant = (chat: Chat) => {
    return (
      chat.participants.find((p) => p.id !== currentUser.id) || MOCK_USERS[0]
    );
  };

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className={cn(
        "bg-chat-sidebar border-r border-border flex flex-col h-full transition-all duration-300",
        isCollapsed ? "w-16" : "w-80"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent"
            >
              Messages
            </motion.h1>
          )}

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onThemeToggle}
              className="p-2"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className="p-2"
            >
              {isCollapsed ? (
                <Menu className="w-4 h-4" />
              ) : (
                <X className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Search */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <Button
          onClick={onNewChat}
          className={cn(
            "bg-gradient-primary hover:opacity-90 transition-opacity",
            isCollapsed ? "w-8 h-8 p-0" : "w-full"
          )}
        >
          <Plus className="w-4 h-4" />
          {!isCollapsed && <span className="ml-2">New Chat</span>}
        </Button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence>
          {filteredChats.map((chat, index) => {
            const participant = getChatParticipant(chat);
            const isSelected = chat.id === selectedChatId;

            return (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "relative cursor-pointer border-b border-border/50 transition-colors",
                  isSelected
                    ? "bg-primary/10 border-l-4 border-l-primary"
                    : "hover:bg-muted/50"
                )}
                onClick={() => onChatSelect(chat.id)}
              >
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar
                      user={participant}
                      size="md"
                      showStatus={!isCollapsed}
                    />

                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.div
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          className="flex-1 min-w-0"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium truncate">
                              {getChatDisplayName(chat)}
                            </h3>
                            {chat.lastMessage && (
                              <time className="text-xs text-muted-foreground">
                                {formatTime(chat.lastMessage.timestamp)}
                              </time>
                            )}
                          </div>

                          <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground truncate">
                              {formatLastMessage(chat)}
                            </p>
                            {chat.unreadCount > 0 && (
                              <Badge className="ml-2 bg-primary text-primary-foreground min-w-[20px] h-5 text-xs">
                                {chat.unreadCount > 99
                                  ? "99+"
                                  : chat.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <Avatar user={currentUser} size="md" showStatus />

          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="flex-1 min-w-0"
              >
                <h3 className="font-medium truncate">{currentUser.username}</h3>
                <p className="text-sm text-muted-foreground capitalize">
                  {currentUser.status}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-2">
            <LogoutButton />
            <Button variant="ghost" size="sm" className="p-2">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
