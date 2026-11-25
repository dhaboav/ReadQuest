'use client';

import { useQuery } from '@tanstack/react-query';
import {
  BookOpenTextIcon,
  BookmarkIcon,
  CircleCheckBigIcon,
  LucideIcon,
  SquareLibraryIcon,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getBookStats } from '@/db/crud/book';

interface ReadingStatCardProps {
  label: string;
  icon: LucideIcon;
  data: number;
  description: string;
}

function ReadingStatCard({ icon: Icon, ...props }: ReadingStatCardProps) {
  return (
    <Card className="flex w-full p-2">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          {props.label}
          <Icon />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-baseline gap-1.5">
        <span className="text-primary text-3xl font-bold">{props.data}</span>
        <span className="text-muted-foreground text-sm">{props.description}</span>
      </CardContent>
    </Card>
  );
}

export function ReadingStats() {
  const { data: bookStats, isLoading } = useQuery({
    queryKey: ['book-stats'],
    queryFn: getBookStats,
  });

  const cardInfo = [
    {
      label: 'Total Books',
      icon: SquareLibraryIcon,
      content: bookStats?.totalBooks ?? 0,
      desc: 'titles cataloged',
    },
    {
      label: 'Reading',
      icon: BookOpenTextIcon,
      content: bookStats?.readingBooks ?? 0,
      desc: 'currently reading',
    },
    {
      label: 'Completed',
      icon: CircleCheckBigIcon,
      content: bookStats?.completedBooks ?? 0,
      desc: 'read in full',
    },
    {
      label: 'Unread',
      icon: BookmarkIcon,
      content: bookStats?.unreadBooks ?? 0,
      desc: 'waiting to be read',
    },
  ] as const;

  return (
    <>
      {cardInfo.map((item) => (
        <ReadingStatCard
          key={item.label}
          label={item.label}
          icon={item.icon}
          data={isLoading ? 0 : Number(item.content)}
          description={item.desc}
        />
      ))}
    </>
  );
}
