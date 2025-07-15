import { motion } from 'framer-motion';
import { Phone, Video, MoreVertical, Search, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/shared/Avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Chat, User } from '@/types';

interface ChatHeaderProps {
  chat: Chat;
  currentUser: User;
  onToggleSidebar?: () => void;
}

export function ChatHeader({ chat, currentUser }: ChatHeaderProps) {
  const otherParticipants = chat.participants.filter(p => p.id !== currentUser.id);
  const primaryParticipant = otherParticipants[0];
  
  const getChatTitle = () => {
    if (chat.name) return chat.name;
    return otherParticipants.map(p => p.username).join(', ');
  };

  const getSubtitle = () => {
    if (chat.type === 'group') {
      return `${chat.participants.length} members`;
    }
    
    if (primaryParticipant) {
      const status = primaryParticipant.status;
      if (status === 'online') return 'Active now';
      if (status === 'away') return 'Away';
      return `Last seen ${primaryParticipant.lastSeen?.toLocaleDateString() || 'recently'}`;
    }
    
    return '';
  };

  const getStatusColor = () => {
    if (!primaryParticipant || chat.type === 'group') return 'offline';
    return primaryParticipant.status;
  };

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-background border-b border-border p-4 flex items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          {chat.type === 'group' ? (
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
              {chat.participants.length}
            </div>
          ) : (
            <Avatar 
              user={primaryParticipant || otherParticipants[0]} 
              size="md" 
              showStatus 
            />
          )}
          
          {/* Online indicator with pulse animation */}
          {primaryParticipant?.status === 'online' && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-chat-online rounded-full border-2 border-background animate-pulse-ring" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="font-semibold truncate text-foreground">
            {getChatTitle()}
          </h2>
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">
              {getSubtitle()}
            </p>
            {chat.type === 'group' && (
              <Badge variant="secondary" className="text-xs">
                Group
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" className="p-2">
          <Search className="w-4 h-4" />
        </Button>
        
        <Button variant="ghost" size="sm" className="p-2">
          <Phone className="w-4 h-4" />
        </Button>
        
        <Button variant="ghost" size="sm" className="p-2">
          <Video className="w-4 h-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="p-2">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <Info className="w-4 h-4 mr-2" />
              Chat Info
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Search className="w-4 h-4 mr-2" />
              Search Messages
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Delete Chat
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  );
}