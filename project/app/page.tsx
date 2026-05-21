'use client';

import HeroSection from '@/components/home/hero';
import FeaturedProducts from '@/components/home/featured-products';
import CategorySection from '@/components/home/categories';
import GallerySection from '@/components/home/gallery-section';
import TestimonialsSection from '@/components/home/testimonials-section';
import CTASection from '@/components/home/cta-section';
import MapSection from '@/components/home/map-section';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export default function Home() {
  const pathname = usePathname();

  return (
    <>
      <header
        className={cn(
          'fixed right-4 top-24 z-50',
          pathname.startsWith('/admin') && 'hidden'
        )}
      >
        <Button
          asChild
          size="sm"
          className="gap-2 shadow-lg"
        >
          <Link href="/admin"> 
            <ShieldCheck className="h-4 w-4" />
            Admin
          </Link>
        </Button>
      </header>

      <HeroSection />
      <FeaturedProducts />
      <CategorySection />
      <GallerySection />
      <TestimonialsSection />
      <CTASection />
      <MapSection />
    </>
  );
}

