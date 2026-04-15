'use client';

import { useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { MemoryGraph } from '@/components/memory/memory-graph';
import { MemoryInspector } from '@/components/memory/memory-inspector';
import { MemoryFilters } from '@/components/memory/memory-filters';
import { mockMemoryNodes } from '@/lib/mock-data';
import type { MemoryNode } from '@/lib/types';

export default function MemoryPage() {
  const [selectedNode, setSelectedNode] = useState<MemoryNode | null>(null);
  const [filters, setFilters] = useState({
    category: 'all',
    scope: 'all',
    minImportance: 0,
  });

  const filteredNodes = mockMemoryNodes.filter(node => {
    if (filters.category !== 'all' && node.category !== filters.category) return false;
    if (filters.scope !== 'all' && node.scope !== filters.scope) return false;
    if (node.importance < filters.minImportance) return false;
    return true;
  });

  return (
    <AppShell>
      <div className="flex h-full overflow-hidden">
        {/* Main visualization area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header with filters */}
          <MemoryFilters filters={filters} onFiltersChange={setFilters} nodeCount={filteredNodes.length} />

          {/* Graph visualization */}
          <div className="flex-1 relative">
            <MemoryGraph
              nodes={filteredNodes}
              selectedNode={selectedNode}
              onSelectNode={setSelectedNode}
            />
          </div>
        </div>

        {/* Inspector panel */}
        <MemoryInspector
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
          onUpdate={(updated) => {
            // In real app, this would update the backend
            console.log('Updated node:', updated);
          }}
        />
      </div>
    </AppShell>
  );
}
