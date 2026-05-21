'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Shield, Tag, Sparkles, Heart, ArrowRight } from 'lucide-react';

const categories = [
  {
    name: 'Men',
    slug: 'men',
    description:
      'Sharp suits, casual essentials, and everything in between. Discover contemporary menswear crafted for the modern gentleman.',
    image:
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Women',
    slug: 'women',
    description:
      'From elegant ethnic wear to chic western outfits — explore styles that celebrate every woman and every occasion.',
    image:
      'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Kids',
    slug: 'kids',
    description:
      'Playful, colourful, and comfortable — fun fashion for little ones who love to express themselves.',
    image:
      'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

const features = [
  {
    icon: Shield,
    title: 'Quality Fabrics',
    description:
      'Every garment is crafted from premium fabrics, handpicked for durability, comfort, and a luxurious feel that lasts.',
  },
  {
    icon: Tag,
    title: 'Affordable Prices',
    description:
      'Great style should not come at a premium. We offer competitive pricing so you can look your best without overspending.',
  },
  {
    icon: Sparkles,
    title: 'Latest Trends',
    description:
      'Our collections are refreshed regularly with the newest styles, keeping your wardrobe ahead of the curve.',
  },
  {
    icon: Heart,
    title: 'Personal Service',
    description:
      'Our friendly team provides personalised styling advice and sizing help, making every visit a delightful experience.',
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

export default function CategoriesPage() {
  return (
    <>
      {/* Hero / Categories Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-14"
            {...fadeInUp}
          >
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">
              Our Collections
            </p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Shop by Category
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore curated collections for every member of the family — from
              timeless classics to the latest trends.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Link
                  href={`/products?category=${category.slug}`}
                  className="group relative block aspect-[3/4] md:aspect-[2/3] rounded-2xl overflow-hidden"
                >
                  {/* Background Image */}
                  <Image
                    src={category.image}
                    alt={`${category.name} collection at ZK Garments`}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={index === 0}
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {category.name}
                    </h2>
                    <p className="text-sm md:text-base text-white/70 leading-relaxed mb-4 max-w-xs">
                      {category.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-white tracking-wide uppercase group-hover:gap-3 transition-all duration-300">
                      Explore Collection
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose ZK Garments Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-14"
            {...fadeInUp}
          >
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">
              The ZK Difference
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Why Choose ZK Garments
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            {...staggerContainer}
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="bg-card border border-border rounded-lg p-8 text-center"
                  {...staggerItem}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-5">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
}
