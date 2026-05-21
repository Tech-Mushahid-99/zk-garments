import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Browse our style gallery — curated looks from ZK Garments featuring Men, Women, Kids fashion and our store in Kondhwa, Pune.',
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
