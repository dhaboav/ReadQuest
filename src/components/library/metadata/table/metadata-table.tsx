'use client';

import { useQuery } from '@tanstack/react-query';
import { type SortingState, useTable } from '@tanstack/react-table';
import { cn } from 'cn';
import { ArrowUpDownIcon, SearchIcon } from 'lucide-react';
import { useState } from 'react';

import { createColumns } from '@/components/library/metadata/table/metadata-columns';
import type { EntityType, MetadataItemTotalBook } from '@/components/library/metadata/types';
import { features } from '@/components/library/table-features';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getAuthors } from '@/db/crud/author';
import { getGenres } from '@/db/crud/genre';

const SortOptions = [
  { label: 'Name A-Z', columnId: 'name', isDesc: false },
  { label: 'Name Z-A', columnId: 'name', isDesc: true },
  { label: 'Most Books', columnId: 'totalBooks', isDesc: true },
  { label: 'Fewest Books', columnId: 'totalBooks', isDesc: false },
] as const;

interface MetadataTableProps {
  entityType: EntityType;
  initialData: MetadataItemTotalBook[];
}

export function MetadataTable({ entityType, initialData }: MetadataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'name', desc: false }]);

  const getFunc = entityType === 'authors' ? getAuthors : getGenres;

  const { data } = useQuery({
    queryKey: [entityType],
    queryFn: getFunc,
    initialData,
  });

  const columns = createColumns({ entityType: entityType });
  const table = useTable({
    features,
    columns,
    data: data,
    globalFilterFn: 'includesString',
    onSortingChange: setSorting,
    state: { sorting },
  });

  const selectedSort = SortOptions.find((option) =>
    sorting.some((s) => s.id === option.columnId && s.desc === option.isDesc),
  );

  return (
    <div className={cn('flex h-full flex-col overflow-hidden')}>
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3">
        <div className="w-full md:w-sm">
          <InputGroup>
            <InputGroupInput
              value={table.state.globalFilter ?? ''}
              onChange={(e) => table.setGlobalFilter(e.target.value)}
              placeholder="Search name..."
            />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>
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
            <SelectValue placeholder="Sort by" />
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

      <div className="flex-1 overflow-auto rounded-sm">
        <Table className="border-ring border">
          <TableHeader className="sticky top-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : <table.FlexRender header={header} />}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getAllCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
