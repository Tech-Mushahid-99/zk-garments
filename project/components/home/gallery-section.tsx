'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import type { GalleryImage } from '@/lib/types';

const FALLBACK_GALLERY = [
  { id: '1', image_url: 'https://images.pexels.com/photos/994517/pexels-photo-994517.jpeg?auto=compress&cs=tinysrgb&w=400', title: 'Store Interior', category: 'store', sort_order: 0, created_at: '' },
  { id: '2', image_url: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400', title: 'Mens Collection', category: 'men', sort_order: 1, created_at: '' },
  { id: '3', image_url: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=400', title: 'Womens Collection', category: 'women', sort_order: 2, created_at: '' },
  { id: '4', image_url: 'https://images.pexels.com/photos/886404/pexels-photo-886404.jpeg?auto=compress&cs=tinysrgb&w=400', title: 'Ethnic Wear', category: 'women', sort_order: 3, created_at: '' },
  { id: '5', image_url: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=400', title: 'Casual Wear', category: 'men', sort_order: 4, created_at: '' },
  { id: '6', image_url: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=400', title: 'Kids Fashion', category: 'kids', sort_order: 5, created_at: '' },
];

export default function GallerySection() {
  const [images, setImages] = useState<GalleryImage[]>(FALLBACK_GALLERY);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('gallery_images')
        .select('*')
        .order('sort_order', { ascending: true })
        .limit(6);
      if (data && data.length > 0) setImages(data as GalleryImage[]);
    })();
  }, []);

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">@zkgarments</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Follow Our Style</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {images.map((img, i) => (
            <motion.div
              key={img.id}
              className="relative aspect-square overflow-hidden rounded-lg group"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <img
                src={img.image_url}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">
                  {img.title}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/gallery">
              View Full Gallery <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
