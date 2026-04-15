'use client';

import { useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { VaultSidebar } from '@/components/vault/vault-sidebar';
import { VaultContent } from '@/components/vault/vault-content';
import { mockVaultFiles } from '@/lib/mock-data';
import type { VaultFile } from '@/lib/types';

export default function VaultPage() {
  const [selectedFile, setSelectedFile] = useState<VaultFile | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['daily', 'research']));

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  return (
    <AppShell>
      <div className="flex h-full overflow-hidden">
        {/* File tree sidebar */}
        <VaultSidebar
          files={mockVaultFiles}
          selectedFile={selectedFile}
          expandedFolders={expandedFolders}
          onSelectFile={setSelectedFile}
          onToggleFolder={toggleFolder}
        />

        {/* Content area */}
        <VaultContent file={selectedFile} />
      </div>
    </AppShell>
  );
}
