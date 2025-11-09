import Link from 'next/link';
import { blog } from '@/lib/source';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import { BlogSearch } from '@/components/blog-search';

export default function BlogPage() {
  const posts = blog.getPages();
  
  // Sort posts by date (newest first)
  const sortedPosts = [...posts].sort((a, b) => {
    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
  });

  // Prepare posts data for search
  const postsData = sortedPosts.map((post) => ({
    title: post.data.title,
    description: post.data.description || '',
    url: post.url,
    author: post.data.author,
    date: post.data.date.toString(),
  }));

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
            <p className="text-xl md:text-2xl text-fd-muted-foreground leading-relaxed mb-8">
              Explore tutorials, updates, and technical insights from the Chronicle team
            </p>
            
            {/* Search Bar */}
            {posts.length > 0 && <BlogSearch posts={postsData} />}
          </div>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-8">
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
              <p className="text-fd-muted-foreground mb-4 line-clamp-2 h-12">
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
    </main>
  );
}
