import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './global.css';

// We import these via next/font or we can just use normal CSS imports in global.css, 
// but to be safe with SSR and Next.js, we can also put links in the layout if needed.
// Actually, since this is Next.js, it's better to add the links to the <head> in the layout.

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Venture Traveloop Dashboard',
  description: 'Where will Venture Traveloop take you next?',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Montserrat:wght@400;600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased text-slate-800 bg-slate-50" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
