import { ArrowRightIcon } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

import { ActivityFeed } from '@/components/dashboard/activity-feed';
import { QuoteCard } from '@/components/dashboard/quote-card';
import { ReadingGoal } from '@/components/dashboard/reading-goal';
import { ReadingSection } from '@/components/dashboard/reading-section';
import { ReadingStats } from '@/components/dashboard/reading-stats';
import { PageHeader } from '@/components/page-header';
import { buttonVariants } from '@/components/ui/button';

export const metadata: Metadata = { title: 'Dashboard · ReadQuest' };

export default function DashboardPage() {
  return (
    <main className="mx-auto my-6 max-w-7xl">
      <PageHeader
        title="Dashboard"
        description="Overview & Reading Activity"
        action={
          <Link href="/library" className={buttonVariants({ variant: 'link' })}>
            Library
            <ArrowRightIcon />
          </Link>
        }
      />

      <div className="my-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <ReadingStats />
      </div>

      <section className="w-full max-w-full min-w-0">
        <Suspense fallback={<p>Loading reading section...</p>}>
          <ReadingSection />
        </Suspense>
      </section>

      <div className="grid min-w-0 grid-cols-1 gap-4 py-3 lg:grid-cols-2 lg:gap-12">
        <section className="flex min-w-0 flex-col gap-4 md:max-lg:flex-row lg:order-2">
          <QuoteCard />
          <ReadingGoal />
        </section>
        <section className="lg:order-1">
          <Suspense fallback={<p>Loading activity feed...</p>}>
            <ActivityFeed />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
