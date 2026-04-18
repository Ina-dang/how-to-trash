export const wasteGuide = {
  regionKey: 'yeongdeungpo',
  region: '영등포구',
  color: {
    base: '#2563eb',
    hover: '#1d4ed8',
  },
  updatedAt: '2026-04-16',
  categories: [
    {
      label: '음식물쓰레기',
      time: '오후 8시 ~ 자정',
      method: '전용 용기 또는 RFID',
      place: '지정 장소',
    },
    {
      label: '생활쓰레기',
      time: '오후 8시 ~ 자정',
      method: '종량제 봉투',
      place: '지정 장소',
    },
    {
      label: '재활용품',
      time: '상시',
      method: '분리배출',
      place: '분리수거함',
    },
  ],
} as const;
