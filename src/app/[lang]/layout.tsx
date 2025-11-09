import { RootProvider } from 'fumadocs-ui/provider/next';
import { defineI18nUI } from 'fumadocs-ui/i18n';
import { i18n } from '@/lib/i18n';
import type { Metadata } from 'next';
import '@/app/global.css'


const { provider } = defineI18nUI(i18n, {
  translations: {
    en: {
      displayName: 'English',
    },
    hi: {
      displayName: 'Hindi',
      search: 'खोज दस्तावेज़',
    },
  },
});

export const metadata: Metadata = {
  title: 'Chronicle - Robotics Documentation Platform',
  description: 'Comprehensive robotics documentation for autonomous, combat, drone, racing, and soccer robots. Learn with step-by-step guides, code examples, and tutorials for building amazing robots.',
  keywords: ['robotics', 'autonomous robots', 'combat robots', 'drone programming', 'racing robots', 'soccer robots', 'robotics tutorials', 'robot documentation', 'Arduino', 'Raspberry Pi'],
  authors: [{ name: 'Chronicle Team' }],
  icons: {
    icon: '/icon.svg',
  },
}

export default async function RootLayout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
}) {
  const lang = (await params).lang;

  return (
    <html lang={lang} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <RootProvider
          i18n={provider(lang)}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
