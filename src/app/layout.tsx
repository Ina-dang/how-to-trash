import './globals.css';

import type { Metadata } from 'next';

import { rootLayoutBody } from './layout.style';

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
        {children}
      </body>
    </html>
  );
}
