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

      <div className='mb-4 rounded border p-4 text-sm text-slate-700'>
        <p>기준일: {wasteGuide.updatedAt}</p>
        <p>미수거일: {wasteGuide.nonCollectionDays}</p>
        <p>
          문의: {wasteGuide.contact.department} / {wasteGuide.contact.phone}
        </p>
        <p>출처: {wasteGuide.source.name}</p>
      </div>

      <div className='grid gap-4 md:grid-cols-3'>
        {wasteGuide.categories.map((item) => (
          <div key={item.label} className='rounded border p-4'>
            <h2 className='font-semibold'>{item.label}</h2>
            <p>🕒 {item.time}</p>
            <p>📦 {item.method}</p>
            <p>📍 {item.place}</p>
          </div>
        ))}
      </div>

      {wasteGuide.zones.length > 0 ? (
        <section className='mt-8 space-y-4'>
          <h2 className='text-lg font-semibold'>권역별 상세 기준</h2>

          {wasteGuide.zones.map((zone) => (
            <div key={zone.name} className='rounded border p-4'>
              <h3 className='font-semibold'>{zone.name}</h3>
              <p className='mt-1 text-sm text-slate-700'>
                대상 지역: {zone.targetAreas}
              </p>

              <div className='mt-4 grid gap-4 md:grid-cols-3'>
                {zone.categories.map((item) => (
                  <div key={`${zone.name}-${item.label}`} className='rounded border p-4'>
                    <h4 className='font-medium'>{item.label}</h4>
                    <p>🕒 {item.time}</p>
                    <p>📦 {item.method}</p>
                    <p>📍 {item.place}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      ) : (
        <div className='mt-6 rounded border p-4 text-sm text-slate-700'>
          권역 구분 없이 동일 기준이 적용됩니다.
        </div>
      )}
    </main>
  );
}
