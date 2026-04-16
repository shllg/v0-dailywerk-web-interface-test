'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/user-context';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  User,
  Palette,
  Shield,
  Bot,
  Wrench,
  Zap,
  Share2,
  RotateCcw,
  ChevronRight,
  Moon,
  Sun,
  Monitor,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const router = useRouter();
  const { preferences, updatePreferences, resetOnboarding } = useUser();

  const handleResetOnboarding = () => {
    if (confirm('This will reset your DailyWerk setup. Are you sure?')) {
      resetOnboarding();
      router.push('/onboarding');
    }
  };

  return (
    <AppShell>
      <ScrollArea className="flex-1">
        <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Settings</h1>
              <p className="text-sm text-white/40">Manage your DailyWerk preferences</p>
            </div>
          </div>

          {/* Account Section */}
          <div className="space-y-3">
            <h2 className="text-xs font-medium text-white/40 uppercase tracking-wider px-1">Account</h2>
            <Card className="bg-white/[0.02] border-white/5">
              <CardContent className="p-0 divide-y divide-white/5">
                <SettingsLink
                  href="/settings/profile"
                  icon={User}
                  title="Profile"
                  description="Your account and identity"
                />
                <SettingsLink
                  href="/settings/appearance"
                  icon={Palette}
                  title="Appearance"
                  description="Colors, theme, and display"
                />
              </CardContent>
            </Card>
          </div>

          {/* Workspace Section */}
          <div className="space-y-3">
            <h2 className="text-xs font-medium text-white/40 uppercase tracking-wider px-1">Workspace</h2>
            <Card className="bg-white/[0.02] border-white/5">
              <CardContent className="p-0 divide-y divide-white/5">
                <SettingsLink
                  href="/agents"
                  icon={Bot}
                  title="Agents"
                  description="Manage your AI agents"
                />
                <SettingsLink
                  href="/tools"
                  icon={Wrench}
                  title="Tools"
                  description="Configure available tools"
                />
                <SettingsLink
                  href="/automations"
                  icon={Zap}
                  title="Automations"
                  description="Crons, reminders, and tasks"
                />
                <SettingsLink
                  href="/gateways"
                  icon={Share2}
                  title="Gateways"
                  description="Connected services and integrations"
                />
              </CardContent>
            </Card>
          </div>

          {/* Theme Quick Toggle */}
          <div className="space-y-3">
            <h2 className="text-xs font-medium text-white/40 uppercase tracking-wider px-1">Theme</h2>
            <Card className="bg-white/[0.02] border-white/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updatePreferences({ theme: 'light' })}
                    className={cn(
                      'flex-1 h-12 rounded-xl',
                      preferences.theme === 'light' 
                        ? 'bg-white/10 text-white' 
                        : 'text-white/40 hover:text-white'
                    )}
                  >
                    <Sun className="h-4 w-4 mr-2" />
                    Light
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updatePreferences({ theme: 'dark' })}
                    className={cn(
                      'flex-1 h-12 rounded-xl',
                      preferences.theme === 'dark' 
                        ? 'bg-white/10 text-white' 
                        : 'text-white/40 hover:text-white'
                    )}
                  >
                    <Moon className="h-4 w-4 mr-2" />
                    Dark
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updatePreferences({ theme: 'system' })}
                    className={cn(
                      'flex-1 h-12 rounded-xl',
                      preferences.theme === 'system' 
                        ? 'bg-white/10 text-white' 
                        : 'text-white/40 hover:text-white'
                    )}
                  >
                    <Monitor className="h-4 w-4 mr-2" />
                    System
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Help & Support */}
          <div className="space-y-3">
            <h2 className="text-xs font-medium text-white/40 uppercase tracking-wider px-1">Support</h2>
            <Card className="bg-white/[0.02] border-white/5">
              <CardContent className="p-4 space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start h-11 rounded-xl text-rose-400/70 hover:text-rose-400 hover:bg-rose-500/10"
                  onClick={handleResetOnboarding}
                >
                  <RotateCcw className="h-4 w-4 mr-3" />
                  Reset Setup
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Version */}
          <div className="text-center py-4">
            <p className="text-sm text-white/30">DailyWerk v0.1.0</p>
            <p className="text-xs text-white/20 mt-1">Made with care for everyday productivity</p>
          </div>
        </div>
      </ScrollArea>
    </AppShell>
  );
}

function SettingsLink({
  href,
  icon: Icon,
  title,
  description,
}: {
  href: string;
  icon: typeof User;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 p-4 hover:bg-white/[0.02] transition-colors group"
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
        <Icon className="h-5 w-5 text-white/40 group-hover:text-white/60 transition-colors" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-white/80 group-hover:text-white transition-colors">{title}</h3>
        <p className="text-sm text-white/30">{description}</p>
      </div>
      <ChevronRight className="h-5 w-5 text-white/20 group-hover:text-white/40 group-hover:translate-x-0.5 transition-all" />
    </Link>
  );
}
