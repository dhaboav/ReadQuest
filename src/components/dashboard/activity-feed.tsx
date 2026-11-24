import { Badge } from '@/components/ui/badge';

function ActivityItem({ log }: { log: (typeof dummyBooks)[number] }) {
  const formattedDate = new Date(`${log.date}T12:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
  });

  const statusLabel = {
    reading: 'Reading',
    completed: 'Completed',
    want_to_read: 'Want to Read',
  }[log.status];

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_56px_88px] items-center gap-3 border-b py-3">
      {/* Book Information */}
      <div className="min-w-0 space-y-1">
        <p className="truncate text-sm font-medium">{log.title}</p>

        <p className="text-muted-foreground truncate text-xs">
          {log.author} ⦁ {log.genre}
        </p>
      </div>

      {/* Date */}
      <span className="text-muted-foreground text-right text-xs whitespace-nowrap tabular-nums">
        {formattedDate}
      </span>

      {/* Status */}
      <Badge
        variant="secondary"
        className="text-tiny h-6 w-22 justify-center rounded-full font-medium whitespace-nowrap"
      >
        {statusLabel}
      </Badge>
    </div>
  );
}

const dummyBooks = [
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    date: '2018-10-16',
    status: 'completed',
    genre: 'Self Improvement',
  },
  {
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    date: '2020-09-08',
    status: 'reading',
    genre: 'Finance',
  },
  {
    title: 'Deep Work',
    author: 'Cal Newport',
    date: '2016-01-05',
    status: 'want_to_read',
    genre: 'Productivity',
  },
  {
    title: 'Rich Dad Poor Dad',
    author: 'Robert T. Kiyosaki',
    date: '1997-04-01',
    status: 'completed',
    genre: 'Finance',
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    date: '1988-01-01',
    status: 'reading',
    genre: 'Fiction',
  },
] as const;

export function ActivityFeed() {
  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <span className="font-bold">Recent Activity Log</span>
        <span>latest log</span>
      </div>
      <div className="pt-2">
        {dummyBooks.map((log, index) => (
          <ActivityItem key={index} log={log} />
        ))}
      </div>
    </>
  );
}
