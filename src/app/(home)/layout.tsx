import type { ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import {
  NavbarMenu,
  NavbarMenuContent,
  NavbarMenuLink,
  NavbarMenuTrigger,
} from 'fumadocs-ui/layouts/home/navbar';
import { baseOptions } from '@/lib/layout.shared';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { defineI18nUI } from 'fumadocs-ui/i18n';
import { i18n } from '@/lib/i18n';
import '../global.css';

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

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <RootProvider i18n={provider('en')}>
          <HomeLayout
            {...baseOptions('en')}
            links={[
              {
                type: 'custom',
                on: 'nav',
                children: (
                  <NavbarMenu>
                    <NavbarMenuTrigger>Documentation</NavbarMenuTrigger>
                    <NavbarMenuContent>
                      <NavbarMenuLink href="/en/docs">Hello World</NavbarMenuLink>
                    </NavbarMenuContent>
                  </NavbarMenu>
                ),
              },
            ]}
          >
            {children}
          </HomeLayout>
        </RootProvider>
      </body>
    </html>
  );
}