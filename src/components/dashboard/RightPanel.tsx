import { useState } from 'react';
import {
  ArrowRight,
  Check,
  Loader2,
  Plus,
  Sparkles,
  Twitter,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { useEditor } from '@/contexts/EditorContext';

const connectedPlatforms = [
  {
    id: 'twitter',
    name: 'X (Twitter)',
    icon: Twitter,
    username: '@yourhandle',
    connected: true,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: () => (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    username: 'Your Name',
    connected: true,
  },
];

const upcomingPlatforms = [
  { name: 'Instagram', soon: true },
  { name: 'Facebook', soon: true },
  { name: 'TikTok', soon: true },
];

const aiPromptSuggestions = [
  'Write a tweet about productivity tips',
  'Create a LinkedIn post about our latest feature',
  'Generate engaging content about tech trends',
  'Write a motivational Monday post',
];

export function RightPanel() {
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const { sendToEditor } = useEditor();

  const handleGenerate = async () => {
    if (!aiPrompt.trim()) return;

    setIsGenerating(true);
    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setGeneratedContent(
      "🚀 Here's a productivity tip that changed my workflow: Time-blocking isn't just about scheduling tasks—it's about protecting your creative energy. Block out 2 hours of uninterrupted work time each morning. Your future self will thank you! #Productivity #WorkSmart"
    );
    setIsGenerating(false);
    toast({
      title: 'Content generated! ✨',
      description: 'Click "Send to Editor" to use this content.',
    });
  };

  const handleSendToEditor = () => {
    if (!generatedContent) return;
    sendToEditor(`<p>${generatedContent}</p>`);
    toast({
      title: 'Sent to editor!',
      description: 'A new post has been created with this content.',
    });
    setGeneratedContent('');
    setAiPrompt('');
  };

  return (
    <div className="h-full flex flex-col">
      {/* Connected Platforms */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-semibold">Connected Platforms</h3>
          <Button variant="ghost" size="sm" className="h-7 text-xs">
            <Plus className="h-3 w-3 mr-1" />
            Add
          </Button>
        </div>

        <div className="space-y-2">
          {connectedPlatforms.map((platform) => (
            <div
              key={platform.id}
              className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-md bg-background">
                  <platform.icon />
                </div>
                <div>
                  <p className="text-sm font-medium">{platform.name}</p>
                  <p className="text-xs text-muted-foreground">{platform.username}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-success border-success/30 gap-1">
                  <Check className="h-3 w-3" />
                  Connected
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-3" />

        <div>
          <p className="text-xs text-muted-foreground mb-2">Coming soon:</p>
          <div className="flex flex-wrap gap-1.5">
            {upcomingPlatforms.map((platform) => (
              <Badge key={platform.name} variant="secondary" className="text-xs">
                {platform.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* AI Content Assistant */}
      <div className="flex-1 flex flex-col p-4 min-h-0">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <h3 className="font-display font-semibold">AI Content Assistant</h3>
          <Badge className="btn-gradient text-xs ml-auto">Beta</Badge>
        </div>

        <p className="text-sm text-muted-foreground mb-3">
          Let AI help you create engaging content based on current trends.
        </p>

        <div className="space-y-3 flex-1 flex flex-col min-h-0">
          <div className="flex flex-wrap gap-1.5">
            {aiPromptSuggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs h-7"
                onClick={() => setAiPrompt(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>

          <Textarea
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="Describe what content you want to create..."
            className="resize-none flex-1 min-h-[80px]"
          />

          <Button
            variant="gradient"
            className="w-full"
            onClick={handleGenerate}
            disabled={isGenerating || !aiPrompt.trim()}
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Generate Content
              </>
            )}
          </Button>

          {generatedContent && (
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-sm mb-3">{generatedContent}</p>
              <Button
                variant="default"
                size="sm"
                className="w-full"
                onClick={handleSendToEditor}
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Send to Editor
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
