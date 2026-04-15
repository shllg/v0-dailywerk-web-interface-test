'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import type { MemoryNode } from '@/lib/types';
import { Brain, Zap, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MemoryGraphProps {
  nodes: MemoryNode[];
  selectedNode: MemoryNode | null;
  onSelectNode: (node: MemoryNode | null) => void;
}

const categoryColors: Record<string, { bg: string; border: string; glow: string }> = {
  context: { bg: 'from-blue-500/20 to-blue-600/10', border: 'border-blue-500/30', glow: 'shadow-blue-500/20' },
  preference: { bg: 'from-amber-500/20 to-amber-600/10', border: 'border-amber-500/30', glow: 'shadow-amber-500/20' },
  fact: { bg: 'from-emerald-500/20 to-emerald-600/10', border: 'border-emerald-500/30', glow: 'shadow-emerald-500/20' },
  project: { bg: 'from-purple-500/20 to-purple-600/10', border: 'border-purple-500/30', glow: 'shadow-purple-500/20' },
  task: { bg: 'from-rose-500/20 to-rose-600/10', border: 'border-rose-500/30', glow: 'shadow-rose-500/20' },
};

export function MemoryGraph({ nodes, selectedNode, onSelectNode }: MemoryGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Position nodes in a force-directed-like layout (simplified)
  const positionedNodes = nodes.map((node, i) => {
    const angle = (i / nodes.length) * 2 * Math.PI;
    const radius = 150 + (node.importance / 10) * 100;
    const jitter = Math.sin(i * 12.9898) * 50;
    
    return {
      ...node,
      x: 400 + Math.cos(angle) * (radius + jitter),
      y: 300 + Math.sin(angle) * (radius + jitter),
      size: 20 + (node.importance / 10) * 40,
    };
  });

  // Generate connections between nodes based on relationships
  const connections = positionedNodes.flatMap((node, i) => {
    if (!node.connections) return [];
    return node.connections.map(targetId => {
      const target = positionedNodes.find(n => n.id === targetId);
      if (!target) return null;
      return {
        from: { x: node.x, y: node.y },
        to: { x: target.x, y: target.y },
        weight: node.confidence,
      };
    }).filter(Boolean);
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === containerRef.current || (e.target as HTMLElement).tagName === 'svg') {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden bg-black/20 cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Graph container */}
      <div
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: 'center',
          transition: isDragging ? 'none' : 'transform 0.2s ease-out',
        }}
        className="relative w-full h-full"
      >
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ minWidth: '800px', minHeight: '600px' }}>
          {connections.map((conn, i) => conn && (
            <line
              key={i}
              x1={conn.from.x}
              y1={conn.from.y}
              x2={conn.to.x}
              y2={conn.to.y}
              stroke="url(#connectionGradient)"
              strokeWidth={1 + conn.weight * 2}
              strokeOpacity={0.3}
              className="animate-pulse"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>

        {/* Memory nodes */}
        {positionedNodes.map((node) => {
          const colors = categoryColors[node.category] || categoryColors.context;
          const isSelected = selectedNode?.id === node.id;
          
          return (
            <button
              key={node.id}
              onClick={() => onSelectNode(isSelected ? null : node)}
              className={cn(
                'absolute flex items-center justify-center rounded-full',
                'bg-gradient-to-br backdrop-blur-sm',
                'border transition-all duration-300',
                'hover:scale-110 hover:z-10',
                colors.bg,
                colors.border,
                isSelected && [
                  'scale-125 z-20',
                  'ring-2 ring-white/30',
                  `shadow-xl ${colors.glow}`,
                ]
              )}
              style={{
                left: node.x - node.size / 2,
                top: node.y - node.size / 2,
                width: node.size,
                height: node.size,
              }}
            >
              {/* Icon based on category */}
              {node.category === 'context' && <Brain className="w-1/2 h-1/2 text-blue-400/70" />}
              {node.category === 'preference' && <Zap className="w-1/2 h-1/2 text-amber-400/70" />}
              {node.category === 'fact' && <span className="text-emerald-400/70 font-bold text-sm">F</span>}
              {node.category === 'project' && <span className="text-purple-400/70 font-bold text-sm">P</span>}
              {node.category === 'task' && <span className="text-rose-400/70 font-bold text-sm">T</span>}
              
              {/* Importance ring */}
              {node.importance > 7 && (
                <div className={cn(
                  'absolute inset-0 rounded-full animate-ping opacity-30',
                  colors.border
                )} />
              )}
            </button>
          );
        })}
      </div>

      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setZoom(z => Math.max(0.5, z - 0.1))}
          className="h-8 w-8 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <span className="text-xs text-white/40 w-12 text-center">{Math.round(zoom * 100)}%</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setZoom(z => Math.min(2, z + 0.1))}
          className="h-8 w-8 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }}
          className="h-8 w-8 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10"
        >
          <Maximize2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex flex-wrap gap-3 text-[10px] text-white/40">
        {Object.entries(categoryColors).map(([category, colors]) => (
          <div key={category} className="flex items-center gap-1.5">
            <div className={cn('w-3 h-3 rounded-full bg-gradient-to-br', colors.bg, colors.border, 'border')} />
            <span className="capitalize">{category}</span>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Brain className="w-12 h-12 text-white/10 mx-auto mb-4" />
            <p className="text-white/30">No memory nodes match your filters</p>
          </div>
        </div>
      )}
    </div>
  );
}
