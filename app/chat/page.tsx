'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/user-context';
import { ChatContainer } from '@/components/chat/chat-container';

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

  return <ChatContainer />;
}
