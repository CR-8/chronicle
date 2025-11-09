import type { ReactNode } from 'react';
import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import '@/app/global.css'
import { Metadata } from 'next';

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

  return (
    <DocsLayout 
      {...baseOptions(lang)} 
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