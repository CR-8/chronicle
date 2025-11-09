import { notFound } from 'next/navigation';
import Link from 'next/link';
import { InlineTOC } from 'fumadocs-ui/components/inline-toc';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { blog } from '@/lib/source';
import type { Metadata } from 'next';
import { ChevronLeft, Calendar, User, Clock } from 'lucide-react';

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);
  
  if (!page) notFound();
  
  const Mdx = page.data.body;
  
  // Calculate reading time (rough estimate: 200 words per minute)
  const wordCount = page.data.body.toString().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <main className="min-h-screen">
      {/* Header Section with Gradient Background */}
      <div className="border-b bg-gradient-to-b from-fd-background to-fd-secondary/20">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-fd-muted-foreground hover:text-fd-foreground mb-8 transition-colors group"
          >
            <ChevronLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Back to Blog
          </Link>
          
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-br from-fd-foreground to-fd-muted-foreground bg-clip-text text-transparent">
              {page.data.title}
            </h1>
            
            {page.data.description && (
              <p className="text-lg md:text-xl text-fd-muted-foreground mb-8 leading-relaxed">
                {page.data.description}
              </p>
            )}
            
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-fd-muted-foreground">
                <div className="size-10 rounded-full bg-gradient-to-br from-fd-primary/20 to-fd-primary/5 flex items-center justify-center">
                  <User className="size-5 text-fd-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-fd-muted-foreground/70">Written by</span>
                  <span className="font-medium text-fd-foreground">{page.data.author}</span>
                </div>
              </div>
              
              <div className="h-8 w-px bg-fd-border" />
              
              <div className="flex items-center gap-2 text-fd-muted-foreground">
                <Calendar className="size-4" />
                <time dateTime={page.data.date.toString()} className="font-medium">
                  {new Date(page.data.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              
              <div className="flex items-center gap-2 text-fd-muted-foreground">
                <Clock className="size-4" />
                <span className="font-medium">{readingTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <article className="max-w-4xl mx-auto">
          <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h2:border-b prose-h2:pb-2 prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-a:text-fd-primary prose-a:no-underline hover:prose-a:underline prose-pre:bg-fd-secondary prose-pre:border prose-code:text-fd-primary prose-img:rounded-lg prose-img:shadow-lg">
            <InlineTOC items={page.data.toc} className="mb-8" />
            <Mdx components={defaultMdxComponents} />
          </div>
          
          {/* Footer Navigation */}
          <div className="mt-16 pt-8 border-t">
            <div className="flex items-center justify-between">
              <Link 
                href="/blog"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent transition-all group"
              >
                <ChevronLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                Back to All Posts
              </Link>
              
              <div className="flex items-center gap-3 text-sm text-fd-muted-foreground">
                <span>Share:</span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(page.data.title)}&url=${encodeURIComponent(`https://yoursite.com${page.url}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-md hover:bg-fd-accent hover:text-fd-foreground transition-colors"
                >
                  Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://yoursite.com${page.url}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-md hover:bg-fd-accent hover:text-fd-foreground transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}

export function generateStaticParams(): { slug: string }[] {
  return blog.getPages().map((page) => ({
    slug: page.slugs[0],
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = blog.getPage([params.slug]);
  
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    authors: [{ name: page.data.author }],
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      type: 'article',
      publishedTime: new Date(page.data.date).toISOString(),
      authors: [page.data.author],
    },
  };
}
