import { getPageImage, source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';
import { AISearchTrigger } from '@/components/search';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import { LLMCopyButton , ViewOptions , LanguageSwitcher , DownloadPDF } from '@/components/page-actions';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { Feedback } from '@/components/feedback';
import posthog from 'posthog-js';

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; slug?: string[] }>;
}) {
  const { slug, lang } = await params;
  const page = source.getPage(slug, lang);
  if (!page) notFound();

  const MDX = page.data.body;
  const owner = 'your-github-username';
  const repo = 'your-repo-name';

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
        <div className="flex flex-row gap-2 items-center border-b pt-2 pb-6">
          <LLMCopyButton markdownUrl={`${page.url}.mdx`} />
          <ViewOptions
            markdownUrl={`${page.url}.mdx`}
            githubUrl={`https://github.com/${owner}/${repo}/blob/dev/apps/docs/content/docs/${page.path}`}
          />
          <LanguageSwitcher />
          <DownloadPDF />
        </div>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
       <Feedback
        onRateAction={async (url, feedback) => {
          'use server';
          await posthog.capture('on_rate_docs', feedback);
          return { 
            githubUrl: 'https://github.com/CR-8/chronicle/issues'
          };
        }}
      />
      <AISearchTrigger />
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: {
    params: Promise<{ lang: string; slug?: string[] }>;
  },
): Promise<Metadata> {
  const params = await props.params;
  const { slug, lang } = params;
  const page = source.getPage(slug, lang);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
