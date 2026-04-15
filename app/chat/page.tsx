'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/user-context';
import { ChatView } from '@/components/chat/chat-view';

export default function ChatPage() {
  const router = useRouter();
  const { preferences } = useUser();

  useEffect(() => {
    if (!preferences.hasCompletedOnboarding) {
      router.replace('/onboarding');
    }
  }, [preferences.hasCompletedOnboarding, router]);

  if (!preferences.hasCompletedOnboarding) {
    return null;
  }

  return <ChatView />;
}
