import { createColumnHelper } from '@tanstack/react-table';

import { DeleteDialog } from '@/components/delete-dialog';
import { MetadataFormDialog } from '@/components/library/metadata/metadata-form-dialog';
import type { EntityType, MetadataItemTotalBook } from '@/components/library/metadata/types';
import { DataTableFeatures } from '@/components/library/table-features';
import { deleteAuthor, updateAuthor } from '@/db/crud/author';
import { deleteGenre, updateGenre } from '@/db/crud/genre';

const columnHelper = createColumnHelper<DataTableFeatures, MetadataItemTotalBook>();

export function createColumns({ entityType }: { entityType: EntityType }) {
  const updateAction = entityType === 'authors' ? updateAuthor : updateGenre;
  const deleteAction = entityType === 'authors' ? deleteAuthor : deleteGenre;
  return columnHelper.columns([
    columnHelper.accessor('name', {
      header: 'Name',
    }),
    columnHelper.accessor('totalBooks', {
      header: 'Total Books',
      enableGlobalFilter: false,
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      enableGlobalFilter: false,
      cell: ({ row }) => {
        const { id, name } = row.original;
        return (
          <div className="flex items-center gap-2">
            <MetadataFormDialog
              initialData={{ name }}
              entityType={entityType}
              onSubmitAction={(values) => updateAction(id, values)}
            />

            <DeleteDialog
              showIcon={true}
              entityType={entityType}
              onDeleteAction={() => deleteAction(id)}
              queryKey={[entityType]}
            />
          </div>
        );
      },
    }),
  ]);
}
