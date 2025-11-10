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
import { cva } from 'class-variance-authority';
import {
  MeshGradient,
  Dithering,
  GrainGradient,
} from '@paper-design/shaders-react';
// import HeroImage from './hero-preview.jpeg';
import { useTheme } from 'next-themes';

export function Hero() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [imageReady, setImageReady] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <GrainGradient
          className="absolute inset-0 animate-fd-fade-in duration-1000"
          colors={
            resolvedTheme === 'dark'
              ? ['#39BE1C', '#9c2f05', '#7A2A0000']
              : ['#fcfc51', '#ffa057', '#7A2A0020']
          }
          colorBack="#00000000"
          softness={1}
          intensity={0.9}
          noise={0.5}
          shape="corners"
          speed={1}
        />
      )}
      {mounted && (
        <Dithering
          width={720}
          height={720}
          colorBack="#00000000"
          colorFront={resolvedTheme === 'dark' ? '#DF3F00' : '#fa8023'}
          shape="sphere"
          type="4x4"
          scale={0.5}
          size={3}
          speed={0.5}
          rotation={270}
          className="absolute max-lg:bottom-[-50%] max-lg:left-[-200px] animate-fd-fade-in duration-800 lg:top-[-5%] lg:right-0"
        />
      )}
      {/* <Image
        src={HeroImage}
        alt="Chronicle robot preview"
        className={cn(
          'absolute top-[460px] left-[20%] max-w-[1200px] rounded-xl border-2 lg:top-[400px]',
          imageReady ? 'animate-in fade-in duration-400' : 'invisible',
        )}
        onLoad={() => setImageReady(true)}
        priority
      /> */}
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
        <div className="inline-block h-3 w-1 animate-pulse bg-white" />
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
  'w-20 h-8 text-sm font-medium transition-colors rounded-full',
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
    {
      name: 'Basics',
      color: 'from-green-500/20 to-blue-500/20',
    },
    {
      name: 'Combat',
      color: 'from-red-500/20 to-orange-500/20',
    },
    {
      name: 'Drone',
      color: 'from-purple-500/20 to-pink-500/20',
    },
  ];

  return (
    <div {...props} className={cn('relative grid', props.className)}>
      <div className="absolute flex flex-row left-1/2 -translate-x-1/2 bottom-4 z-10 p-0.5 rounded-full bg-fd-card border shadow-xl">
        <div
          role="none"
          className="absolute bg-fd-primary rounded-full w-20 h-8 transition-transform z-[-1]"
          style={{
            transform: `translateX(calc(5rem * ${active}))`,
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
            'col-start-1 row-start-1 select-none rounded-xl border-2 bg-gradient-to-br',
            item.color,
            'min-h-[400px] flex items-center justify-center',
            active === i
              ? 'animate-in fade-in slide-in-from-bottom-12 duration-800'
              : 'invisible',
          )}
        >
          <div className="text-center p-8">
            <h3 className="text-2xl font-bold mb-2">{item.name} Documentation</h3>
            <p className="text-fd-muted-foreground">Preview coming soon</p>
          </div>
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
      <h2 className="text-4xl text-brand mb-8 text-center font-medium tracking-tight">
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
                item.value === tab && 'text-brand',
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

export function AgnosticImage(props: ComponentProps<typeof MeshGradient>) {
  const { resolvedTheme } = useTheme();
  return (
    <Dithering
      colorBack="#00000000"
      colorFront={resolvedTheme === 'dark' ? '#fc7744' : '#c6bb58'}
      shape="warp"
      type="4x4"
      speed={0.4}
      {...props}
    />
  );
}
