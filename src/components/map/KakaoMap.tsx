'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { regionBoundaries } from '@/data/boundaries';
import { wasteGuides } from '@/data/waste-guides';
import { kakaoMap } from './KakaoMap.style';

const KAKAO_MAP_APP_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY;
const KAKAO_MAP_SCRIPT_ID = 'kakao-map-sdk';

declare global {
  interface Window {
    kakao?: {
      maps: {
        load: (callback: () => void) => void;
        LatLng: new (latitude: number, longitude: number) => unknown;
        LatLngBounds: new () => {
          extend: (latlng: unknown) => void;
        };
        Map: new (
          container: HTMLElement,
          options: { center: unknown; level: number },
        ) => {
          setBounds: (bounds: unknown) => void;
          setLevel: (
            level: number,
            options?: { animate?: boolean | { duration: number } },
          ) => void;
        };
        Polygon: new (options: {
          map: unknown;
          path: unknown[];
          strokeWeight: number;
          strokeColor: string;
          strokeOpacity: number;
          fillColor: string;
          fillOpacity: number;
        }) => {
          setMap: (map: unknown | null) => void;
          setOptions: (options: Record<string, unknown>) => void;
        };
        CustomOverlay: new (options: {
          map: unknown;
          position: unknown;
          content: string;
          yAnchor?: number;
          zIndex?: number;
        }) => {
          setMap: (map: unknown | null) => void;
        };
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
    let overlayCleanups: Array<() => void> = [];

    const initializeMap = async () => {
      try {
        const kakaoMaps = await loadKakaoMapsScript();

        if (isCancelled || !mapRef.current) {
          return;
        }

        mapRef.current.innerHTML = '';

        const bounds = new kakaoMaps.LatLngBounds();
        const regionEntries = Object.entries(wasteGuides).flatMap(
          ([regionKey, wasteGuide]) => {
            const boundary = regionBoundaries[regionKey];

            if (!boundary) {
              return [];
            }

            const path = boundary.path.map(
              ([latitude, longitude]) =>
                new kakaoMaps.LatLng(latitude, longitude),
            );

            path.forEach((point) => {
              bounds.extend(point);
            });

            return [
              {
                regionKey,
                name: wasteGuide.region,
                color: wasteGuide.color,
                center: new kakaoMaps.LatLng(
                  boundary.center[0],
                  boundary.center[1],
                ),
                path,
              },
            ];
          },
        );

        const mapContainer = mapRef.current;
        const mapOption = {
          center:
            regionEntries[0]?.center ?? new kakaoMaps.LatLng(37.526, 126.896),
          level: 7,
        };

        const map = new kakaoMaps.Map(mapContainer, mapOption);
        map.setBounds(bounds);

        regionEntries.forEach((region) => {
          const polygon = new kakaoMaps.Polygon({
            map,
            path: region.path,
            strokeWeight: 3,
            strokeColor: region.color.base,
            strokeOpacity: 0.9,
            fillColor: region.color.base,
            fillOpacity: 0.22,
          });
          const overlay = new kakaoMaps.CustomOverlay({
            map,
            position: region.center,
            yAnchor: 1.1,
            zIndex: 3,
            content: `<div style="padding:6px 10px;border-radius:9999px;background:rgba(255,255,255,0.92);border:1px solid ${region.color.base}33;font-size:13px;font-weight:700;color:${region.color.base};box-shadow:0 6px 16px rgba(15,23,42,0.12);white-space:nowrap;">${region.name}</div>`,
          });

          const setDefaultPolygonStyle = () => {
            polygon.setOptions({
              strokeWeight: 1,
              strokeColor: region.color.base,
              strokeOpacity: 0.9,
              fillColor: region.color.base,
              fillOpacity: 0.22,
            });
          };

          const setHoverPolygonStyle = () => {
            polygon.setOptions({
              strokeWeight: 2,
              strokeColor: region.color.hover,
              strokeOpacity: 1,
              fillColor: region.color.hover,
              fillOpacity: 0.35,
            });
          };

          setDefaultPolygonStyle();

          kakaoMaps.event.addListener(polygon, 'mouseover', () => {
            setHoverPolygonStyle();
          });

          kakaoMaps.event.addListener(polygon, 'mouseout', () => {
            setDefaultPolygonStyle();
          });

          kakaoMaps.event.addListener(polygon, 'click', () => {
            map.setLevel(6, {
              animate: {
                duration: 250,
              },
            });

            window.setTimeout(() => {
              router.push(`/region/${region.regionKey}`);
            }, 260);
          });

          overlayCleanups.push(() => {
            polygon.setMap(null);
            overlay.setMap(null);
          });
        });
      } catch {
        return;
      }
    };

    void initializeMap();

    return () => {
      isCancelled = true;
      overlayCleanups.forEach((cleanup) => cleanup());
      overlayCleanups = [];
    };
  }, [pathname, router]);

  return <div ref={mapRef} className={kakaoMap()} />;
}
