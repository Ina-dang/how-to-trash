import './globals.css';

import {
  rootLayoutBody,
  rootLayoutContent,
  rootLayoutFooter,
  rootLayoutFooterInner,
  rootLayoutFooterLink,
  rootLayoutShell,
} from './layout.style';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'how-to-trash',
  description: '우리동네 분리수거 가이드 MVP',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={rootLayoutBody()}>
        <div className={rootLayoutShell()}>
          <div className={rootLayoutContent()}>{children}</div>

          <footer className={rootLayoutFooter()}>
            <div className={rootLayoutFooterInner()}>
              <p>
                데이터 출처:{' '}
                <a
                  href='https://www.data.go.kr/data/15075534/fileData.do#'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={rootLayoutFooterLink()}
                >
                  공공데이터포털 생활쓰레기 배출정보_서울특별시
                </a>
              </p>

              <p>
                지도 경계 좌표 출처:{' '}
                <a
                  href='https://github.com/southkorea/seoul-maps'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={rootLayoutFooterLink()}
                >
                  southkorea/seoul-maps 서울시 행정구역 GeoJSON
                </a>
              </p>

              <p>
                만든 사람:
                <a
                  href='https://h-owo-ld.tistory.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={rootLayoutFooterLink()}
                >
                  이나당
                </a>
              </p>

              <p>© 2026 inadang. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
