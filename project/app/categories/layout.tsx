import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Categories',
  description:
    'Browse our collections of premium readymade garments for Men, Women & Kids. Find the latest trends and styles at ZK Garments.',
};

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
