import { Calendar, Clock, Edit2, Trash2, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PostDraft, useEditor } from '@/contexts/EditorContext';
import { cn } from '@/lib/utils';

interface PostCardProps {
  post: PostDraft;
  isActive: boolean;
}

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

function stripHtml(html: string) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

export function PostCard({ post, isActive }: PostCardProps) {
  const { setActivePostId, deletePost } = useEditor();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div
      onClick={() => setActivePostId(post.id)}
      className={cn(
        'group p-4 rounded-xl border cursor-pointer transition-all duration-200',
        isActive
          ? 'border-primary bg-primary/5 shadow-md'
          : 'border-border bg-card hover:border-primary/50 hover:shadow-sm'
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5">
          {post.platforms.map((platform) => (
            <div
              key={platform}
              className="p-1.5 rounded-md bg-muted text-muted-foreground"
            >
              <PlatformIcon platform={platform} />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <Badge
            variant={post.status === 'scheduled' ? 'default' : 'secondary'}
            className="text-xs capitalize"
          >
            {post.status}
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              deletePost(post.id);
            }}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Content Preview */}
      <p className="text-sm text-foreground/90 line-clamp-3 mb-3">
        {stripHtml(post.content) || 'Empty post...'}
      </p>

      {/* Footer */}
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        {post.scheduledFor && (
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formatDate(post.scheduledFor)}</span>
          </div>
        )}
        {post.scheduledTime && (
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{post.scheduledTime}</span>
          </div>
        )}
        {!post.scheduledFor && (
          <div className="flex items-center gap-1">
            <Edit2 className="h-3.5 w-3.5" />
            <span>Click to edit</span>
          </div>
        )}
      </div>
    </div>
  );
}
