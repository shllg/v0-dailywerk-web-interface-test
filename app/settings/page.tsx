'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/user-context';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  User,
  Palette,
  Shield,
  HelpCircle,
  RotateCcw,
  ChevronRight,
  Moon,
  Sun,
  Monitor,
} from 'lucide-react';

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
    <div className="flex flex-col h-full">
      <Header title="Settings" />

      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Navigation */}
          <Card>
            <CardContent className="p-0">
              <SettingsLink
                href="/settings/profile"
                icon={User}
                title="Profile"
                description="Manage your account details"
              />
              <Separator />
              <SettingsLink
                href="/settings/appearance"
                icon={Palette}
                title="Appearance"
                description="Customize colors and theme"
              />
              <Separator />
              <SettingsLink
                href="/gateways"
                icon={Shield}
                title="Gateways & Connections"
                description="Manage connected services"
              />
            </CardContent>
          </Card>

          {/* Theme Quick Toggle */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Theme</CardTitle>
              <CardDescription>Choose your preferred appearance</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <Button
                variant={preferences.theme === 'light' ? 'default' : 'outline'}
                size="sm"
                onClick={() => updatePreferences({ theme: 'light' })}
              >
                <Sun className="h-4 w-4 mr-1" />
                Light
              </Button>
              <Button
                variant={preferences.theme === 'dark' ? 'default' : 'outline'}
                size="sm"
                onClick={() => updatePreferences({ theme: 'dark' })}
              >
                <Moon className="h-4 w-4 mr-1" />
                Dark
              </Button>
              <Button
                variant={preferences.theme === 'system' ? 'default' : 'outline'}
                size="sm"
                onClick={() => updatePreferences({ theme: 'system' })}
              >
                <Monitor className="h-4 w-4 mr-1" />
                System
              </Button>
            </CardContent>
          </Card>

          {/* Help & Support */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Help & Support</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => router.push('/onboarding/tour')}
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Take the Tour Again
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-destructive hover:text-destructive"
                onClick={handleResetOnboarding}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Setup
              </Button>
            </CardContent>
          </Card>

          {/* Version */}
          <div className="text-center text-sm text-muted-foreground">
            <p>DailyWerk v0.1.0</p>
            <p className="text-xs mt-1">Made with care for everyday productivity</p>
          </div>
        </div>
      </div>
    </div>
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
      className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </Link>
  );
}
