import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Weather App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <link
          rel='icon'
          href='/icon.png'
          type='image/png'
          sizes='<generated>'
        />
      </head>
      <body className={montserrat.className}>
        <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
      </body>
    </html>
  );
}