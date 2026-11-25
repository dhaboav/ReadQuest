import { desc } from 'drizzle-orm';

import { Badge } from '@/components/ui/badge';
import { getBooks } from '@/db/crud/book';
import { book } from '@/db/schema';
import { Book } from '@/db/validators/book';

function ActivityItem({ book }: { book: Book }) {
  const formattedDate = book.updated_at.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
  });

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_56px_88px] items-center gap-3 border-b py-3">
      <div className="min-w-0 space-y-1">
        <p className="truncate text-sm font-medium">{book.title}</p>

        <p className="text-muted-foreground truncate text-xs">
          {book.author?.name} ⦁ {book.genre?.name}
        </p>
      </div>

      <span className="text-muted-foreground text-right text-xs whitespace-nowrap tabular-nums">
        {formattedDate}
      </span>

      <Badge
        variant="secondary"
        className="text-tiny h-6 w-22 justify-center rounded-full font-medium whitespace-nowrap"
      >
        {book.book_status ?? 'no status'}
      </Badge>
    </div>
  );
}

export async function ActivityFeed() {
  const books = await getBooks({
    limit: 5,
    order: desc(book.updated_at),
  });

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <span className="font-bold">Recent Activity Log</span>
        <span>latest log</span>
      </div>
      <div className="pt-2">
        {books.map((book) => (
          <ActivityItem key={book.id} book={book} />
        ))}
      </div>
    </>
  );
}
