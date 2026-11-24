'use client';

import { useQuery } from '@tanstack/react-query';
import { type SortingState, useTable } from '@tanstack/react-table';
import { cn } from 'cn';
import {
  ArrowUpDownIcon,
  BookOpenIcon,
  LayoutGridIcon,
  LayoutListIcon,
  SearchIcon,
  SlidersHorizontalIcon,
} from 'lucide-react';
import { useState } from 'react';

import { DeleteDialog } from '@/components/delete-dialog';
import { BookCover } from '@/components/library/book/book-cover';
import { BookFormDialog } from '@/components/library/book/book-form-dialog';
import { BookCard } from '@/components/library/book/table/book-card';
import { columns } from '@/components/library/book/table/book-columns';
import { features } from '@/components/library/table-features';
import { Badge } from '@/components/ui/badge';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { deleteBook, getBooks, updateBook } from '@/db/crud/book';
import type { Book } from '@/db/validators/book';

const SortOptions = [
  { label: 'Name A-Z', columnId: 'title', isDesc: false },
  { label: 'Name Z-A', columnId: 'title', isDesc: true },
  { label: 'Newest', columnId: 'created_at', isDesc: true },
  { label: 'Oldest', columnId: 'created_at', isDesc: false },
] as const;

const BOOK_STATUS = [
  { label: 'All', value: null },
  { label: 'Plan to Read', value: 'want' },
  { label: 'Reading', value: 'reading' },
  { label: 'Completed', value: 'completed' },
] as const;

const statusStyles = {
  reading: 'bg-blue-500/10 text-blue-500',
  completed: 'bg-green-500/10 text-green-500',
  want: 'bg-yellow-500/10 text-yellow-500',
} as const;

type BookStatus = keyof typeof statusStyles;

interface DataTableProps {
  initialData: Book[];
  className?: string;
}

// Empty State
function BookEmptyState() {
  return (
    <div className="p-12 text-center">
      <BookOpenIcon className="text-muted-foreground mx-auto mb-3" />
      <h3 className="font-semibold">No books found</h3>
      <p className="text-muted-foreground mt-1 text-sm">Try searching for another book.</p>
    </div>
  );
}

function BookGrid({ books }: { books: Book[] }) {
  return (
    <div className="mx-auto grid w-full grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

function BookList({ books }: { books: Book[] }) {
  return (
    <div className="border-border-strong rounded-sm border-2 p-2">
      <div className="custom-scrollbar overflow-auto">
        <Table className="w-full table-auto">
          <TableHeader className="bg-card text-xs">
            <TableRow className="hover:bg-transparent">
              <TableHead>BOOK</TableHead>
              <TableHead>GENRE</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead>READING PROGRESS</TableHead>
              <TableHead className="text-center">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {books.map((book) => {
              const progress =
                book.total_pages > 0
                  ? Math.min(100, Math.round(((book.current_page ?? 0) / book.total_pages) * 100))
                  : 0;

              return (
                <TableRow key={book.id}>
                  {/* Cover */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {/* Cover */}
                      <div className="h-16 w-11 shrink-0 overflow-hidden rounded-md">
                        <BookCover image={book.cover_img} />
                      </div>

                      <div className="flex flex-col gap-1">
                        <span className="line-clamp-2 font-semibold">{book.title}</span>

                        <span className="text-muted-foreground truncate text-sm">
                          {book.author?.name ?? '-'}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Genre */}
                  <TableCell>{book.genre?.name ?? '-'}</TableCell>

                  {/* Status */}
                  <TableCell>
                    {book.book_status && (
                      <Badge
                        variant="outline"
                        className={cn(
                          'rounded-full px-2 py-0.5 text-xs font-medium',
                          statusStyles[book.book_status as BookStatus],
                        )}
                      >
                        {book.book_status}
                      </Badge>
                    )}
                  </TableCell>

                  {/* Reading Progress */}
                  <TableCell>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">
                          {book.current_page ?? 0}/{book.total_pages} pages
                        </span>
                        <span className="text-primary font-semibold">{progress}%</span>
                      </div>

                      <div className="bg-muted h-1.5 overflow-hidden rounded-full">
                        <div
                          className="bg-primary h-full rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-center">
                    <BookFormDialog
                      showIcon={true}
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
                      showIcon={true}
                      entityType="Book"
                      onDeleteAction={() => deleteBook(book.id)}
                      queryKey={['books']}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export function BookTable({ initialData, className }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'created_at', desc: true }]);

  const { data } = useQuery({
    queryKey: ['books'],
    queryFn: getBooks,
    initialData,
  });

  const table = useTable({
    features,
    columns,
    data,
    onSortingChange: setSorting,
    globalFilterFn: 'includesString',
    state: { sorting },
  });

  const rows = table.getRowModel().rows;
  const isEmpty = rows.length === 0;
  const statusColumn = table.getColumn('book_status');
  const selectedSort = SortOptions.find((option) =>
    sorting.some((s) => s.id === option.columnId && s.desc === option.isDesc),
  );

  return (
    <Tabs
      defaultValue="grid"
      className={cn('flex h-full min-h-0 flex-col gap-4 overflow-hidden rounded-lg', className)}
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* Search */}
        <div className="w-full md:w-sm">
          <InputGroup>
            <InputGroupInput
              value={table.state.globalFilter ?? ''}
              onChange={(e) => table.setGlobalFilter(e.target.value)}
              placeholder="Search..."
            />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div className="flex w-full flex-col gap-1 md:w-fit md:flex-row">
          <div className="flex w-full gap-1 md:flex-row">
            <Select
              items={BOOK_STATUS.map((option) => ({
                ...option,
                value: option.value ?? 'all',
              }))}
              value={(statusColumn?.getFilterValue() as string) ?? 'all'}
              onValueChange={(value) => {
                statusColumn?.setFilterValue(value === 'all' ? undefined : value);
              }}
            >
              <SelectTrigger className="w-full md:max-w-40">
                <SlidersHorizontalIcon />
                <SelectValue />
              </SelectTrigger>

              <SelectContent alignItemWithTrigger={false}>
                {BOOK_STATUS.map((option) => (
                  <SelectItem key={option.label} value={option.value ?? 'all'}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedSort?.label ?? null}
              onValueChange={(value) => {
                const option = SortOptions.find((item) => item.label === value);
                if (!option) return;

                table.setSorting([{ id: option.columnId, desc: option.isDesc }]);
              }}
            >
              <SelectTrigger className="w-full md:max-w-40">
                <ArrowUpDownIcon />
                <SelectValue />
              </SelectTrigger>

              <SelectContent align="end" alignItemWithTrigger={false}>
                {SortOptions.map((option) => (
                  <SelectItem key={option.label} value={option.label}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* View Toggle */}
          <TabsList className="w-full border bg-transparent p-0 md:w-fit">
            <TabsTrigger value="grid" className="p-2">
              <LayoutGridIcon />
            </TabsTrigger>

            <TabsTrigger value="list" className="p-2">
              <LayoutListIcon />
            </TabsTrigger>
          </TabsList>
        </div>
      </div>

      {/* Grid View */}
      <TabsContent value="grid" className="mt-0">
        {isEmpty ? <BookEmptyState /> : <BookGrid books={rows.map((row) => row.original)} />}
      </TabsContent>

      {/* List View */}
      <TabsContent value="list" className="mt-0">
        {isEmpty ? <BookEmptyState /> : <BookList books={rows.map((row) => row.original)} />}
      </TabsContent>
    </Tabs>
  );
}
