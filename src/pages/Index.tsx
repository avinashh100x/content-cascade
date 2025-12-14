import { Link } from 'react-router-dom';
import { ArrowRight, Check, Sparkles, Twitter, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Badge } from '@/components/ui/badge';

const features = [
  {
    icon: Zap,
    title: 'Multi-Platform Posting',
    description: 'Connect your social accounts and publish to multiple platforms with a single click.',
  },
  {
    icon: Sparkles,
    title: 'AI Content Assistant',
    description: 'Let our AI help you create engaging, trend-aware content that resonates with your audience.',
  },
  {
    icon: Twitter,
    title: 'Smart Scheduling',
    description: 'Queue your posts and schedule them for optimal engagement times.',
  },
];

const platforms = [
  { name: 'X (Twitter)', status: 'available' },
  { name: 'LinkedIn', status: 'available' },
  { name: 'Instagram', status: 'coming' },
  { name: 'Facebook', status: 'coming' },
  { name: 'TikTok', status: 'coming' },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl btn-gradient flex items-center justify-center">
              <span className="text-base font-bold text-primary-foreground">P</span>
            </div>
            <span className="font-display font-bold text-xl">PostFlow</span>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link to="/dashboard">
              <Button variant="gradient" size="lg">
                Open Dashboard
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4" style={{ background: 'var(--gradient-hero)' }}>
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 btn-gradient px-4 py-1.5 text-sm font-medium">
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            Now with AI-powered content creation
          </Badge>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight animate-fade-in">
            Write once,{' '}
            <span className="gradient-text">publish everywhere</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '100ms' }}>
            Streamline your social media workflow. Create content, schedule posts, and manage all your platforms from one beautiful dashboard.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <Link to="/dashboard">
              <Button variant="gradient" size="xl">
                Get Started Free
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Button variant="outline" size="xl">
              Watch Demo
            </Button>
          </div>

          {/* Supported Platforms */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {platforms.map((platform) => (
              <Badge
                key={platform.name}
                variant={platform.status === 'available' ? 'default' : 'secondary'}
                className="px-3 py-1.5 text-sm"
              >
                {platform.status === 'available' && <Check className="h-3.5 w-3.5 mr-1.5" />}
                {platform.name}
                {platform.status === 'coming' && (
                  <span className="ml-1.5 text-xs opacity-70">Soon</span>
                )}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Everything you need to manage your content
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Powerful tools to help you create, schedule, and publish content across all your social platforms.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="panel p-6 card-hover animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-xl mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="panel p-8 sm:p-12 text-center max-w-3xl mx-auto" style={{ background: 'var(--gradient-primary)', border: 'none' }}>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4 text-primary-foreground">
              Ready to streamline your social media?
            </h2>
            <p className="text-primary-foreground/80 mb-6 text-lg">
              Join thousands of creators and businesses who trust PostFlow for their content management.
            </p>
            <Link to="/dashboard">
              <Button size="xl" className="bg-background text-foreground hover:bg-background/90">
                Start Creating Now
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg btn-gradient flex items-center justify-center">
              <span className="text-xs font-bold text-primary-foreground">P</span>
            </div>
            <span className="font-display font-semibold">PostFlow</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 PostFlow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
