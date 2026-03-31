'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function AgentDetailPage() {
  const router = useRouter();
  const params = useParams();
  const agentId = params.id as string;

  // Redirect to settings page
  useEffect(() => {
    router.replace(`/agents/${agentId}/settings`);
  }, [agentId, router]);

  return null;
}
