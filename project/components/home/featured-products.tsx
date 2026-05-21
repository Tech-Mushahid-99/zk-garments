'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/lib/types';

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: '1', name: 'Classic Black Blazer', description: 'Premium tailored blazer for a sharp look',
    price: 2499, discount_price: 1999, images: ['https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600'],
    category: 'men', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'Navy'], stock_status: 'in_stock', featured: true, created_at: '', updated_at: '',
  },
  {
    id: '2', name: 'Floral Summer Dress', description: 'Elegant floral print dress for the season',
    price: 1899, discount_price: 1499, images: ['https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=600'],
    category: 'women', sizes: ['XS', 'S', 'M', 'L'], colors: ['Pink', 'White'], stock_status: 'in_stock', featured: true, created_at: '', updated_at: '',
  },
  {
    id: '3', name: 'Kids Denim Set', description: 'Comfortable denim outfit for kids',
    price: 999, discount_price: 799, images: ['https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=600'],
    category: 'kids', sizes: ['S', 'M', 'L'], colors: ['Blue', 'Grey'], stock_status: 'in_stock', featured: true, created_at: '', updated_at: '',
  },
  {
    id: '4', name: 'Linen Casual Shirt', description: 'Breathable linen shirt for everyday comfort',
    price: 1299, discount_price: 999, images: ['https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=600'],
    category: 'men', sizes: ['M', 'L', 'XL', 'XXL'], colors: ['White', 'Beige', 'Blue'], stock_status: 'in_stock', featured: true, created_at: '', updated_at: '',
  },
  {
    id: '5', name: 'Ethnic Kurta Set', description: 'Beautiful ethnic kurta with palazzo set',
    price: 2199, discount_price: 1799, images: ['https://images.pexels.com/photos/886404/pexels-photo-886404.jpeg?auto=compress&cs=tinysrgb&w=600'],
    category: 'women', sizes: ['S', 'M', 'L', 'XL'], colors: ['Maroon', 'Green'], stock_status: 'in_stock', featured: true, created_at: '', updated_at: '',
  },
  {
    id: '6', name: 'Printed T-Shirt Pack', description: 'Set of 3 fun printed t-shirts for kids',
    price: 699, discount_price: 549, images: ['https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=600'],
    category: 'kids', sizes: ['S', 'M', 'L'], colors: ['Red', 'Blue', 'Green'], stock_status: 'in_stock', featured: true, created_at: '', updated_at: '',
  },
];

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>(FALLBACK_PRODUCTS);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(6);
      if (data && data.length > 0) setProducts(data as Product[]);
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
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">Curated for You</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Featured Products</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/products/${product.id}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {product.discount_price && (
                    <span className="absolute top-3 left-3 bg-foreground text-background text-xs font-medium px-3 py-1 rounded-full">
                      {Math.round(((product.price - product.discount_price) / product.price) * 100)}% OFF
                    </span>
                  )}
                </div>
                <div className="mt-4">
                  <p className="text-xs tracking-wider uppercase text-muted-foreground mb-1">{product.category}</p>
                  <h3 className="font-semibold text-base group-hover:text-muted-foreground transition-colors">{product.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {product.discount_price ? (
                      <>
                        <span className="font-bold text-lg">&#8377;{product.discount_price}</span>
                        <span className="text-muted-foreground line-through text-sm">&#8377;{product.price}</span>
                      </>
                    ) : (
                      <span className="font-bold text-lg">&#8377;{product.price}</span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/products">
              View All Products <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
