import { notFound } from 'next/navigation';
import Link from 'next/link';
import { InlineTOC } from 'fumadocs-ui/components/inline-toc';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { blog } from '@/lib/source';
import type { Metadata } from 'next';
import { ChevronLeft, Calendar, User } from 'lucide-react';

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);
  
  if (!page) notFound();
  
  const Mdx = page.data.body;

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-fd-muted-foreground hover:text-fd-foreground mb-6 transition-colors"
        >
          <ChevronLeft className="size-4" />
          Back to Blog
        </Link>
        
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">{page.data.title}</h1>
          <p className="text-xl text-fd-muted-foreground mb-6">
            {page.data.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-fd-muted-foreground border-t border-b py-4">
            <div className="flex items-center gap-2">
              <User className="size-4" />
              <span>{page.data.author}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <Calendar className="size-4" />
              <time dateTime={page.data.date.toString()}>
                {new Date(page.data.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-3xl">
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <InlineTOC items={page.data.toc} />
          <Mdx components={defaultMdxComponents} />
        </div>
      </article>

      {/* Footer */}
      <div className="max-w-3xl mt-12 pt-8 border-t">
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
        >
          <ChevronLeft className="size-4" />
          Back to Blog
        </Link>
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
