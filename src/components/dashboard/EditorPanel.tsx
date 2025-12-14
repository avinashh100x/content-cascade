import { useState } from 'react';
import {
  Calendar,
  Clock,
  Plus,
  Send,
  Twitter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { TiptapEditor } from './TiptapEditor';
import { PostCard } from './PostCard';
import { useEditor } from '@/contexts/EditorContext';
import { ScrollArea } from '@/components/ui/scroll-area';

const platforms = [
  {
    id: 'twitter',
    name: 'X (Twitter)',
    icon: Twitter,
    charLimit: 280,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: () => (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    charLimit: 3000,
  },
];

export function EditorPanel() {
  const { posts, activePostId, addPost, updatePost, getActivePost } = useEditor();
  const activePost = getActivePost();

  const handlePlatformToggle = (platformId: string) => {
    if (!activePost) return;
    const newPlatforms = activePost.platforms.includes(platformId)
      ? activePost.platforms.filter((id) => id !== platformId)
      : [...activePost.platforms, platformId];
    updatePost(activePost.id, { platforms: newPlatforms });
  };

  const handleContentChange = (content: string) => {
    if (!activePost) return;
    updatePost(activePost.id, { content });
  };

  const handleScheduleDate = (date: Date | undefined) => {
    if (!activePost) return;
    updatePost(activePost.id, { scheduledFor: date, status: date ? 'scheduled' : 'draft' });
  };

  const handleScheduleTime = (time: string) => {
    if (!activePost) return;
    updatePost(activePost.id, { scheduledTime: time });
  };

  const handlePostNow = () => {
    if (!activePost?.content.trim()) {
      toast({
        title: 'Content required',
        description: 'Please write something before posting.',
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: 'Posted successfully! 🎉',
      description: `Your content has been published to ${activePost.platforms.length} platform(s).`,
    });
  };

  const handleAddToQueue = () => {
    if (!activePost?.content.trim()) {
      toast({
        title: 'Content required',
        description: 'Please write something before scheduling.',
        variant: 'destructive',
      });
      return;
    }
    updatePost(activePost.id, { status: 'scheduled' });
    toast({
      title: 'Added to queue! 📅',
      description: activePost.scheduledFor
        ? `Scheduled for ${activePost.scheduledFor.toLocaleDateString()}`
        : 'Added to your content queue.',
    });
  };

  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const charCount = activePost ? stripHtml(activePost.content).length : 0;
  const minCharLimit = activePost
    ? Math.min(
        ...activePost.platforms
          .map((id) => platforms.find((p) => p.id === id)?.charLimit || Infinity)
          .filter(Boolean)
      )
    : 280;
  const isOverLimit = charCount > minCharLimit;

  return (
    <div className="h-full flex gap-4">
      {/* Posts List - Canvas View */}
      <div className="w-72 flex-shrink-0 flex flex-col panel">
        <div className="p-3 border-b border-border flex items-center justify-between">
          <h3 className="font-display font-semibold text-sm">Posts</h3>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => addPost()}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-3 space-y-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} isActive={post.id === activePostId} />
            ))}
            {posts.length === 0 && (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No posts yet. Create one!
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Active Post Editor */}
      <div className="flex-1 panel flex flex-col min-w-0">
        {activePost ? (
          <>
            {/* Platform Selection */}
            <div className="p-4 border-b border-border">
              <p className="text-sm font-medium mb-3">Post to:</p>
              <div className="flex flex-wrap gap-3">
                {platforms.map((platform) => (
                  <label
                    key={platform.id}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all duration-200 ${
                      activePost.platforms.includes(platform.id)
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <Checkbox
                      checked={activePost.platforms.includes(platform.id)}
                      onCheckedChange={() => handlePlatformToggle(platform.id)}
                      className="sr-only"
                    />
                    <platform.icon />
                    <span className="text-sm font-medium">{platform.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rich Text Editor */}
            <div className="flex-1 flex flex-col min-h-0">
              <TiptapEditor
                content={activePost.content}
                onChange={handleContentChange}
                placeholder="What's on your mind? Write your content here..."
              />
            </div>

            {/* Character Count */}
            <div className="px-4 py-2 border-t border-border">
              <div className="flex items-center justify-between text-sm">
                <span className={isOverLimit ? 'text-destructive' : 'text-muted-foreground'}>
                  {charCount} / {minCharLimit} characters
                </span>
                {isOverLimit && (
                  <span className="text-destructive text-xs">
                    Exceeds limit for selected platform(s)
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-border flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      {activePost.scheduledFor
                        ? activePost.scheduledFor.toLocaleDateString()
                        : 'Schedule'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={activePost.scheduledFor}
                      onSelect={handleScheduleDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <Input
                    type="time"
                    value={activePost.scheduledTime || ''}
                    onChange={(e) => handleScheduleTime(e.target.value)}
                    className="w-28 h-9"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  onClick={handleAddToQueue}
                  disabled={!activePost.content.trim() || activePost.platforms.length === 0}
                >
                  Add to Queue
                </Button>
                <Button
                  variant="gradient"
                  onClick={handlePostNow}
                  disabled={!activePost.content.trim() || activePost.platforms.length === 0 || isOverLimit}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Post Now
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <p className="mb-2">No post selected</p>
              <Button onClick={() => addPost()}>
                <Plus className="h-4 w-4 mr-2" />
                Create New Post
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
