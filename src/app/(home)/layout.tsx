import type { ReactNode } from 'react';
import Image from 'next/image';
import type { Metadata } from 'next';
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
import Link from 'fumadocs-core/link';
import { 
  Book, 
  Sprout, 
  Cpu, 
  Sword, 
  Drone, 
  CarFront, 
  Volleyball,
  BookOpen
} from 'lucide-react';
import '../global.css';

export const metadata: Metadata = {
  title: 'Chronicle - Robotics Documentation Platform',
  description: 'Comprehensive robotics documentation for autonomous, combat, drone, racing, and soccer robots. Learn with step-by-step guides, code examples, and tutorials for building amazing robots.',
  keywords: ['robotics', 'autonomous robots', 'combat robots', 'drone programming', 'racing robots', 'soccer robots', 'robotics tutorials', 'robot documentation', 'Arduino', 'Raspberry Pi'],
  authors: [{ name: 'Chronicle Team' }],
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: 'Chronicle - Robotics Documentation Platform',
    description: 'Build amazing robots with Chronicle. Comprehensive guides for autonomous, combat, drone, racing, and soccer robotics.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chronicle - Robotics Documentation Platform',
    description: 'Build amazing robots with Chronicle. Comprehensive guides for autonomous, combat, drone, racing, and soccer robotics.',
  },
};

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
                    <NavbarMenuTrigger>
                      <Link href="/en/docs/basics/welcome">Documentation</Link>
                    </NavbarMenuTrigger>
                    <NavbarMenuContent className="text-[15px]">
                      <NavbarMenuLink href="/en/docs/basics/welcome" className="md:row-span-2">
                        <div className="p-1 rounded-lg bg-brand mb-2">
                          <Image
                            src="/home.png"
                            alt="Getting Started"
                            width={520}
                            height={300}
                            className="rounded-lg"
                          />
                        </div>
                        <p className="font-medium">Getting Started</p>
                        <p className="text-fd-muted-foreground text-sm">
                          Learn the basics of Chronicle robotics platform.
                        </p>
                      </NavbarMenuLink>

                      <NavbarMenuLink
                        href="/en/docs/autonomous/getting-started"
                        className="lg:col-start-2"
                      >
                        <Cpu className="bg-brand text-fd-primary-foreground p-1 mb-2 rounded-md size-6" />
                        <p className="font-medium">Autonomous</p>
                        <p className="text-fd-muted-foreground text-sm">
                          Build autonomous robots with AI capabilities.
                        </p>
                      </NavbarMenuLink>

                      <NavbarMenuLink
                        href="/en/docs/combat/start"
                        className="lg:col-start-2"
                      >
                        <Sword className="bg-brand text-fd-primary-foreground p-1 mb-2 rounded-md size-6" />
                        <p className="font-medium">Combat</p>
                        <p className="text-fd-muted-foreground text-sm">
                          Create powerful combat robots and battle strategies.
                        </p>
                      </NavbarMenuLink>

                      <NavbarMenuLink
                        href="/en/docs/drone/get"
                        className="lg:col-start-3 lg:row-start-1"
                      >
                        <Drone className="bg-brand text-fd-primary-foreground p-1 mb-2 rounded-md size-6" />
                        <p className="font-medium">Drone</p>
                        <p className="text-fd-muted-foreground text-sm">
                          Program and control drones with Chronicle.
                        </p>
                      </NavbarMenuLink>

                      <NavbarMenuLink
                        href="/en/docs/race/button"
                        className="lg:col-start-3 lg:row-start-2"
                      >
                        <CarFront className="bg-brand text-fd-primary-foreground p-1 mb-2 rounded-md size-6" />
                        <p className="font-medium">Race</p>
                        <p className="text-fd-muted-foreground text-sm">
                          Build high-speed racing robots and components.
                        </p>
                      </NavbarMenuLink>
                    </NavbarMenuContent>
                  </NavbarMenu>
                ),
                },
                {
                text: 'Documentation',
                url: "/en/docs/basics/welcome",
                on: 'menu',
                },
               {
                text: 'Blog',
                url: '/blog',
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