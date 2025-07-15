import { cn } from '@/lib/utils';
import type { User } from '@/types';

interface AvatarProps {
  user: Pick<User, 'username' | 'avatar' | 'status'>;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showStatus?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
};

const statusClasses = {
  online: 'bg-chat-online',
  away: 'bg-chat-away',
  offline: 'bg-chat-offline',
};

const statusSizes = {
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3 h-3',
  xl: 'w-4 h-4',
};

export function Avatar({ user, size = 'md', showStatus = false, className }: AvatarProps) {
  const initials = user.username
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={cn('relative inline-flex', className)}>
      <div className={cn(
        'rounded-full bg-gradient-primary flex items-center justify-center font-medium text-primary-foreground overflow-hidden',
        sizeClasses[size]
      )}>
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.username}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      
      {showStatus && (
        <div className={cn(
          'absolute -bottom-0.5 -right-0.5 rounded-full border-2 border-background',
          statusClasses[user.status],
          statusSizes[size]
        )} />
      )}
    </div>
  );
}