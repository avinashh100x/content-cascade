import { useState } from 'react';
import {
  Bold,
  Italic,
  Link2,
  List,
  ListOrdered,
  Image,
  AtSign,
  Hash,
  Smile,
  Calendar,
  Clock,
  Send,
  Twitter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { toast } from '@/hooks/use-toast';

const platforms = [
  {
    id: 'twitter',
    name: 'X (Twitter)',
    icon: Twitter,
    connected: true,
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
    connected: true,
    charLimit: 3000,
  },
];

const toolbarButtons = [
  { icon: Bold, label: 'Bold', action: 'bold' },
  { icon: Italic, label: 'Italic', action: 'italic' },
  { icon: Link2, label: 'Add link', action: 'link' },
  { icon: List, label: 'Bullet list', action: 'list' },
  { icon: ListOrdered, label: 'Numbered list', action: 'orderedList' },
];

export function EditorPanel() {
  const [content, setContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['twitter', 'linkedin']);
  const [scheduleDate, setScheduleDate] = useState<Date>();

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((id) => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handlePostNow = () => {
    if (!content.trim()) {
      toast({
        title: 'Content required',
        description: 'Please write something before posting.',
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: 'Posted successfully! 🎉',
      description: `Your content has been published to ${selectedPlatforms.length} platform(s).`,
    });
    setContent('');
  };

  const handleAddToQueue = () => {
    if (!content.trim()) {
      toast({
        title: 'Content required',
        description: 'Please write something before scheduling.',
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: 'Added to queue! 📅',
      description: scheduleDate
        ? `Scheduled for ${scheduleDate.toLocaleDateString()}`
        : 'Added to your content queue.',
    });
    setContent('');
    setScheduleDate(undefined);
  };

  const minCharLimit = Math.min(
    ...selectedPlatforms
      .map((id) => platforms.find((p) => p.id === id)?.charLimit || Infinity)
      .filter(Boolean)
  );

  const charCount = content.length;
  const isOverLimit = charCount > minCharLimit;

  return (
    <div className="panel h-full flex flex-col animate-slide-up">
      {/* Platform Selection */}
      <div className="p-4 border-b border-border">
        <p className="text-sm font-medium mb-3">Post to:</p>
        <div className="flex flex-wrap gap-3">
          {platforms.map((platform) => (
            <label
              key={platform.id}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all duration-200 ${
                selectedPlatforms.includes(platform.id)
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <Checkbox
                checked={selectedPlatforms.includes(platform.id)}
                onCheckedChange={() => handlePlatformToggle(platform.id)}
                className="sr-only"
              />
              <platform.icon />
              <span className="text-sm font-medium">{platform.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Editor Toolbar */}
      <div className="px-4 py-2 border-b border-border flex items-center gap-1 flex-wrap">
        {toolbarButtons.map((button) => (
          <Button
            key={button.action}
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            title={button.label}
          >
            <button.icon className="h-4 w-4" />
          </Button>
        ))}
        <Separator orientation="vertical" className="h-5 mx-1" />
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Add image">
          <Image className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Mention">
          <AtSign className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Hashtag">
          <Hash className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Emoji">
          <Smile className="h-4 w-4" />
        </Button>
      </div>

      {/* Editor Area */}
      <div className="flex-1 p-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind? Write your content here..."
          className="w-full h-full resize-none bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-base leading-relaxed"
        />
      </div>

      {/* Character Count */}
      <div className="px-4 pb-2">
        <div className="flex items-center justify-between text-sm">
          <span className={isOverLimit ? 'text-destructive' : 'text-muted-foreground'}>
            {charCount} / {minCharLimit} characters
          </span>
          {isOverLimit && (
            <span className="text-destructive text-xs">
              Content exceeds character limit for selected platform(s)
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
                {scheduleDate ? scheduleDate.toLocaleDateString() : 'Schedule'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={scheduleDate}
                onSelect={setScheduleDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Button variant="outline" size="sm">
            <Clock className="h-4 w-4 mr-2" />
            Set time
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            onClick={handleAddToQueue}
            disabled={!content.trim() || selectedPlatforms.length === 0}
          >
            Add to Queue
          </Button>
          <Button
            variant="gradient"
            onClick={handlePostNow}
            disabled={!content.trim() || selectedPlatforms.length === 0 || isOverLimit}
          >
            <Send className="h-4 w-4 mr-2" />
            Post Now
          </Button>
        </div>
      </div>
    </div>
  );
}
