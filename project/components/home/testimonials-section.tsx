'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Testimonial } from '@/lib/types';

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  { id: '1', name: 'Priya Sharma', rating: 5, review: 'Amazing collection and quality! The ethnic wear is absolutely stunning. Will definitely come back.', avatar_url: '', created_at: '' },
  { id: '2', name: 'Rahul Patil', rating: 5, review: 'Best garment store in Kondhwa. Great variety for men and the prices are very reasonable.', avatar_url: '', created_at: '' },
  { id: '3', name: 'Sneha Kulkarni', rating: 4, review: 'Love the kids collection! My children are always excited to pick new clothes from ZK Garments.', avatar_url: '', created_at: '' },
];

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(FALLBACK_TESTIMONIALS);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
      if (data && data.length > 0) setTestimonials(data as Testimonial[]);
    })();
  }, []);

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">What People Say</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Customer Reviews</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              className="bg-card border border-border rounded-lg p-8 relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <Quote className="h-8 w-8 text-muted-foreground/20 mb-4" />
              <p className="text-foreground/80 leading-relaxed mb-6">{t.review}</p>
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className={`h-4 w-4 ${idx < t.rating ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground/30'}`}
                  />
                ))}
              </div>
              <p className="font-semibold text-sm">{t.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
