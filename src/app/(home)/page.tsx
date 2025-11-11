import Link from 'next/link';
import { cn } from '@/lib/cn';
import { Marquee } from './marquee';
import Image from 'next/image';
import { cva } from 'class-variance-authority';
import {
  BatteryChargingIcon,
  FileTextIcon,
  Heart,
  SearchIcon,
  TimerIcon,
  Cpu,
  Sword,
  Drone,
  CarFront,
  Volleyball,
  Code2,
  BookOpen,
} from 'lucide-react';
import {
  Hero,
  CreateAppAnimation,
  PreviewImages,
  Writing,
} from '@/app/(home)/page.client';

const headingVariants = cva('font-medium tracking-tight', {
  variants: {
    variant: {
      h2: 'text-3xl lg:text-4xl',
      h3: 'text-xl lg:text-2xl',
    },
  },
});

const buttonVariants = cva(
  'inline-flex justify-center px-5 py-3 rounded-full font-medium tracking-tight transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-brand text-brand-foreground hover:bg-fd-primary/90',
        secondary:
          'border bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-accent',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

const cardVariants = cva('rounded-2xl text-sm p-6 bg-origin-border shadow-lg', {
  variants: {
    variant: {
      secondary: 'bg-fd-secondary/50 border',
      default: 'border bg-fd-card',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export default function HomePage() {
  return (
    <main className="text-fd-foreground pt-4 pb-6 md:pb-12">
      <div className="relative flex min-h-[600px] h-[70vh] max-h-[900px] border rounded-2xl overflow-hidden mx-auto w-full max-w-[1400px] bg-origin-border">
        <Hero />
        <div className="flex flex-col z-2 px-4 size-full md:p-12 max-md:items-center max-md:text-center">
          <p className="mt-12 text-xs text-brand font-medium rounded-full p-2 border border-fd-primary/50 w-fit">
            The robotics documentation platform
          </p>
          <h1 className="text-4xl my-8 leading-tight font-medium xl:text-5xl xl:mb-12">
            Build Amazing Robots
            <br className="md:hidden" /> with
            <br />
            <span className="text-brand">Chronicle</span>
          </h1>
          <div className="flex flex-row items-center justify-center gap-4 flex-wrap w-fit">
            <Link
              href="/en/docs/basics/welcome"
              className={cn(buttonVariants(), 'max-sm:text-sm')}
            >
              Get Started
            </Link>
            <Link
              href="/blog"
              className={cn(
                buttonVariants({ variant: 'secondary' }),
                'max-sm:text-sm',
              )}
            >
              Read Blog
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 mt-12 px-6 mx-auto w-full max-w-[1400px] md:px-12 lg:grid-cols-2">
        <p className="text-2xl tracking-tight leading-snug font-light col-span-full md:text-3xl xl:text-4xl">
          Chronicle is a comprehensive{' '}
          <span className="text-brand font-medium">robotics platform</span>{' '}
          for building autonomous, combat, drone, racing, and soccer robots.
          Learn with{' '}
          <span className="text-brand font-medium">step-by-step guides</span>,
          explore{' '}
          <span className="text-brand font-medium">code examples</span>, and
          build your dream robot.
        </p>

        <Feedback />
        <Features />
        <RoboticsCategories />
        <ForEngineers />
        <OpenSource />
      </div>
    </main>
  );
}

function Features() {
  return (
    <>
      <div
        className={cn(
          cardVariants({
            variant: 'secondary',
            className: 'flex items-center justify-center p-0 min-h-[280px]',
          }),
        )}
      >
        <PreviewImages />
      </div>
      <div className={cn(cardVariants(), 'flex flex-col')}>
        <h3
          className={cn(headingVariants({ variant: 'h3', className: 'mb-6' }))}
        >
          Comprehensive Documentation
        </h3>
        <p className="mb-4">
          Chronicle offers well-organized documentation for all types of robotics
          projects, from basics to advanced implementations.
        </p>
        <p className="mb-4">
          Each category includes tutorials, code snippets, and real-world examples.
        </p>
        <ul className="text-xs list-disc list-inside space-y-2">
          <li>Autonomous robot programming</li>
          <li>Combat robotics strategies</li>
          <li>Drone control and navigation</li>
          <li>Racing robot optimization</li>
          <li>Soccer robot coordination</li>
        </ul>
      </div>
    </>
  );
}

function RoboticsCategories() {
  return (
    <Writing
      tabs={{
        basics: (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-xl border bg-fd-card p-6 space-y-4">
              <h3
                className={cn(
                  headingVariants({ variant: 'h3' }),
                )}
              >
                Start with the Basics
              </h3>
              <p className="text-sm text-fd-muted-foreground">
                Learn fundamental concepts and get your first robot up and running.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg border bg-fd-secondary/50">
                  <BookOpen className="size-5 mb-2 text-brand" />
                  <p className="text-xs font-medium">Welcome Guide</p>
                </div>
                <div className="p-3 rounded-lg border bg-fd-secondary/50">
                  <Code2 className="size-5 mb-2 text-brand" />
                  <p className="text-xs font-medium">Code Examples</p>
                </div>
              </div>
            </div>
            <div className="max-lg:row-start-1">
              <h3
                className={cn(
                  headingVariants({ variant: 'h3', className: 'my-4' }),
                )}
              >
                Perfect for Beginners
              </h3>
              <p className="mb-6">
                Our basics section provides everything you need to understand
                robotics fundamentals and start building.
              </p>
              <Link
                href="/en/docs/basics/welcome"
                className={cn(buttonVariants())}
              >
                Start Learning
              </Link>
            </div>
          </div>
        ),
        advanced: (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-xl border bg-fd-card p-6 space-y-4">
              <h3
                className={cn(
                  headingVariants({ variant: 'h3' }),
                )}
              >
                Advanced Robotics
              </h3>
              <p className="text-sm text-fd-muted-foreground">
                Dive deep into specialized robotics domains with expert guidance.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg border bg-fd-secondary/50">
                  <Cpu className="size-5 mb-2 text-brand" />
                  <p className="text-xs font-medium">Autonomous AI</p>
                </div>
                <div className="p-3 rounded-lg border bg-fd-secondary/50">
                  <Sword className="size-5 mb-2 text-brand" />
                  <p className="text-xs font-medium">Combat Systems</p>
                </div>
                <div className="p-3 rounded-lg border bg-fd-secondary/50">
                  <Drone className="size-5 mb-2 text-brand" />
                  <p className="text-xs font-medium">Drone Control</p>
                </div>
                <div className="p-3 rounded-lg border bg-fd-secondary/50">
                  <CarFront className="size-5 mb-2 text-brand" />
                  <p className="text-xs font-medium">Speed Racing</p>
                </div>
              </div>
            </div>
            <div className="max-lg:row-start-1">
              <h3
                className={cn(
                  headingVariants({ variant: 'h3', className: 'my-4' }),
                )}
              >
                Master Advanced Techniques
              </h3>
              <p className="mb-6">
                Learn cutting-edge robotics techniques, AI integration, and
                competition-ready strategies.
              </p>
              <Link
                href="/en/docs/autonomous/getting-started"
                className={cn(buttonVariants())}
              >
                Explore Advanced Topics
              </Link>
            </div>
          </div>
        ),
        examples: (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-xl border bg-fd-card p-6 space-y-4">
              <h3
                className={cn(
                  headingVariants({ variant: 'h3' }),
                )}
              >
                Real-World Projects
              </h3>
              <p className="text-sm text-fd-muted-foreground">
                Explore complete robot builds and learn from practical examples.
              </p>
              <ul className="text-xs space-y-2 list-disc list-inside">
                <li>Line-following autonomous robot</li>
                <li>Combat bot with weapon systems</li>
                <li>GPS-enabled racing drone</li>
                <li>Team-based soccer robots</li>
              </ul>
            </div>
            <div className="max-lg:row-start-1">
              <h3
                className={cn(
                  headingVariants({ variant: 'h3', className: 'my-4' }),
                )}
              >
                Learn by Building
              </h3>
              <p className="mb-6">
                Follow step-by-step project tutorials with code, schematics,
                and troubleshooting guides.
              </p>
              <Link
                href="/en/docs/basics/welcome"
                className={cn(buttonVariants())}
              >
                View Projects
              </Link>
            </div>
          </div>
        ),
      }}
    />
  );
}

const feedback = [
  {
    user: 'Student Robotics Club',
    avatar: 'https://avatars.githubusercontent.com/u/38025074',
    role: 'University Team',
    message: `Chronicle's documentation helped us build our first autonomous robot for competition. The guides are clear and the examples are perfect for learning!`,
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/10645823',
    user: 'Alex Chen',
    role: 'Robotics Enthusiast',
    message: `The combat robotics section is incredible. Detailed strategies, code samples, and real competition insights. Best robotics docs I've found.`,
  },
  {
    user: 'Sarah Kumar',
    role: 'Drone Developer',
    avatar: 'https://avatars.githubusercontent.com/u/35677084',
    message: 'Finally, a comprehensive drone programming guide that covers everything from basics to advanced flight control!',
  },
  {
    user: 'Team Phoenix',
    avatar: 'https://avatars.githubusercontent.com/u/10645823',
    role: 'Racing Team',
    message: `Our racing robots improved significantly after following Chronicle's optimization guides. The technical depth is outstanding.`,
  },
];

function Feedback() {
  return (
    <>
      <div className={cn(cardVariants())}>
        <h3
          className={cn(headingVariants({ variant: 'h3', className: 'mb-6' }))}
        >
          Trusted by Robotics Teams
        </h3>
        <p className="mb-6">
          Chronicle is used by students, hobbyists, and competition teams
          worldwide to build amazing robots.
        </p>
        <Link href="/blog" className={cn(buttonVariants())}>
          Read Success Stories
        </Link>
      </div>
<div
        className={cn(
          cardVariants({
            variant: 'secondary',
            className: 'relative p-0',
          }),
        )}
      >
        <div className="absolute inset-0 z-2 rounded-2xl" />
        <Marquee className="p-8" pauseOnHover={true}>
          {feedback.map((item) => (
            <div
              key={item.user}
              className="flex flex-col rounded-xl border bg-fd-card text-landing-foreground p-4 shadow-lg w-[320px]"
            >
              <p className="text-sm whitespace-pre-wrap">{item.message}</p>

              <div className="mt-auto flex flex-row items-center gap-2 pt-4">
                <Image
                  src={item.avatar}
                  alt="avatar"
                  width="32"
                  height="32"
                  unoptimized
                  className="size-8 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium">{item.user}</p>
                  <p className="text-xs text-fd-muted-foreground">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </>
  );
}

function ForEngineers() {
  return (
    <>
      <h2
        className={cn(
          headingVariants({
            variant: 'h2',
            className: 'text-brand text-center mb-4 col-span-full',
          }),
        )}
      >
        Built for Robotics Engineers
      </h2>

      <div className={cn(cardVariants(), 'flex flex-col')}>
        <h3
          className={cn(
            headingVariants({
              variant: 'h3',
              className: 'mb-6',
            }),
          )}
        >
          Multiple Robot Categories
        </h3>
        <p className="mb-6">
          Comprehensive guides for autonomous, combat, drone, racing, and soccer
          robots — all in one place.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="p-3 rounded-lg border text-center">
            <Cpu className="size-6 mx-auto mb-2 text-brand" />
            <p className="text-xs font-medium">Autonomous</p>
          </div>
          <div className="p-3 rounded-lg border text-center">
            <Sword className="size-6 mx-auto mb-2 text-brand" />
            <p className="text-xs font-medium">Combat</p>
          </div>
          <div className="p-3 rounded-lg border text-center">
            <Drone className="size-6 mx-auto mb-2 text-brand" />
            <p className="text-xs font-medium">Drone</p>
          </div>
          <div className="p-3 rounded-lg border text-center">
            <CarFront className="size-6 mx-auto mb-2 text-brand" />
            <p className="text-xs font-medium">Racing</p>
          </div>
          <div className="p-3 rounded-lg border text-center">
            <Volleyball className="size-6 mx-auto mb-2 text-brand" />
            <p className="text-xs font-medium">Soccer</p>
          </div>
          <div className="p-3 rounded-lg border text-center">
            <BookOpen className="size-6 mx-auto mb-2 text-brand" />
            <p className="text-xs font-medium">Basics</p>
          </div>
        </div>
      </div>

      <div className={cn(cardVariants())}>
        <h3
          className={cn(headingVariants({ variant: 'h3', className: 'mb-6' }))}
        >
          Code-First Approach
        </h3>
        <p className="mb-4">
          Every guide includes working code examples, circuit diagrams, and
          troubleshooting tips.
        </p>
        <ul className="text-xs list-disc list-inside space-y-2">
          <li>Arduino and Raspberry Pi examples</li>
          <li>Sensor integration guides</li>
          <li>Motor control algorithms</li>
          <li>Communication protocols</li>
          <li>AI and machine learning integration</li>
        </ul>
      </div>

      <div className={cn(cardVariants())}>
        <h3
          className={cn(headingVariants({ variant: 'h3', className: 'mb-6' }))}
        >
          Interactive Search
        </h3>
        <p className="mb-6">
          Quickly find the information you need with our powerful search feature.
        </p>
        <Search />
      </div>

      <div className={cn(cardVariants())}>
        <h3
          className={cn(headingVariants({ variant: 'h3', className: 'mb-6' }))}
        >
          Always Up-to-Date
        </h3>
        <p className="mb-6">
          Chronicle documentation is continuously updated with the latest
          robotics technologies and best practices.
        </p>
        <div className="flex gap-2">
          <Link href="/blog" className={cn(buttonVariants())}>
            Latest Updates
          </Link>
        </div>
      </div>
    </>
  );
}

const searchItemVariants = cva(
  'rounded-md p-2 text-sm text-fd-popover-foreground',
);

function Search() {
  return (
    <div className="flex select-none flex-col bg-fd-popover rounded-xl border">
      <div className="inline-flex items-center gap-2 px-4 py-3 text-sm text-fd-muted-foreground">
        <SearchIcon className="size-4" />
        Search documentation...
      </div>
      <div className="border-t p-2">
        {[
          ['Getting Started', 'Learn the basics of robotics'],
          ['Autonomous Robots', 'AI-powered robot programming'],
          // ['Combat Strategies', 'Build competitive combat bots'],
          // ['Drone Control', 'Master drone navigation'],
        ].map(([title, description], i) => (
          <div
            key={i}
            className={cn(searchItemVariants(), i === 0 && 'bg-fd-accent')}
          >
            <div className="flex flex-row items-center gap-2">
              <FileTextIcon className="size-4 text-fd-muted-foreground" />
              <p>{title}</p>
            </div>
            <p className="text-xs mt-2 text-fd-muted-foreground ps-6">
              {description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function OpenSource() {
  return (
    <>
      <h2
        className={cn(
          headingVariants({
            variant: 'h2',
            className: 'mt-8 text-brand text-center mb-4 col-span-full',
          }),
        )}
      >
        Start Building Today
      </h2>

      <div className={cn(cardVariants({ className: 'flex flex-col' }))}>
        <Heart fill="currentColor" className="text-red-500 mb-4" />
        <h3
          className={cn(
            headingVariants({
              variant: 'h3',
              className: 'mb-6',
            }),
          )}
        >
          Free & Open Knowledge
        </h3>
        <p className="mb-8">
          Chronicle is committed to making robotics education accessible to
          everyone. All our documentation is free and open.
        </p>
        <div className="flex flex-row items-center gap-2">
          <Link
            href="/en/docs/basics/welcome"
            className={cn(buttonVariants({ variant: 'primary' }))}
          >
            Start Learning
          </Link>
        </div>
      </div>

      <ul
        className={cn(
          cardVariants({
            className: 'flex flex-col gap-6',
          }),
        )}
      >
        <li>
          <span className="flex flex-row items-center gap-2 font-medium">
            <BatteryChargingIcon className="size-5" />
            Constantly Updated
          </span>
          <span className="mt-2 text-sm text-fd-muted-foreground">
            Regular updates with new tutorials and technologies.
          </span>
        </li>
        <li>
          <span className="flex flex-row items-center gap-2 font-medium">
            <Code2 className="size-5" />
            Practical Examples
          </span>
          <span className="mt-2 text-sm text-fd-muted-foreground">
            Every concept backed by working code and real projects.
          </span>
        </li>
        <li>
          <span className="flex flex-row items-center gap-2 font-medium">
            <TimerIcon className="size-5" />
            Quick Start Guides
          </span>
          <span className="mt-2 text-sm text-fd-muted-foreground">
            Get your robot running in minutes with our quick start tutorials.
          </span>
        </li>
        <li className="flex flex-row flex-wrap gap-2 mt-auto">
          <Link href="/en/docs/basics/welcome" className={cn(buttonVariants())}>
            Explore Documentation
          </Link>
          <Link
            href="/blog"
            className={cn(
              buttonVariants({
                variant: 'secondary',
              }),
            )}
          >
            Read Blog
          </Link>
        </li>
      </ul>
    </>
  );
}
