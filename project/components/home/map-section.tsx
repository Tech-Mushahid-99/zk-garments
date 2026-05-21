'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { MAPS_EMBED_URL } from '@/lib/constants';

export default function MapSection() {
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
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">Find Us</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Visit Our Store</h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="h-5 w-5 mt-1 shrink-0 text-muted-foreground" />
              <div>
                <h3 className="font-semibold mb-1">Address</h3>
                <p className="text-muted-foreground">ZK Garments, Kondhwa, Pune, Maharashtra 411048, India</p>
              </div>
            </div>
            <div className="space-y-2 text-muted-foreground">
              <p><span className="font-semibold text-foreground">Mon - Sat:</span> 10:00 AM - 9:00 PM</p>
              <p><span className="font-semibold text-foreground">Sunday:</span> 11:00 AM - 7:00 PM</p>
            </div>
            <p className="text-muted-foreground text-sm">
              Located in the heart of Kondhwa, easily accessible from all major areas in Pune. Ample parking available.
            </p>
          </div>

          <div className="rounded-lg overflow-hidden border border-border h-[350px] md:h-[400px]">
            <iframe
              src={MAPS_EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="ZK Garments Location"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
