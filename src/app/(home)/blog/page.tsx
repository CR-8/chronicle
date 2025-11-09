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
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sortedPosts.map((post) => (
              <Link
                key={post.url}
                href={post.url}
                className="group block bg-fd-card border rounded-xl hover:shadow-lg hover:border-fd-primary/20 transition-all duration-300 overflow-hidden"
              >
                {/* Card Header with Gradient */}
                <div className="h-2 bg-linear-to-r from-fd-primary/60 via-fd-primary/30 to-transparent" />
                
                <div className="p-6">
                  {/* Metadata */}
                  <div className="flex items-center gap-3 text-xs text-fd-muted-foreground mb-4">
                    <div className="flex items-center gap-1.5">
                      <User className="size-3.5" />
                      <span>{post.data.author}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="size-3.5" />
                      <time dateTime={post.data.date.toString()}>
                        {new Date(post.data.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </time>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold mb-3 text-fd-foreground group-hover:text-fd-primary transition-colors line-clamp-2">
                    {post.data.title}
                  </h2>

                  {/* Description */}
                  <p className="text-fd-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                    {post.data.description}
                  </p>

                  {/* Read More Link */}
                  <div className="flex items-center gap-2 text-sm font-medium text-fd-primary group-hover:gap-3 transition-all">
                    Read article
                    <ArrowRight className="size-4" />
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
