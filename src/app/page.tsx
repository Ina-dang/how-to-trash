import KakaoMap from '@/components/map/KakaoMap';

import { homePageDescription, homePageMain, homePageTitle } from './page.style';

export default function Home() {
  return (
    <main className={homePageMain()}>
      <h1 className={homePageTitle()}>우리동네 분리수거 ️</h1>

      <p className={homePageDescription()}>
        지도에서 지역을 선택하면 배출 기준을 볼 수 있어요!! (현재는 관악구,
        영등포구, 양천구 데이터만 제공됩니다 ㅠㅠ)
      </p>

      <KakaoMap />
    </main>
  );
}
