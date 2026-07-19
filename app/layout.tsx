import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Shift',
  description: 'A gentle wellness app for calm movement and self-care.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
