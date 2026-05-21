'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { GalleryImage } from '@/lib/types';

const CATEGORIES = ['All', 'Store', 'Men', 'Women', 'Kids'] as const;
type CategoryFilter = (typeof CATEGORIES)[number];

const fallbackImages: GalleryImage[] = [
  {
    id: '1',
    image_url:
      'https://images.pexels.com/photos/994517/pexels-photo-994517.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Our Store',
    category: 'store',
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    image_url:
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Mens Collection',
    category: 'men',
    sort_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    image_url:
      'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Womens Elegance',
    category: 'women',
    sort_order: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    image_url:
      'https://images.pexels.com/photos/886404/pexels-photo-886404.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Womens Casual',
    category: 'women',
    sort_order: 4,
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    image_url:
      'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Mens Casual Wear',
    category: 'men',
    sort_order: 5,
    created_at: new Date().toISOString(),
  },
  {
    id: '6',
    image_url:
      'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Kids Fashion',
    category: 'kids',
    sort_order: 6,
    created_at: new Date().toISOString(),
  },
  {
    id: '7',
    image_url:
      'https://images.pexels.com/photos/9558602/pexels-photo-9558602.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Store Interior',
    category: 'store',
    sort_order: 7,
    created_at: new Date().toISOString(),
  },
  {
    id: '8',
    image_url:
      'https://images.pexels.com/photos/6765164/pexels-photo-6765164.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Womens Traditional',
    category: 'women',
    sort_order: 8,
    created_at: new Date().toISOString(),
  },
];

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGallery() {
      try {
        let query = supabase
          .from('gallery_images')
          .select('*')
          .order('sort_order');

        if (activeFilter !== 'All') {
          query = query.eq('category', activeFilter.toLowerCase());
        }

        const { data, error } = await query;

        if (error) throw error;
        if (data && data.length > 0) {
          setImages(data);
        } else {
          setImages(getFilteredFallback(activeFilter));
        }
      } catch {
        setImages(getFilteredFallback(activeFilter));
      } finally {
        setLoading(false);
      }
    }

    fetchGallery();
  }, [activeFilter]);

  const getFilteredFallback = useCallback(
    (filter: CategoryFilter): GalleryImage[] => {
      if (filter === 'All') return fallbackImages;
      return fallbackImages.filter(
        (img) => img.category === filter.toLowerCase()
      );
    },
    []
  );

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        closeLightbox();
      }
    },
    [closeLightbox]
  );

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            className="text-sm md:text-base tracking-[0.3em] uppercase text-muted-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Style
          </motion.p>
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            Gallery
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          >
            Browse our curated collection of styles, looks, and moments from ZK
            Garments.
          </motion.p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-wrap items-center justify-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveFilter(category);
                  setLoading(true);
                }}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-foreground text-background shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Masonry Gallery Grid */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="mb-4 break-inside-avoid rounded-lg bg-muted animate-pulse"
                  style={{ height: `${200 + (i % 3) * 80}px` }}
                />
              ))}
            </div>
          ) : (
            <motion.div
              className="columns-2 sm:columns-3 lg:columns-4 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <AnimatePresence mode="popLayout">
                {images.map((image, index) => (
                  <motion.div
                    key={image.id}
                    className="mb-4 break-inside-avoid group relative overflow-hidden rounded-lg cursor-pointer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.05,
                      ease: 'easeOut',
                    }}
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className="relative">
                      <Image
                        src={image.image_url}
                        alt={image.title}
                        width={600}
                        height={400 + (index % 3) * 100}
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <div>
                          <p className="text-background font-semibold text-sm md:text-base">
                            {image.title}
                          </p>
                          <p className="text-background/70 text-xs md:text-sm capitalize">
                            {image.category}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {!loading && images.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-muted-foreground text-lg">
                No images found for this category.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleBackdropClick}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />

            {/* Modal Content */}
            <motion.div
              className="relative z-10 max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-lg bg-card border border-border shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-3 right-3 z-20 p-2 rounded-full bg-background/80 text-foreground hover:bg-background transition-colors shadow-md"
                aria-label="Close lightbox"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Image */}
              <div className="relative w-full max-h-[75vh] overflow-hidden">
                <Image
                  src={selectedImage.image_url}
                  alt={selectedImage.title}
                  width={1200}
                  height={800}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>

              {/* Info Bar */}
              <div className="p-4 md:p-6 border-t border-border">
                <h3 className="text-lg md:text-xl font-semibold">
                  {selectedImage.title}
                </h3>
                <p className="text-sm text-muted-foreground capitalize mt-1">
                  {selectedImage.category}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
