import { cva } from 'class-variance-authority';

export const regionPageMain = cva(
  'mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-5 py-8 sm:px-8 sm:py-10',
);

export const regionPageTitle = cva(
  'text-3xl font-bold tracking-[-0.03em] text-[var(--color-app-foreground)] sm:text-4xl',
);

export const regionPageMeta = cva(
  'grid gap-2 rounded-2xl border border-[var(--color-app-line)] bg-[var(--color-app-surface)] p-5 text-sm leading-6 text-[var(--color-app-muted)] shadow-[0_8px_20px_rgba(31,111,95,0.04)] sm:grid-cols-2',
);

export const regionPageCategoryGrid = cva(
  'grid gap-4 md:grid-cols-2 xl:grid-cols-3',
);

export const regionPageCard = cva(
  'rounded-2xl border border-[var(--color-app-line)] bg-[var(--color-app-surface)] p-5 shadow-[0_6px_18px_rgba(31,111,95,0.035)]',
);

export const regionPageSection = cva('space-y-4 pt-2');

export const regionPageSectionTitle = cva(
  'text-xl font-semibold tracking-[-0.02em] text-[var(--color-app-foreground)]',
);

export const regionPageSubTitle = cva(
  'text-lg font-semibold text-[var(--color-app-accent)]',
);

export const regionPageZoneTarget = cva(
  'mt-2 text-sm leading-6 text-[var(--color-app-muted)]',
);

export const regionPageZoneGrid = cva(
  'mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3',
);

export const regionPageItemTitle = cva(
  'mb-3 text-lg font-semibold tracking-[-0.02em] text-[var(--color-app-foreground)]',
);

export const regionPageZoneItemTitle = cva(
  'mb-3 text-base font-semibold tracking-[-0.01em] text-[var(--color-app-foreground)]',
);

export const regionPageEmptyState = cva(
  'rounded-2xl border border-dashed border-[var(--color-app-moss)] bg-[var(--color-app-highlight-soft)] p-5 text-sm leading-6 text-[var(--color-app-foreground)]',
);
