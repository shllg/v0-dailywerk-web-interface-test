'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/user-context';
import { TourOverlay } from '@/components/onboarding/tour-overlay';
import { AppShell } from '@/components/layout/app-shell';
import { ChatView } from '@/components/chat/chat-view';

export default function TourPage() {
  const router = useRouter();
  const { preferences, completeTour } = useUser();

  // If user hasn't completed onboarding, redirect to onboarding
  useEffect(() => {
    if (!preferences.hasCompletedOnboarding) {
      router.replace('/onboarding');
    }
  }, [preferences.hasCompletedOnboarding, router]);

  const handleTourComplete = () => {
    completeTour();
    router.push('/chat');
  };

  const handleSkipTour = () => {
    completeTour();
    router.push('/chat');
  };

  if (!preferences.hasCompletedOnboarding) {
    return null;
  }

  return (
    <>
      <AppShell>
        <ChatView />
      </AppShell>
      <TourOverlay onComplete={handleTourComplete} onSkip={handleSkipTour} />
    </>
  );
}
