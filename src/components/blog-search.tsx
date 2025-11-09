'use client';

import { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import Link from 'next/link';

interface BlogPost {
  title: string;
  description: string;
  url: string;
  author: string;
  date: string;
}

interface BlogSearchProps {
  posts: BlogPost[];
}

export function BlogSearch({ posts }: BlogSearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setFilteredPosts([]);
      return;
    }

    const searchQuery = query.toLowerCase();
    const filtered = posts.filter((post) => {
      return (
        post.title.toLowerCase().includes(searchQuery) ||
        post.description.toLowerCase().includes(searchQuery) ||
        post.author.toLowerCase().includes(searchQuery)
      );
    });

    setFilteredPosts(filtered);
  }, [query, posts]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Search Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border bg-fd-card hover:bg-fd-accent transition-colors text-sm text-fd-muted-foreground w-full max-w-md"
      >
        <Search className="size-4" />
        <span>Search blog posts...</span>
        <kbd className="ml-auto hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-fd-muted px-1.5 font-mono text-xs font-medium text-fd-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Search Dialog */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-fd-background/80 backdrop-blur-sm"
          onClick={() => {
            setIsOpen(false);
            setQuery('');
          }}
        >
          <div
            className="fixed left-1/2 top-[20%] -translate-x-1/2 w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-fd-popover border rounded-xl shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center border-b px-4">
                <Search className="size-4 text-fd-muted-foreground" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search blog posts..."
                  className="flex-1 bg-transparent px-4 py-4 text-sm outline-none placeholder:text-fd-muted-foreground"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setQuery('');
                  }}
                  className="p-2 hover:bg-fd-accent rounded-md transition-colors"
                >
                  <X className="size-4 text-fd-muted-foreground" />
                </button>
              </div>

              {/* Search Results */}
              <div className="max-h-[400px] overflow-y-auto p-2">
                {query && filteredPosts.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-fd-muted-foreground">
                    No blog posts found for "{query}"
                  </div>
                ) : query && filteredPosts.length > 0 ? (
                  <div className="space-y-1">
                    {filteredPosts.map((post) => (
                      <Link
                        key={post.url}
                        href={post.url}
                        onClick={() => {
                          setIsOpen(false);
                          setQuery('');
                        }}
                        className="block rounded-lg p-3 hover:bg-fd-accent transition-colors"
                      >
                        <div className="font-medium text-sm mb-1">
                          {post.title}
                        </div>
                        <div className="text-xs text-fd-muted-foreground line-clamp-2 mb-2">
                          {post.description}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-fd-muted-foreground">
                          <span>{post.author}</span>
                          <span>•</span>
                          <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </time>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-8 text-center text-sm text-fd-muted-foreground">
                    Start typing to search blog posts
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t px-4 py-3 text-xs text-fd-muted-foreground flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-fd-muted border text-xs">↵</kbd>
                    <span>to select</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-fd-muted border text-xs">ESC</kbd>
                    <span>to close</span>
                  </div>
                </div>
                <div>{filteredPosts.length} results</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
