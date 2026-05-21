import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/header';
import Footer from '@/components/footer';
import WhatsAppButton from '@/components/whatsapp-button';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://zkgarments.com'),
  title: {
    default: 'ZK Garments | Premium Fashion in Kondhwa, Pune',
    template: '%s | ZK Garments',
  },
  description: 'Premium readymade garments for Men, Women & Kids. Trendy, affordable fashion at ZK Garments, Kondhwa, Pune.',
  keywords: ['fashion', 'garments', 'clothing', 'Pune', 'Kondhwa', 'men fashion', 'women fashion', 'kids wear'],
  openGraph: {
    title: 'ZK Garments | Premium Fashion in Kondhwa, Pune',
    description: 'Premium readymade garments for Men, Women & Kids.',
    type: 'website',
    locale: 'en_IN',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppButton />
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
