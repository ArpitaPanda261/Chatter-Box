import { motion } from 'framer-motion';
import { Avatar } from '@/components/shared/Avatar';
import type { User } from '@/types';

interface TypingIndicatorProps {
  users: User[];
}

export function TypingIndicator({ users }: TypingIndicatorProps) {
  if (users.length === 0) return null;

  const displayText = users.length === 1 
    ? `${users[0].username} is typing...`
    : users.length === 2
    ? `${users[0].username} and ${users[1].username} are typing...`
    : `${users[0].username} and ${users.length - 1} others are typing...`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-center gap-3 px-4 py-2"
    >
      <Avatar user={users[0]} size="sm" />
      
      <div className="flex items-center gap-2">
        <div className="bg-muted rounded-full px-3 py-2 flex items-center gap-1">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-foreground/60 rounded-full"
                animate={{ y: [-2, 2, -2] }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>
        
        <span className="text-xs text-muted-foreground">
          {displayText}
        </span>
      </div>
    </motion.div>
  );
}