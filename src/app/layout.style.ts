import { cva } from 'class-variance-authority';

export const rootLayoutBody = cva(
  'font-sans text-[var(--foreground)] antialiased',
);

export const rootLayoutShell = cva('flex min-h-screen flex-col');

export const rootLayoutContent = cva('flex-1');

export const rootLayoutFooter = cva(
  'border-t border-[var(--color-app-line)] bg-[var(--color-app-surface)]',
);

export const rootLayoutFooterInner = cva(
  'mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-5 text-sm leading-6 text-[var(--color-app-muted)] sm:px-8',
);

export const rootLayoutFooterLink = cva(
  'text-[var(--color-app-foreground)] underline underline-offset-4 transition-opacity hover:opacity-80',
);
