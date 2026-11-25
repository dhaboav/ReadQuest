import { Metadata } from 'next';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';

export const metadata: Metadata = { title: 'ReadQuest · Not Found' };

export default function NotFound() {
  return (
    <div className="bg-surface flex h-screen items-center justify-center">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="text-destructive mb-4 text-8xl font-bold tracking-tight">404</h1>
          <p className="mb-4 text-4xl font-bold tracking-tight text-white">Page not found.</p>
          <p className="text-minor mb-4 text-lg font-light text-white">
            Oops! Page not found. We cant seem to find the page you are looking for. Go back to home.
          </p>
          <Link href="/" className={buttonVariants({ size: 'lg' })}>
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
