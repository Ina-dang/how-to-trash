import { cva } from 'class-variance-authority';

export const regionPageMain = cva('p-6');

export const regionPageTitle = cva('mb-4 text-xl font-bold');

export const regionPageMeta = cva(
  'mb-4 rounded border p-4 text-sm text-slate-700',
);

export const regionPageCategoryGrid = cva('grid gap-4 md:grid-cols-3');

export const regionPageCard = cva('rounded border p-4');

export const regionPageSection = cva('mt-8 space-y-4');

export const regionPageSectionTitle = cva('text-lg font-semibold');

export const regionPageSubTitle = cva('font-semibold');

export const regionPageZoneTarget = cva('mt-1 text-sm text-slate-700');

export const regionPageZoneGrid = cva('mt-4 grid gap-4 md:grid-cols-3');

export const regionPageItemTitle = cva('font-semibold');

export const regionPageZoneItemTitle = cva('font-medium');

export const regionPageEmptyState = cva(
  'mt-6 rounded border p-4 text-sm text-slate-700',
);
