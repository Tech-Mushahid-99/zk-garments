'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Testimonial } from '@/lib/types';

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    rating: 5,
    review:
      'Amazing collection and quality! The ethnic wear is absolutely stunning.',
    avatar_url: '',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Rahul Patil',
    rating: 5,
    review:
      'Best garment store in Kondhwa. Great variety for men and reasonable prices.',
    avatar_url: '',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Sneha Kulkarni',
    rating: 4,
    review:
      "Love the kids collection! My children are always excited to pick new clothes.",
    avatar_url: '',
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Amit Deshmukh',
    rating: 5,
    review:
      'Excellent customer service and the latest fashion trends. Highly recommended!',
    avatar_url: '',
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Meera Joshi',
    rating: 4,
    review:
      "Beautiful women's collection. The fabric quality is outstanding for the price.",
    avatar_url: '',
    created_at: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Vikram Singh',
    rating: 5,
    review:
      'I always find what I need here. From formal to casual, they have it all.',
    avatar_url: '',
    created_at: new Date().toISOString(),
  },
];

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

const AVATAR_COLORS = [
  'bg-primary/15 text-primary',
  'bg-rose-500/15 text-rose-600 dark:text-rose-400',
  'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
  'bg-amber-500/15 text-amber-600 dark:text-amber-400',
  'bg-violet-500/15 text-violet-600 dark:text-violet-400',
  'bg-sky-500/15 text-sky-600 dark:text-sky-400',
];

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] =
    useState<Testimonial[]>(FALLBACK_TESTIMONIALS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          setTestimonials(data as Testimonial[]);
        }
      } catch {
        setTestimonials(FALLBACK_TESTIMONIALS);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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
            Customer Reviews
          </motion.p>
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            What Our Customers Say
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          >
            Real experiences from our valued customers in Kondhwa, Pune.
          </motion.p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-lg p-8 animate-pulse"
                >
                  <div className="h-8 w-8 bg-muted rounded mb-4" />
                  <div className="space-y-3 mb-6">
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-5/6" />
                    <div className="h-4 bg-muted rounded w-4/6" />
                  </div>
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <div
                        key={j}
                        className="h-4 w-4 bg-muted rounded"
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-muted rounded-full" />
                    <div className="h-4 w-24 bg-muted rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.id}
                  className="bg-card border border-border rounded-lg p-8 relative group hover:shadow-lg transition-shadow duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Quote className="h-8 w-8 text-muted-foreground/20 mb-4" />
                  <p className="text-foreground/80 leading-relaxed mb-6">
                    {t.review}
                  </p>
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`h-4 w-4 ${
                          idx < t.rating
                            ? 'fill-yellow-500 text-yellow-500'
                            : 'text-muted-foreground/30'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    {t.avatar_url ? (
                      <img
                        src={t.avatar_url}
                        alt={t.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                          AVATAR_COLORS[i % AVATAR_COLORS.length]
                        }`}
                      >
                        {getInitials(t.name)}
                      </div>
                    )}
                    <p className="font-semibold text-sm">{t.name}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Share Your Experience
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              We would love to hear from you. Visit us at ZK Garments and let us
              know how we did.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
