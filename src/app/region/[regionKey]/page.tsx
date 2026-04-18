import { notFound } from 'next/navigation';

import { wasteGuides, type RegionKey } from '@/data/waste-guides';

type RegionPageProps = {
  params: Promise<{
    regionKey: string;
  }>;
};

export default async function Page({ params }: RegionPageProps) {
  const { regionKey } = await params;
  const wasteGuide = wasteGuides[regionKey as RegionKey];

  if (!wasteGuide) {
    notFound();
  }

  return (
    <main className='p-6'>
      <h1 className='text-xl font-bold mb-4'>{wasteGuide.region} 배출 기준</h1>

      {wasteGuide.categories.length === 0 ? (
        <div className='rounded border p-4 text-sm text-slate-700'>
          현재 이 지역의 배출 기준 데이터는 준비 중입니다.
        </div>
      ) : null}

      {wasteGuide.categories.map((item) => (
        <div key={item.label} className='border p-4 mb-4 rounded'>
          <h2 className='font-semibold'>{item.label}</h2>
          <p>🕒 {item.time}</p>
          <p>📦 {item.method}</p>
          <p>📍 {item.place}</p>
        </div>
      ))}
    </main>
  );
}
