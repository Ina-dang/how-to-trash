import './globals.css';

import { Geist, Geist_Mono } from 'next/font/google';

import type { Metadata } from 'next';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

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
    <html lang='ko' className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className='font-sans text-[var(--foreground)] antialiased'>
        {children}
      </body>
    </html>
  );
}
