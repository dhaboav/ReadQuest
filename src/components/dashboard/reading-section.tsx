import { ArrowRightIcon, Link } from 'lucide-react';

import { BookCover } from '@/components/library/book/book-cover';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { getBooks } from '@/db/crud/book';
import { Book } from '@/db/validators/book';

function ReadingCard({ book }: { book: Book }) {
  const pagesPercentage =
    book.total_pages > 0 ? Math.round(((book.current_page ?? 0) / book.total_pages) * 100) : 0;

  return (
    <Card className="flex w-full min-w-0 flex-row items-center gap-3 p-4">
      <div className="h-24 w-16 shrink-0 overflow-hidden rounded-md">
        <BookCover image={book.cover_img} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <Badge className="w-fit">{book.book_status}</Badge>

        <div className="min-w-0">
          <p className="truncate font-medium">{book.title}</p>
          <p className="text-muted-foreground truncate text-sm">{book.author?.name}</p>
        </div>

        <span className="text-muted-foreground truncate text-xs">
          {book.genre?.name} ⦁ {book.published_year}
        </span>

        <div className="mt-auto space-y-2 pt-1">
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="text-muted-foreground font-medium">
              {book.current_page ?? 0} / {book.total_pages} Pgs
            </span>

            <span className="text-primary font-semibold">{pagesPercentage}%</span>
          </div>

          <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
            <div
              className="bg-primary h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.min(pagesPercentage, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

export async function ReadingSection() {
  const books = await getBooks();

  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <span className="font-bold">Currently Reading</span>

        <Link href="/library" className={buttonVariants({ variant: 'ghost', size: 'lg' })}>
          Library
          <ArrowRightIcon />
        </Link>
      </div>

      <Carousel className="w-full max-w-full min-w-0 pt-2">
        <CarouselContent>
          {books.map((book) => (
            <CarouselItem key={book.id} className="min-w-0 basis-full md:basis-1/3 lg:basis-1/4">
              <div className="h-full min-w-0 p-1">
                <ReadingCard book={book} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </>
  );
}
