import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Discover the story of ZK Garments — a family-run fashion store in Kondhwa, Pune, established in 2015, offering trendy, affordable fashion for Men, Women & Kids.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
