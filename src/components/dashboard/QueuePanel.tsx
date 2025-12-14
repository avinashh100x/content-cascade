import { Calendar, Clock, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useEditor } from '@/contexts/EditorContext';
import { ScrollArea } from '@/components/ui/scroll-area';

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

export function QueuePanel() {
  const { posts, activePostId, setActivePostId } = useEditor();
  const scheduledPosts = posts.filter((p) => p.status === 'scheduled');

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-semibold text-lg">Content Queue</h2>
          <Badge variant="secondary" className="font-medium">
            {scheduledPosts.length} posts
          </Badge>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3 space-y-3">
          {scheduledPosts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              No scheduled posts yet.
            </div>
          ) : (
            scheduledPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => setActivePostId(post.id)}
                className={`group p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  activePostId === post.id
                    ? 'bg-primary/10 border border-primary/30'
                    : 'bg-secondary/50 hover:bg-secondary border border-transparent'
                }`}
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
                  <Badge variant="default" className="text-xs">
                    Scheduled
                  </Badge>
                </div>

                <p className="text-sm text-foreground/90 line-clamp-2 mb-3">
                  {stripHtml(post.content) || 'Empty post...'}
                </p>

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  {post.scheduledFor && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>
                        {post.scheduledFor.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  )}
                  {post.scheduledTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{post.scheduledTime}</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      <div className="p-3 border-t border-border">
        <Button variant="outline" className="w-full" size="sm">
          <Calendar className="h-4 w-4 mr-2" />
          View Calendar
        </Button>
      </div>
    </div>
  );
}
