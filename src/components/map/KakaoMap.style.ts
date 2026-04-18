import { cva } from 'class-variance-authority';

/**
 * 카카오맵 컨테이너 스타일
 * 홈 화면에서 지도를 표시하는 영역
 */
export const kakaoMap = cva(
  'h-[520px] w-full overflow-hidden rounded-[28px] border border-[var(--color-app-line)] bg-[var(--color-app-surface)] shadow-[0_10px_28px_rgba(31,111,95,0.06)]',
);
