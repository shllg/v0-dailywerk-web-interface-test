'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { VaultFile } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ChevronRight,
  ChevronDown,
  File,
  Folder,
  FolderOpen,
  Search,
  Plus,
  RefreshCw,
  FolderTree,
} from 'lucide-react';

interface VaultSidebarProps {
  files: VaultFile[];
  selectedFile: VaultFile | null;
  expandedFolders: Set<string>;
  onSelectFile: (file: VaultFile) => void;
  onToggleFolder: (path: string) => void;
}

export function VaultSidebar({
  files,
  selectedFile,
  expandedFolders,
  onSelectFile,
  onToggleFolder,
}: VaultSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Build tree structure from flat files
  const buildTree = (files: VaultFile[]) => {
    const tree: Record<string, { files: VaultFile[]; folders: string[] }> = { '': { files: [], folders: [] } };

    files.forEach(file => {
      const parts = file.path.split('/');
      let currentPath = '';
      
      parts.slice(0, -1).forEach((part, i) => {
        const parentPath = currentPath;
        currentPath = currentPath ? `${currentPath}/${part}` : part;
        
        if (!tree[currentPath]) {
          tree[currentPath] = { files: [], folders: [] };
        }
        if (!tree[parentPath]) {
          tree[parentPath] = { files: [], folders: [] };
        }
        if (!tree[parentPath].folders.includes(currentPath)) {
          tree[parentPath].folders.push(currentPath);
        }
      });
      
      const folderPath = parts.slice(0, -1).join('/');
      if (!tree[folderPath]) {
        tree[folderPath] = { files: [], folders: [] };
      }
      tree[folderPath].files.push(file);
    });

    return tree;
  };

  const tree = buildTree(files);

  const renderFolder = (path: string, depth: number = 0) => {
    const node = tree[path];
    if (!node) return null;

    const folderName = path.split('/').pop() || 'Vault';
    const isExpanded = expandedFolders.has(path);
    const isRoot = path === '';

    return (
      <div key={path}>
        {!isRoot && (
          <button
            onClick={() => onToggleFolder(path)}
            className={cn(
              'w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm',
              'hover:bg-white/5 transition-colors',
              'text-foreground/80'
            )}
            style={{ paddingLeft: `${depth * 12 + 8}px` }}
          >
            <span className="text-white/30">
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </span>
            {isExpanded ? (
              <FolderOpen className="w-4 h-4 text-amber-500/70" />
            ) : (
              <Folder className="w-4 h-4 text-amber-500/70" />
            )}
            <span className="truncate">{folderName}</span>
            <span className="text-[10px] text-white/20 ml-auto">
              {node.files.length + node.folders.length}
            </span>
          </button>
        )}

        {(isRoot || isExpanded) && (
          <div>
            {node.folders.map(subPath => renderFolder(subPath, isRoot ? 0 : depth + 1))}
            {node.files.map(file => (
              <button
                key={file.id}
                onClick={() => onSelectFile(file)}
                className={cn(
                  'w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm',
                  'hover:bg-white/5 transition-colors',
                  selectedFile?.id === file.id
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground/60'
                )}
                style={{ paddingLeft: `${(isRoot ? 0 : depth + 1) * 12 + 8}px` }}
              >
                <File className="w-4 h-4 shrink-0" />
                <span className="truncate">{file.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn(
      'w-72 shrink-0 flex flex-col h-full',
      'bg-black/20 border-r border-white/5'
    )}>
      {/* Header */}
      <div className="p-4 border-b border-white/5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <FolderTree className="w-5 h-5 text-primary" />
            <h2 className="font-semibold">Vault</h2>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7 text-white/40 hover:text-white">
              <RefreshCw className="w-3.5 h-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-white/40 hover:text-white">
              <Plus className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              'w-full h-9 pl-9 pr-3 rounded-xl text-sm',
              'bg-white/5 border border-white/10',
              'placeholder:text-white/30',
              'focus:outline-none focus:border-primary/30'
            )}
          />
        </div>
      </div>

      {/* File tree */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {renderFolder('')}
        </div>
      </ScrollArea>

      {/* Footer stats */}
      <div className="p-3 border-t border-white/5">
        <div className="flex items-center justify-between text-[11px] text-white/30">
          <span>{files.length} files</span>
          <span>Synced with Obsidian</span>
        </div>
      </div>
    </div>
  );
}
