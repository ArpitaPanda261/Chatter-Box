import { motion } from 'framer-motion';
import { Check, CheckCheck, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/shared/Avatar';
import type { Message, User } from '@/types';

interface MessageBubbleProps {
  message: Message;
  sender: User;
  isOwn: boolean;
  showAvatar?: boolean;
  isLast?: boolean;
}

const statusIcons = {
  sending: Clock,
  sent: Check,
  delivered: CheckCheck,
  read: CheckCheck,
};

export function MessageBubble({ 
  message, 
  sender, 
  isOwn, 
  showAvatar = true,
  isLast = false 
}: MessageBubbleProps) {
  const StatusIcon = statusIcons[message.status];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        'flex gap-3 max-w-[70%]',
        isOwn ? 'ml-auto flex-row-reverse' : 'mr-auto'
      )}
    >
      {showAvatar && !isOwn && (
        <Avatar user={sender} size="sm" className="flex-shrink-0" />
      )}
      
      <div className={cn('flex flex-col', isOwn ? 'items-end' : 'items-start')}>
        {!isOwn && showAvatar && (
          <span className="text-xs text-muted-foreground mb-1 px-3">
            {sender.username}
          </span>
        )}
        
        <div
          className={cn(
            'relative px-4 py-2 rounded-2xl max-w-full word-wrap shadow-message',
            isOwn 
              ? 'bg-chat-message-own text-primary-foreground' 
              : 'bg-chat-message-other border',
            // Adjust border radius based on message position
            isOwn 
              ? 'rounded-br-md' 
              : 'rounded-bl-md'
          )}
        >
          <p className="text-sm leading-relaxed break-words">{message.content}</p>
          
          <div className={cn(
            'flex items-center gap-1 mt-1',
            isOwn ? 'justify-end' : 'justify-start'
          )}>
            <time className={cn(
              'text-xs',
              isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
            )}>
              {message.timestamp.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </time>
            
            {isOwn && (
              <StatusIcon className={cn(
                'w-3 h-3',
                message.status === 'read' 
                  ? 'text-primary-foreground' 
                  : 'text-primary-foreground/70',
                message.status === 'sending' && 'animate-pulse'
              )} />
            )}
          </div>
        </div>
        
        {isLast && isOwn && message.status === 'read' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-muted-foreground mt-1 px-3"
          >
            Read
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}