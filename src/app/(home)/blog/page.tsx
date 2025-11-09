import Link from 'next/link';
import { blog } from '@/lib/source';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';

export default function BlogPage() {
  const posts = blog.getPages();
  
  // Sort posts by date (newest first)
  const sortedPosts = [...posts].sort((a, b) => {
    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
  });

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="border-b bg-linear-to-b from-fd-background to-fd-secondary/20">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fd-primary/10 text-fd-primary text-sm font-medium mb-6">
              <BookOpen className="size-4" />
              Chronicle Blog
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-linear-to-br from-fd-foreground to-fd-muted-foreground bg-clip-text text-transparent">
              Stories & Insights
            </h1>
            <p className="text-xl md:text-2xl text-fd-muted-foreground leading-relaxed">
              Explore tutorials, updates, and technical insights from the Chronicle team
            </p>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        {posts.length === 0 ? (
          <div className="text-center py-24">
            <div className="inline-flex items-center justify-center size-16 rounded-full bg-fd-secondary mb-4">
              <BookOpen className="size-8 text-fd-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">No posts yet</h2>
            <p className="text-fd-muted-foreground">Check back soon for new content!</p>
          </div>
        ) : (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.url}
            href={post.url}
            className="block bg-fd-card border rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 text-fd-foreground">
                {post.data.title}
              </h2>
              <p className="text-fd-muted-foreground mb-4 line-clamp-2">
                {post.data.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-fd-muted-foreground">
                <span>{post.data.author}</span>
                <span>•</span>
                <time dateTime={post.data.date.toString()}>
                  {new Date(post.data.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
            </div>
          </Link>
        ))}
      </div>
        )}
      </div>
    </main>
  );
}
