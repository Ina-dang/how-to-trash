import { cva } from 'class-variance-authority';

export const homePageMain = cva(
  'mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-5 py-8 sm:px-8 sm:py-10',
);

export const homePageTitle = cva(
  'text-3xl font-bold tracking-[-0.03em] text-[var(--color-app-foreground)] sm:text-4xl',
);

export const homePageDescription = cva(
  'rounded-2xl border border-[var(--color-app-line)] bg-[var(--color-app-surface)] px-5 py-4 text-base leading-7 text-[var(--color-app-muted)] shadow-[0_8px_20px_rgba(31,111,95,0.04)]',
);
