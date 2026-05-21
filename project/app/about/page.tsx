'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  Award,
  Wallet,
  Layers,
  Headset,
  ArrowRight,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const values = [
  {
    icon: Award,
    title: 'Quality',
    description:
      'We handpick every garment from trusted manufacturers, ensuring durable stitching, premium fabrics, and finishes that stand the test of time.',
  },
  {
    icon: Wallet,
    title: 'Affordability',
    description:
      'Great fashion should not break the bank. We negotiate directly with suppliers so you always get the best price without compromising on style.',
  },
  {
    icon: Layers,
    title: 'Variety',
    description:
      'From ethnic wear to western casuals, formal suits to playful kids\u2019 outfits — our shelves carry something for every taste, age, and occasion.',
  },
  {
    icon: Headset,
    title: 'Customer Service',
    description:
      'Our attentive staff treats every visitor like family. Whether you need sizing help or styling advice, we are here to make your shopping experience delightful.',
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.15 } },
  viewport: { once: true },
};

const staggerItem = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/994517/pexels-photo-994517.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="ZK Garments fashion collection"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-background/70 dark:bg-background/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            className="text-sm md:text-base tracking-[0.3em] uppercase text-muted-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Since 2015
          </motion.p>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            Our Story
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          >
            A family-run fashion store in Kondhwa, Pune — bringing trendy,
            affordable fashion to Men, Women & Kids.
          </motion.p>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              className="relative aspect-[4/5] rounded-2xl overflow-hidden"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Image
                src="https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Casual fashion at ZK Garments"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">
                Who We Are
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                A Family Passion for Fashion
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  ZK Garments was founded in 2015 in the heart of Kondhwa, Pune,
                  with a simple mission: make great fashion accessible to
                  everyone. What started as a small family-run store has grown
                  into a beloved neighbourhood destination for men, women, and
                  kids looking for the latest trends without the premium price
                  tag.
                </p>
                <p>
                  Every piece on our shelves is personally selected by our
                  family, ensuring a curated mix of ethnic wear, western
                  casuals, formal attire, and playful kids&apos; outfits. We
                  believe that looking good should not be a luxury — it should
                  be a given.
                </p>
                <p>
                  Over the years, our loyal customers have become part of our
                  extended family. Their smiles, feedback, and trust keep us
                  motivated to improve every day. At ZK Garments, you are not
                  just shopping — you are experiencing fashion the way it was
                  meant to be: personal, affordable, and joyful.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-14"
            {...fadeInUp}
          >
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">
              What Drives Us
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Our Values
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            {...staggerContainer}
          >
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  className="bg-card border border-border rounded-lg p-8 text-center"
                  {...staggerItem}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-5">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Store / Team Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">
                Our Store
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Visit Us in Kondhwa, Pune
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
                <p>
                  Step into ZK Garments and experience fashion up close. Our
                  warmly lit store is designed to make browsing a pleasure, with
                  clearly organised sections for men, women, and kids so you can
                  find exactly what you need — fast.
                </p>
                <p>
                  Our friendly team is always on hand to help with sizes,
                  styling suggestions, and the latest arrivals. Whether you are
                  shopping for a wedding, a festival, or a weekend casual
                  refresh, we have got you covered.
                </p>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground mb-6">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>Kondhwa, Pune, Maharashtra</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/contact">
                    Get Directions <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <a href="tel:+919876543210">
                    <Phone className="h-4 w-4" /> Call Us
                  </a>
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="relative aspect-[4/5] rounded-2xl overflow-hidden order-1 lg:order-2"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Image
                src="https://images.pexels.com/photos/994517/pexels-photo-994517.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Inside ZK Garments store"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="relative overflow-hidden rounded-2xl bg-foreground text-background p-10 md:p-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-background/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-background/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                Come Say Hello
              </h2>
              <p className="text-background/70 text-lg max-w-xl mx-auto mb-8">
                We would love to welcome you at ZK Garments. Drop by our store
                in Kondhwa, Pune, or reach out to us anytime.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="gap-2 border-background/30 text-background hover:bg-background hover:text-foreground"
                >
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp Us
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="gap-2 border-background/30 text-background hover:bg-background hover:text-foreground"
                >
                  <a href="tel:+919876543210">
                    <Phone className="h-4 w-4" /> Call Now
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
