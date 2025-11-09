'use client';

import {
  type ComponentProps,
  Fragment,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  useEffect,
  useState,
} from 'react';
import { ArrowRight, TerminalIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import Image from 'next/image';
import { cva } from 'class-variance-authority';
import { useTheme } from 'next-themes';

export function Hero() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <div
          className="absolute inset-0 animate-fd-fade-in duration-1000"
          style={{
            background:
              resolvedTheme === 'dark'
                ? `radial-gradient(circle at 20% 50%, rgba(255, 87, 87, 0.3) 0%, transparent 50%),
                   radial-gradient(circle at 80% 80%, rgba(255, 120, 100, 0.25) 0%, transparent 50%),
                   radial-gradient(circle at 40% 20%, rgba(255, 100, 80, 0.2) 0%, transparent 40%)`
                : `radial-gradient(circle at 20% 50%, rgba(255, 140, 100, 0.2) 0%, transparent 50%),
                   radial-gradient(circle at 80% 80%, rgba(255, 160, 120, 0.15) 0%, transparent 50%),
                   radial-gradient(circle at 40% 20%, rgba(255, 120, 100, 0.15) 0%, transparent 40%)`,
            filter: 'blur(60px)',
          }}
        />
      )}
      {/* Noise Texture Overlay */}
      {mounted && (
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      )}
      {/* Placeholder for robot/hero image */}
      <div className="absolute top-[400px] left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[400px] rounded-xl border-2 border-fd-border/50 bg-fd-muted/20 backdrop-blur-sm lg:top-[350px] animate-in fade-in duration-400 flex items-center justify-center">
        <div className="text-fd-muted-foreground text-sm">
          {/* Replace with your robot/demo image */}
          Chronicle Robot Preview
        </div>
      </div>
    </>
  );
}

export function CreateAppAnimation() {
  const installCmd = 'npm create fumadocs-app';
  const tickTime = 100;
  const timeCommandEnter = installCmd.length;
  const timeCommandRun = timeCommandEnter + 3;
  const timeCommandEnd = timeCommandRun + 3;
  const timeWindowOpen = timeCommandEnd + 1;
  const timeEnd = timeWindowOpen + 1;

  const [tick, setTick] = useState(timeEnd);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((prev) => (prev >= timeEnd ? prev : prev + 1));
    }, tickTime);

    return () => {
      clearInterval(timer);
    };
  }, [timeEnd]);

  const lines: ReactElement[] = [];

  lines.push(
    <span key="command_type">
      {installCmd.substring(0, tick)}
      {tick < timeCommandEnter && (
        <div className="inline-block h-3 w-1 animate-pulse bg-fd-foreground" />
      )}
    </span>,
  );

  if (tick >= timeCommandEnter) {
    lines.push(<span key="space"> </span>);
  }

  if (tick > timeCommandRun)
    lines.push(
      <Fragment key="command_response">
        {tick > timeCommandRun + 1 && (
          <>
            <span className="font-bold">◇ Project name</span>
            <span>│ my-chronicle-docs</span>
          </>
        )}
        {tick > timeCommandRun + 2 && (
          <>
            <span>│</span>
            <span className="font-bold">◆ Choose a template</span>
          </>
        )}
        {tick > timeCommandRun + 3 && (
          <>
            <span>│ ● Documentation Site</span>
            <span>│ ○ Blog Only</span>
            <span>│ ○ Documentation + Blog</span>
          </>
        )}
      </Fragment>,
    );

  return (
    <div
      className="relative mt-4 w-full mx-auto max-w-[800px]"
      onMouseEnter={() => {
        if (tick >= timeEnd) {
          setTick(0);
        }
      }}
    >
      {tick > timeWindowOpen && (
        <LaunchAppWindow className="absolute bottom-5 right-4 z-10 animate-in fade-in slide-in-from-top-10" />
      )}
      <pre className="overflow-hidden rounded-xl border text-[13px] shadow-lg bg-fd-card">
        <div className="flex flex-row items-center gap-2 border-b px-4 py-2">
          <TerminalIcon className="size-4" />{' '}
          <span className="font-bold">Terminal</span>
          <div className="grow" />
          <div className="size-2 rounded-full bg-red-400" />
        </div>
        <div className="min-h-[208px]">
          <code className="grid p-4">{lines}</code>
        </div>
      </pre>
    </div>
  );
}

function LaunchAppWindow(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        'overflow-hidden rounded-md border bg-fd-background shadow-xl',
        props.className,
      )}
    >
      <div className="relative flex h-6 flex-row items-center border-b bg-fd-muted px-4 text-xs text-fd-muted-foreground">
        <p className="absolute inset-x-0 text-center">localhost:3000</p>
      </div>
      <div className="p-4 text-sm">Chronicle Docs launched!</div>
    </div>
  );
}

const previewButtonVariants = cva(
  'w-24 h-8 text-sm font-medium transition-colors rounded-full',
  {
    variants: {
      active: {
        true: 'text-fd-primary-foreground',
        false: 'text-fd-muted-foreground',
      },
    },
  },
);

export function PreviewImages(props: ComponentProps<'div'>) {
  const [active, setActive] = useState(0);
  const previews = [
    { name: 'Basics' },
    { name: 'Combat' },
    { name: 'Drone' },
  ];

  return (
    <div {...props} className={cn('relative grid', props.className)}>
      <div className="absolute flex flex-row left-1/2 -translate-x-1/2 bottom-4 z-2 p-0.5 rounded-full bg-fd-card border shadow-xl">
        <div
          role="none"
          className="absolute bg-fd-primary rounded-full w-24 h-8 transition-transform z-[-1]"
          style={{
            transform: `translateX(calc(6rem * ${active}))`,
          }}
        />
        {previews.map((item, i) => (
          <button
            key={i}
            className={cn(previewButtonVariants({ active: active === i }))}
            onClick={() => setActive(i)}
          >
            {item.name}
          </button>
        ))}
      </div>
      {previews.map((item, i) => (
        <div
          key={i}
          className={cn(
            'col-start-1 row-start-1 select-none h-[400px] rounded-xl border bg-fd-muted/30 flex items-center justify-center',
            active === i
              ? 'animate-in fade-in slide-in-from-bottom-12 duration-800'
              : 'invisible',
          )}
        >
          <span className="text-fd-muted-foreground">{item.name} Preview</span>
        </div>
      ))}
    </div>
  );
}

const WritingTabs = [
  {
    name: 'Basics',
    value: 'basics',
  },
  {
    name: 'Advanced',
    value: 'advanced',
  },
  {
    name: 'Examples',
    value: 'examples',
  },
] as const;

export function Writing({
  tabs: tabContents,
}: {
  tabs: Record<(typeof WritingTabs)[number]['value'], ReactNode>;
}) {
  const [tab, setTab] =
    useState<(typeof WritingTabs)[number]['value']>('basics');

  return (
    <div className="col-span-full my-20">
      <h2 className="text-4xl text-fd-primary mb-8 text-center font-medium tracking-tight">
        Learn Robotics Programming.
      </h2>
      <p className="text-center mb-8 mx-auto w-full max-w-[800px]">
        From basic concepts to advanced robotics, Chronicle provides comprehensive
        documentation with code examples, tutorials, and real-world applications.
      </p>
      <div className="flex justify-center items-center gap-4 text-fd-muted-foreground mb-6">
        {WritingTabs.map((item) => (
          <Fragment key={item.value}>
            <ArrowRight className="size-4 first:hidden" />
            <button
              className={cn(
                'text-lg font-medium transition-colors',
                item.value === tab && 'text-fd-primary',
              )}
              onClick={() => setTab(item.value)}
            >
              {item.name}
            </button>
          </Fragment>
        ))}
      </div>
      {Object.entries(tabContents).map(([key, value]) => (
        <div
          key={key}
          aria-hidden={key !== tab}
          className={cn('animate-fd-fade-in', key !== tab && 'hidden')}
        >
          {value}
        </div>
      ))}
    </div>
  );
}
