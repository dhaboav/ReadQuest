import { createColumnHelper } from '@tanstack/react-table';

import { DataTableFeatures } from '@/components/library/table-features';
import { Book } from '@/db/validators/book';

const columnHelper = createColumnHelper<DataTableFeatures, Book>();
export const columns = columnHelper.columns([
  columnHelper.accessor('title', {
    id: 'title',
  }),
  columnHelper.accessor('author.name', {
    id: 'author.name',
  }),
  columnHelper.accessor('genre.name', {
    id: 'genre.name',
  }),
  columnHelper.accessor('book_status', {
    id: 'book_status',
  }),
  columnHelper.accessor('created_at', {
    id: 'created_at',
    sortFn: 'datetime',
  }),
]);
