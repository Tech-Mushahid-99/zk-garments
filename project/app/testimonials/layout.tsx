import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Testimonials',
  description:
    'Read what our customers say about ZK Garments — honest reviews, real experiences, and stories from our community in Kondhwa, Pune.',
};

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
