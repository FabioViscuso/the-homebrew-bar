import './globals.css';
import type { Metadata } from 'next';
import { Poiret_One, Sacramento } from 'next/font/google';

const poiret = Poiret_One({subsets: ['latin'] , weight: '400'});
const sacramento = Sacramento({subsets: ['latin'], weight: '400'});

export const metadata: Metadata = {
  title: 'The Homebrew Bar',
  description: 'A simple app to get inspiration for your next drink',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poiret.className}>{children}</body>
    </html>
  )
}
