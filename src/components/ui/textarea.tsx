import { cn } from 'cn';
import * as React from 'react';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'border-ring placeholder:text-muted-foreground disabled:bg-input/50 aria-invalid:border-destructive bg-input flex field-sizing-content min-h-16 w-full rounded-sm border px-2.5 py-2 text-base transition-colors outline-none focus-visible:bg-transparent disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
