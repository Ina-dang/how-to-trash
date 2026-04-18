'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { kakaoMap } from './KakaoMap.style';

const KAKAO_MAP_APP_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY;
const KAKAO_MAP_SCRIPT_ID = 'kakao-map-sdk';

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

type KakaoMaps = NonNullable<Window['kakao']>['maps'];

let kakaoMapsScriptPromise: Promise<KakaoMaps> | null = null;

function loadKakaoMapsScript() {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Window is not available'));
  }

  if (window.kakao?.maps) {
    return Promise.resolve(window.kakao.maps);
  }

  if (kakaoMapsScriptPromise) {
    return kakaoMapsScriptPromise;
  }

  kakaoMapsScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById(
      KAKAO_MAP_SCRIPT_ID,
    ) as HTMLScriptElement | null;

    const handleLoad = () => {
      const kakaoMaps = window.kakao?.maps;

      if (!kakaoMaps) {
        reject(new Error('Kakao Maps SDK did not initialize'));
        return;
      }

      kakaoMaps.load(() => {
        resolve(kakaoMaps);
      });
    };

    if (existingScript) {
      if (window.kakao?.maps) {
        handleLoad();
        return;
      }

      existingScript.addEventListener('load', handleLoad, { once: true });
      existingScript.addEventListener(
        'error',
        () => reject(new Error('Failed to load Kakao Maps SDK')),
        { once: true },
      );
      return;
    }

    const script = document.createElement('script');
    script.id = KAKAO_MAP_SCRIPT_ID;
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_APP_KEY}&autoload=false`;
    script.addEventListener('load', handleLoad, { once: true });
    script.addEventListener(
      'error',
      () => reject(new Error('Failed to load Kakao Maps SDK')),
      { once: true },
    );
    document.head.appendChild(script);
  });

  return kakaoMapsScriptPromise;
}

export default function KakaoMap() {
  const pathname = usePathname();
  const router = useRouter();
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!KAKAO_MAP_APP_KEY || !mapRef.current) {
      return;
    }

    let isCancelled = false;

    const initializeMap = async () => {
      try {
        const kakaoMaps = await loadKakaoMapsScript();

        if (isCancelled || !mapRef.current) {
          return;
        }

        // Re-create the map container when returning via browser history.
        mapRef.current.innerHTML = '';

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
      } catch {
        return;
      }
    };

    initializeMap();

    return () => {
      isCancelled = true;
    };
  }, [pathname, router]);

  return <div ref={mapRef} className={kakaoMap()} />;
}
