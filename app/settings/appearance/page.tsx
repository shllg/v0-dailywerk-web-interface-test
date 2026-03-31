'use client';

import { useUser } from '@/contexts/user-context';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
    <div className="flex flex-col h-full">
      <Header title="Appearance" showBack />

      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-xl mx-auto space-y-6">
          {/* Theme */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Theme</CardTitle>
              <CardDescription>
                Select your preferred color scheme
              </CardDescription>
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
                        'flex flex-col items-center gap-2 p-4 rounded-lg border transition-all',
                        isSelected
                          ? 'border-primary bg-primary/5 ring-1 ring-primary'
                          : 'border-border hover:border-primary/50'
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

          {/* Accent Color */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Accent Color</CardTitle>
              <CardDescription>
                Choose your primary accent color
              </CardDescription>
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

          {/* Sidebar */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Sidebar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Collapsed by default</Label>
                  <p className="text-sm text-muted-foreground">
                    Start with a compact sidebar on desktop
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
