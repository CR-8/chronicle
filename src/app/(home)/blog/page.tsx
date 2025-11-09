import Link from 'next/link';
import { blog } from '@/lib/source';

export default function BlogPage() {
  const posts = blog.getPages();

  return (
    <main className="grow container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Chronicle Blog</h1>
        <p className="text-fd-muted-foreground">
          Latest updates, tutorials, and insights from the Chronicle team
        </p>
      </div>
      
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

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-fd-muted-foreground">No blog posts yet. Check back soon!</p>
        </div>
      )}
    </main>
  );
}
