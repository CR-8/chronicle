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
                type: 'menu',
                on: 'menu',
                text: 'Documentation',
                items: [
                  {
                    text: 'Basics',
                    url: '/en/docs/basics/welcome',
                    icon: <Sprout className="size-4" />,
                    description: 'Get started with Chronicle basics',
                  },
                  {
                    text: 'Autonomous',
                    url: '/en/docs/autonomous/getting-started',
                    icon: <Cpu className="size-4" />,
                    description: 'Autonomous robot tutorials',
                  },
                  {
                    text: 'Combat',
                    url: '/en/docs/combat/start',
                    icon: <Sword className="size-4" />,
                    description: 'Combat robotics guide',
                  },
                  {
                    text: 'Drone',
                    url: '/en/docs/drone/get',
                    icon: <Drone className="size-4" />,
                    description: 'Drone programming tutorials',
                  },
                  {
                    text: 'Race',
                    url: '/en/docs/race/button',
                    icon: <CarFront className="size-4" />,
                    description: 'Racing robot components',
                  },
                  {
                    text: 'Soccer',
                    url: '/en/docs/soccer/getstarted',
                    icon: <Volleyball className="size-4" />,
                    description: 'Soccer robot setup',
                  },
                ],
              },
              {
                type: 'custom',
                on: 'nav',
                children: (
                  <NavbarMenu>
                    <NavbarMenuTrigger>
                      <Link href="/en/docs">Documentation</Link>
                    </NavbarMenuTrigger>
                    <NavbarMenuContent className="text-[15px]">
                      <NavbarMenuLink href="/en/docs/basics/welcome" className="md:row-span-2">
                        <div className="p-4 rounded-lg bg-linear-to-br from-fd-primary/10 to-fd-primary/5 mb-2">
                          <Sprout className="size-8 text-fd-primary" />
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
                        <Cpu className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md size-6" />
                        <p className="font-medium">Autonomous</p>
                        <p className="text-fd-muted-foreground text-sm">
                          Build autonomous robots with AI capabilities.
                        </p>
                      </NavbarMenuLink>

                      <NavbarMenuLink
                        href="/en/docs/combat/start"
                        className="lg:col-start-2"
                      >
                        <Sword className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md size-6" />
                        <p className="font-medium">Combat</p>
                        <p className="text-fd-muted-foreground text-sm">
                          Create powerful combat robots and battle strategies.
                        </p>
                      </NavbarMenuLink>

                      <NavbarMenuLink
                        href="/en/docs/drone/get"
                        className="lg:col-start-3 lg:row-start-1"
                      >
                        <Drone className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md size-6" />
                        <p className="font-medium">Drone</p>
                        <p className="text-fd-muted-foreground text-sm">
                          Program and control drones with Chronicle.
                        </p>
                      </NavbarMenuLink>

                      <NavbarMenuLink
                        href="/en/docs/race/button"
                        className="lg:col-start-3 lg:row-start-2"
                      >
                        <CarFront className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md size-6" />
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
                text: 'Blog',
                url: '/blog',
                icon: <BookOpen className="size-4" />,
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