import { QueuePanel } from '@/components/dashboard/QueuePanel';
import { EditorPanel } from '@/components/dashboard/EditorPanel';
import { RightPanel } from '@/components/dashboard/RightPanel';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bell, Settings, User } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="h-14 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg btn-gradient flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">P</span>
              </div>
              <span className="font-display font-semibold text-lg">PostFlow</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Settings className="h-4 w-4" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center ml-2">
              <User className="h-4 w-4 text-primary" />
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="h-[calc(100vh-3.5rem)] p-4">
        <div className="h-full grid grid-cols-12 gap-4">
          {/* Left Panel - Queue */}
          <div className="col-span-12 lg:col-span-3 xl:col-span-3">
            <QueuePanel />
          </div>

          {/* Center Panel - Editor */}
          <div className="col-span-12 lg:col-span-6 xl:col-span-6">
            <EditorPanel />
          </div>

          {/* Right Panel - Platforms & AI */}
          <div className="col-span-12 lg:col-span-3 xl:col-span-3">
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
