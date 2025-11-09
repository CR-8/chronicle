import { RootProvider } from 'fumadocs-ui/provider/next';
import { defineI18nUI } from 'fumadocs-ui/i18n';
import { i18n } from '@/lib/i18n';
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
