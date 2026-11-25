'use client';

import { useQueryClient } from '@tanstack/react-query';
import { TrashIcon } from 'lucide-react';
import { useActionState, useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Spinner } from '@/components/ui/spinner';
import { toast } from '@/components/ui/toast';

import { Button } from './ui/button';

interface DeleteDialogProps {
  entityType: string;
  onDeleteAction: () => Promise<{ success?: boolean; message?: string }>;
  queryKey?: unknown[];
  showIcon?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DeleteDialog({
  entityType,
  onDeleteAction,
  queryKey,
  showIcon = false,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: DeleteDialogProps) {
  const queryClient = useQueryClient();
  const [internalOpen, setInternalOpen] = useState(false);

  const open = controlledOpen ?? internalOpen;
  const onOpenChange = controlledOnOpenChange ?? setInternalOpen;

  const [_, formAction, isPending] = useActionState(async () => {
    try {
      const response = await onDeleteAction();

      toast.add({
        type: response.success ? 'success' : 'error',
        description:
          response.message ||
          (response.success ? `Success deleting ${entityType}.` : `Failed deleting ${entityType}.`),
      });

      if (response.success && queryKey) {
        await queryClient.invalidateQueries({ queryKey });
      }
    } catch {
      toast.add({
        type: 'error',
        description: 'An unexpected system error occurred.',
      });
    } finally {
      onOpenChange(false);
    }

    return null;
  }, null);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {showIcon && (
        <AlertDialogTrigger
          render={
            <Button variant="ghost" size="icon" className="text-destructive">
              <TrashIcon />
            </Button>
          }
        />
      )}

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {entityType}?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the selected{' '}
            <span className="text-foreground font-semibold">{entityType}</span> and remove its data from our
            servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline" disabled={isPending}>
            Cancel
          </AlertDialogCancel>

          <form action={formAction}>
            <AlertDialogAction type="submit" variant="destructive" disabled={isPending} className="w-full">
              {isPending && <Spinner data-icon="inline-start" />}
              Delete
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
