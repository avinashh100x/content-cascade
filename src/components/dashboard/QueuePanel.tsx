import { Calendar, Clock, Edit2, MoreVertical, Trash2, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface QueuedPost {
  id: string;
  content: string;
  scheduledFor: string;
  platforms: string[];
  status: 'scheduled' | 'draft';
}

const mockQueue: QueuedPost[] = [
  {
    id: '1',
    content: 'Excited to share our latest product update! 🚀 Check out the new features...',
    scheduledFor: '2024-01-15 10:00 AM',
    platforms: ['twitter', 'linkedin'],
    status: 'scheduled',
  },
  {
    id: '2',
    content: 'Just published a new blog post about productivity tips for remote teams...',
    scheduledFor: '2024-01-15 2:00 PM',
    platforms: ['linkedin'],
    status: 'scheduled',
  },
  {
    id: '3',
    content: 'Monday motivation: The only way to do great work is to love what you do.',
    scheduledFor: '2024-01-16 9:00 AM',
    platforms: ['twitter'],
    status: 'draft',
  },
];

const PlatformIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case 'twitter':
      return <Twitter className="h-3.5 w-3.5" />;
    case 'linkedin':
      return (
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      );
    default:
      return null;
  }
};

export function QueuePanel() {
  return (
    <div className="panel h-full flex flex-col animate-slide-in-left">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-semibold text-lg">Content Queue</h2>
          <Badge variant="secondary" className="font-medium">
            {mockQueue.length} posts
          </Badge>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {mockQueue.map((post, index) => (
          <div
            key={post.id}
            className="group bg-secondary/50 hover:bg-secondary rounded-lg p-3 transition-all duration-200 card-hover"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5">
                {post.platforms.map((platform) => (
                  <div
                    key={platform}
                    className="p-1.5 rounded-md bg-background text-muted-foreground"
                  >
                    <PlatformIcon platform={platform} />
                  </div>
                ))}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <p className="text-sm text-foreground/90 line-clamp-3 mb-3">
              {post.content}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span>{post.scheduledFor.split(' ')[0]}</span>
                <Clock className="h-3.5 w-3.5 ml-1" />
                <span>{post.scheduledFor.split(' ').slice(1).join(' ')}</span>
              </div>
              <Badge
                variant={post.status === 'scheduled' ? 'default' : 'secondary'}
                className="text-xs capitalize"
              >
                {post.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-border">
        <Button variant="outline" className="w-full" size="sm">
          <Calendar className="h-4 w-4 mr-2" />
          View Calendar
        </Button>
      </div>
    </div>
  );
}
