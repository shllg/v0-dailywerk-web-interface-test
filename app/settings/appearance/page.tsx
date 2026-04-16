'use client';

import { useUser } from '@/contexts/user-context';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { Sun, Moon, Monitor, Check } from 'lucide-react';

const themes = [
  { id: 'light', label: 'Light', icon: Sun },
  { id: 'dark', label: 'Dark', icon: Moon },
  { id: 'system', label: 'System', icon: Monitor },
] as const;

const accentColors = [
  { id: 'purple', label: 'Purple', color: 'bg-purple-500' },
  { id: 'blue', label: 'Blue', color: 'bg-blue-500' },
  { id: 'green', label: 'Green', color: 'bg-green-500' },
  { id: 'orange', label: 'Orange', color: 'bg-orange-500' },
  { id: 'pink', label: 'Pink', color: 'bg-pink-500' },
];

export default function AppearancePage() {
  const { preferences, updatePreferences } = useUser();

  return (
    <div className="flex flex-col h-full bg-background">
      <PageHeader title="Appearance" showBack />

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-xl mx-auto space-y-6">
          <Card className="bg-white/[0.02] border-white/5">
            <CardHeader>
              <CardTitle className="text-base">Theme</CardTitle>
              <CardDescription>Select your preferred color scheme</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                {themes.map((theme) => {
                  const Icon = theme.icon;
                  const isSelected = preferences.theme === theme.id;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => updatePreferences({ theme: theme.id })}
                      className={cn(
                        'flex flex-col items-center gap-2 p-4 rounded-xl border transition-all',
                        isSelected
                          ? 'border-primary bg-primary/10 ring-1 ring-primary'
                          : 'border-white/10 hover:border-primary/50 bg-white/[0.02]'
                      )}
                    >
                      <Icon className="h-6 w-6" />
                      <span className="text-sm font-medium">{theme.label}</span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.02] border-white/5">
            <CardHeader>
              <CardTitle className="text-base">Accent Color</CardTitle>
              <CardDescription>Choose your primary accent color</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                {accentColors.map((color) => (
                  <button
                    key={color.id}
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110',
                      color.color,
                      color.id === 'purple' && 'ring-2 ring-offset-2 ring-offset-background ring-primary'
                    )}
                    title={color.label}
                  >
                    {color.id === 'purple' && <Check className="h-5 w-5 text-white" />}
                  </button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Color customization coming soon
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.02] border-white/5">
            <CardHeader>
              <CardTitle className="text-base">Navigation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Dock auto-hide</Label>
                  <p className="text-sm text-muted-foreground">
                    Hide the navigation dock until you hover
                  </p>
                </div>
                <Switch
                  checked={preferences.sidebarCollapsed}
                  onCheckedChange={(checked) =>
                    updatePreferences({ sidebarCollapsed: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
