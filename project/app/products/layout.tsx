import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Browse our collection of premium readymade garments for Men, Women & Kids. Trendy, affordable fashion at ZK Garments.',
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
