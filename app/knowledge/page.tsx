'use client';

import { useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { Header } from '@/components/layout/header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { EmptyState } from '@/components/shared/empty-state';
import { sampleKnowledgeFiles } from '@/lib/mock-data';
import type { KnowledgeFile } from '@/lib/types';
import { cn } from '@/lib/utils';
import {
  Database,
  Folder,
  FileText,
  Search,
  Plus,
  Upload,
  RefreshCw,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

export default function KnowledgePage() {
  const [search, setSearch] = useState('');
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['/notes', '/research']));

  const toggleFolder = (path: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  const renderFileTree = (files: KnowledgeFile[], depth = 0) => {
    return files.map((file) => {
      const isExpanded = expandedFolders.has(file.path);
      const isSelected = selectedPath === file.path;
      const isFolder = file.type === 'folder';

      return (
        <div key={file.path}>
          <button
            onClick={() => {
              if (isFolder) {
                toggleFolder(file.path);
              }
              setSelectedPath(file.path);
            }}
            className={cn(
              'w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors text-left',
              'hover:bg-muted',
              isSelected && 'bg-muted',
              depth > 0 && 'ml-4'
            )}
            style={{ paddingLeft: `${8 + depth * 16}px` }}
          >
            {isFolder ? (
              <>
                <ChevronRight
                  className={cn(
                    'h-4 w-4 shrink-0 transition-transform',
                    isExpanded && 'rotate-90'
                  )}
                />
                <Folder className="h-4 w-4 shrink-0 text-primary" />
              </>
            ) : (
              <>
                <span className="w-4" />
                <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
              </>
            )}
            <span className="truncate">{file.name}</span>
            {file.children && file.children.length > 0 && (
              <Badge variant="secondary" className="text-xs ml-auto">
                {file.children.length}
              </Badge>
            )}
          </button>
          {isFolder && isExpanded && file.children && (
            <div>{renderFileTree(file.children, depth + 1)}</div>
          )}
        </div>
      );
    });
  };

  const selectedFile = findFile(sampleKnowledgeFiles, selectedPath);

  return (
    <AppShell>
      <div className="flex flex-col h-full">
        <Header
          title="Knowledge Vault"
          subtitle="Your personal knowledge base"
          actions={
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-1" />
                Sync
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                New File
              </Button>
            </div>
          }
        />

        <div className="flex-1 flex overflow-hidden">
          {/* File Tree */}
          <div className="w-64 border-r border-border flex flex-col">
            <div className="p-3 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search files..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 h-8"
                />
              </div>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-2">
                {renderFileTree(sampleKnowledgeFiles)}
              </div>
            </ScrollArea>
            <div className="p-3 border-t border-border">
              <Button variant="outline" size="sm" className="w-full">
                <Upload className="h-4 w-4 mr-1" />
                Upload Files
              </Button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {selectedFile ? (
              <>
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <div>
                    <h2 className="font-medium">{selectedFile.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      Last modified: {selectedFile.lastModified.toLocaleDateString()}
                      {selectedFile.size && ` • ${formatBytes(selectedFile.size)}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Open in Obsidian
                    </Button>
                  </div>
                </div>
                <ScrollArea className="flex-1 p-4">
                  {selectedFile.type === 'folder' ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Folder className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Select a file to view its contents</p>
                      <p className="text-sm mt-1">
                        {selectedFile.children?.length || 0} items in this folder
                      </p>
                    </div>
                  ) : (
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <p className="text-muted-foreground">
                        File preview would appear here. This is a mock interface.
                      </p>
                      <pre className="bg-muted p-4 rounded-lg text-sm">
                        {`# ${selectedFile.name}\n\nThis is sample content for the knowledge vault file.\n\nYou can connect this to your actual file system or Obsidian vault for real content.`}
                      </pre>
                    </div>
                  )}
                </ScrollArea>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <EmptyState
                  icon={Database}
                  title="Select a file"
                  description="Choose a file from the sidebar to view its contents"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function findFile(files: KnowledgeFile[], path: string | null): KnowledgeFile | null {
  if (!path) return null;
  for (const file of files) {
    if (file.path === path) return file;
    if (file.children) {
      const found = findFile(file.children, path);
      if (found) return found;
    }
  }
  return null;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
