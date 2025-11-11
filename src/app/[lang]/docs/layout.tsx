import type { ReactNode } from 'react';
import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import '@/app/global.css'
import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, House } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Chronicle - Robotics Documentation Platform',
  description: 'Comprehensive robotics documentation for autonomous, combat, drone, racing, and soccer robots. Learn with step-by-step guides, code examples, and tutorials for building amazing robots.',
  keywords: ['robotics', 'autonomous robots', 'combat robots', 'drone programming', 'racing robots', 'soccer robots', 'robotics tutorials', 'robot documentation', 'Arduino', 'Raspberry Pi'],
  authors: [{ name: 'Chronicle Team' }],
  icons: {
    icon: '/icon.svg',
  },
}


export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: ReactNode;
}) {
  const { lang } = await params;

  const options = baseOptions(lang);
  options.links = [
    {
      text: 'Home',
      url: `/`,
      icon: <House className="size-4" />,
    },
    {
      text: 'Blog',
      url: '/blog',
      icon: <BookOpen className="size-4" />,
    },
    {
      text: 'Docs',
      url: `/${lang}/docs/basics/welcome`,
      icon: <BookOpen className="size-4" />,
    },
  ];

  return (
    <DocsLayout
      {...options}
      tree={source.pageTree[lang]}
      sidebar={{
        enabled: true,
        collapsible: true,
        tabs: {
        },
      }}
    >
      {children}
    </DocsLayout>
  );
}