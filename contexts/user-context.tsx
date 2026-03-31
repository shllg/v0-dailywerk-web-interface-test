'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { UserPreferences, OnboardingState } from '@/lib/types';

interface UserContextValue {
  preferences: UserPreferences;
  onboarding: OnboardingState;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  updateOnboarding: (updates: Partial<OnboardingState>) => void;
  completeOnboarding: () => void;
  completeTour: () => void;
  resetOnboarding: () => void;
}

const defaultPreferences: UserPreferences = {
  hasCompletedOnboarding: false,
  hasCompletedTour: false,
  theme: 'dark',
  defaultAgentId: 'main-agent',
  sidebarCollapsed: false,
};

const defaultOnboarding: OnboardingState = {
  currentStep: 0,
  totalSteps: 5,
  userName: undefined,
  selectedTemplateId: undefined,
  selectedTools: [],
  gatewaySetup: undefined,
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

const STORAGE_KEY = 'dailywerk_user';

export function UserProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [onboarding, setOnboarding] = useState<OnboardingState>(defaultOnboarding);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.preferences) setPreferences(parsed.preferences);
        if (parsed.onboarding) setOnboarding(parsed.onboarding);
      } catch {
        // Invalid data, use defaults
      }
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ preferences, onboarding }));
    }
  }, [preferences, onboarding, isHydrated]);

  const updatePreferences = useCallback((updates: Partial<UserPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...updates }));
  }, []);

  const updateOnboarding = useCallback((updates: Partial<OnboardingState>) => {
    setOnboarding((prev) => ({ ...prev, ...updates }));
  }, []);

  const completeOnboarding = useCallback(() => {
    setPreferences((prev) => ({ ...prev, hasCompletedOnboarding: true }));
    setOnboarding((prev) => ({ ...prev, currentStep: prev.totalSteps }));
  }, []);

  const completeTour = useCallback(() => {
    setPreferences((prev) => ({ ...prev, hasCompletedTour: true }));
  }, []);

  const resetOnboarding = useCallback(() => {
    setPreferences(defaultPreferences);
    setOnboarding(defaultOnboarding);
  }, []);

  // Don't render children until hydrated to prevent hydration mismatch
  if (!isHydrated) {
    return null;
  }

  return (
    <UserContext.Provider
      value={{
        preferences,
        onboarding,
        updatePreferences,
        updateOnboarding,
        completeOnboarding,
        completeTour,
        resetOnboarding,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
