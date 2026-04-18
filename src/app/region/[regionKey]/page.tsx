import { notFound } from 'next/navigation';

import { wasteGuides, type RegionKey } from '@/data/waste-guides';

import {
  regionPageCard,
  regionPageCategoryGrid,
  regionPageEmptyState,
  regionPageItemTitle,
  regionPageMain,
  regionPageMeta,
  regionPageSection,
  regionPageSectionTitle,
  regionPageSubTitle,
  regionPageTitle,
  regionPageZoneGrid,
  regionPageZoneItemTitle,
  regionPageZoneTarget,
} from './page.style';

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
    <main className={regionPageMain()}>
      <h1 className={regionPageTitle()}>{wasteGuide.region} 배출 기준</h1>

      <div className={regionPageMeta()}>
        <p>기준일: {wasteGuide.updatedAt}</p>
        <p>미수거일: {wasteGuide.nonCollectionDays}</p>
        <p>
          문의: {wasteGuide.contact.department} / {wasteGuide.contact.phone}
        </p>
        <p>출처: {wasteGuide.source.name}</p>
      </div>

      <div className={regionPageCategoryGrid()}>
        {wasteGuide.categories.map((item) => (
          <div key={item.label} className={regionPageCard()}>
            <h2 className={regionPageItemTitle()}>{item.label}</h2>
            <p>🕒 {item.time}</p>
            <p>📦 {item.method}</p>
            <p>📍 {item.place}</p>
          </div>
        ))}
      </div>

      {wasteGuide.zones.length > 0 ? (
        <section className={regionPageSection()}>
          <h2 className={regionPageSectionTitle()}>권역별 상세 기준</h2>

          {wasteGuide.zones.map((zone) => (
            <div key={zone.name} className={regionPageCard()}>
              <h3 className={regionPageSubTitle()}>{zone.name}</h3>
              <p className={regionPageZoneTarget()}>
                대상 지역: {zone.targetAreas}
              </p>

              <div className={regionPageZoneGrid()}>
                {zone.categories.map((item) => (
                  <div
                    key={`${zone.name}-${item.label}`}
                    className={regionPageCard()}
                  >
                    <h4 className={regionPageZoneItemTitle()}>{item.label}</h4>
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
        <div className={regionPageEmptyState()}>
          권역 구분 없이 동일 기준이 적용됩니다.
        </div>
      )}
    </main>
  );
}
