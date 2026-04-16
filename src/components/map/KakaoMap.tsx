'use client';

import { useEffect, useRef } from 'react';

import { useRouter } from 'next/navigation';
import { kakaoMap } from './KakaoMap.style';

const KAKAO_MAP_APP_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY;

declare global {
  interface Window {
    kakao?: {
      maps: {
        load: (callback: () => void) => void;
        LatLng: new (latitude: number, longitude: number) => unknown;
        Map: new (
          container: HTMLElement,
          options: { center: unknown; level: number },
        ) => unknown;
        event: {
          addListener: (
            target: unknown,
            type: string,
            handler: () => void,
          ) => void;
        };
      };
    };
  }
}

export default function KakaoMap() {
  const router = useRouter();
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!KAKAO_MAP_APP_KEY || !mapRef.current) {
      return;
    }

    const initializeMap = () => {
      const kakaoMaps = window.kakao?.maps;

      if (!kakaoMaps || !mapRef.current) {
        return;
      }

      kakaoMaps.load(() => {
        if (!mapRef.current) {
          return;
        }

        const coords = new kakaoMaps.LatLng(37.526, 126.896);
        const mapContainer = mapRef.current;
        const mapOption = {
          center: coords,
          level: 7,
        };

        const map = new kakaoMaps.Map(mapContainer, mapOption);

        kakaoMaps.event.addListener(map, 'click', () => {
          router.push('/region/yeongdeungpo');
        });
      });
    };

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[data-kakao-map='true']`,
    );

    if (existingScript) {
      initializeMap();
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.dataset.kakaoMap = 'true';
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_APP_KEY}&autoload=false`;
    document.head.appendChild(script);

    script.addEventListener('load', initializeMap);

    return () => {
      script.removeEventListener('load', initializeMap);
    };
  }, [router]);

  return <div ref={mapRef} className={kakaoMap()} />;
}
