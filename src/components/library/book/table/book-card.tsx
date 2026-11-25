import { cn } from 'cn';
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { useRef, useState } from 'react';

import { DeleteDialog } from '@/components/delete-dialog';
import { BookCover } from '@/components/library/book/book-cover';
import { BookFormDialog, BookFormDialogRef } from '@/components/library/book/book-form-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteBook, updateBook } from '@/db/crud/book';
import { Book } from '@/db/validators/book';

const statusStyles = {
  reading: 'bg-blue-500/10 text-blue-500',
  completed: 'bg-green-500/10 text-green-500',
  want: 'bg-yellow-500/10 text-yellow-500',
} as const;

type BookStatus = keyof typeof statusStyles;

export function BookCard({ book }: { book: Book }) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const editDialogRef = useRef<BookFormDialogRef>(null);

  const pagesPercentage =
    book.total_pages > 0 ? Math.round(((book.current_page ?? 0) / book.total_pages) * 100) : 0;

  return (
    <>
      <BookFormDialog
        ref={editDialogRef}
        initialData={{
          isbn: book.isbn,
          title: book.title,
          cover_img: book.cover_img,
          author_id: book.author?.id,
          genre_id: book.genre?.id,
          published_year: book.published_year,
          total_pages: book.total_pages,
          book_status: book.book_status,
          current_page: book.current_page,
          description: book.description,
        }}
        onSubmitAction={(values) => updateBook(book.id, values)}
      />
      <DeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        entityType="Book"
        onDeleteAction={() => deleteBook(book.id)}
        queryKey={['books']}
      />

      <article className="border-ring hover:border-primary flex flex-col justify-between rounded-lg border p-3">
        <div className="bg-surface relative aspect-2/3 w-full overflow-hidden rounded-lg">
          <BookCover image={book.cover_img} />
          {book.book_status && (
            <Badge
              className={cn(
                'bg-surface! absolute top-2 left-2 rounded-full px-2 py-0.5 text-xs font-medium',
                statusStyles[book.book_status as BookStatus],
              )}
            >
              {book.book_status}
            </Badge>
          )}
          <div className="absolute top-2 right-2">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="outline"
                    size="icon-sm"
                    aria-label="More Options"
                    className="border-ring bg-surface/60 text-foreground hover:bg-surface/80 hover:text-primary backdrop-blur-md"
                  >
                    <EllipsisVerticalIcon />
                  </Button>
                }
              />

              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => editDialogRef.current?.openDialog()}>
                  <PencilIcon />
                  Update
                </DropdownMenuItem>

                <DropdownMenuItem variant="destructive" onClick={() => setDeleteOpen(true)}>
                  <TrashIcon />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-3 pt-2">
          {/* Book Title & Author */}
          <div className="space-y-1">
            <h2 className="line-clamp-2 text-base leading-snug font-bold tracking-tight">{book.title}</h2>

            <p className="text-muted-foreground line-clamp-1 text-sm">{book.author?.name}</p>
          </div>

          {/* Genre */}
          <Badge className="text-foreground bg-input rounded-md px-2.5 py-0.5 text-xs font-medium">
            {book.genre?.name}
          </Badge>

          {/* Reading Progress */}
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
                style={{ width: `${pagesPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
