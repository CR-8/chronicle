import { getLLMText, source } from '@/lib/source';
import type { NextRequest } from 'next/server';
import { notFound } from 'next/navigation';

export const revalidate = false;

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  const { slug } = await params;
  const page = source.getPage(slug);

  if (!page) notFound();

  const text = await getLLMText(page);

  return new Response(text, {
    headers: {
      'Content-Type': 'text/markdown',
    },
  });
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    slug: page.slugs,
  }));
}
