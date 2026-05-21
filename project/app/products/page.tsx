'use client';

import { useEffect, useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/lib/types';

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Classic Black Blazer',
    description: 'Premium tailored blazer for a sharp look',
    price: 2499,
    discount_price: 1999,
    images: ['https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600'],
    category: 'men',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy'],
    stock_status: 'in_stock',
    featured: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: '2',
    name: 'Floral Summer Dress',
    description: 'Elegant floral print dress for the season',
    price: 1899,
    discount_price: 1499,
    images: ['https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=600'],
    category: 'women',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Pink', 'White'],
    stock_status: 'in_stock',
    featured: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: '3',
    name: 'Kids Denim Set',
    description: 'Comfortable denim outfit for kids',
    price: 999,
    discount_price: 799,
    images: ['https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=600'],
    category: 'kids',
    sizes: ['S', 'M', 'L'],
    colors: ['Blue', 'Grey'],
    stock_status: 'in_stock',
    featured: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: '4',
    name: 'Linen Casual Shirt',
    description: 'Breathable linen shirt for everyday comfort',
    price: 1299,
    discount_price: 999,
    images: ['https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=600'],
    category: 'men',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Beige', 'Blue'],
    stock_status: 'in_stock',
    featured: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: '5',
    name: 'Ethnic Kurta Set',
    description: 'Beautiful ethnic kurta with palazzo set',
    price: 2199,
    discount_price: 1799,
    images: ['https://images.pexels.com/photos/886404/pexels-photo-886404.jpeg?auto=compress&cs=tinysrgb&w=600'],
    category: 'women',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Maroon', 'Green'],
    stock_status: 'in_stock',
    featured: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: '6',
    name: 'Printed T-Shirt Pack',
    description: 'Set of 3 fun printed t-shirts for kids',
    price: 699,
    discount_price: 549,
    images: ['https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=600'],
    category: 'kids',
    sizes: ['S', 'M', 'L'],
    colors: ['Red', 'Blue', 'Green'],
    stock_status: 'in_stock',
    featured: true,
    created_at: '',
    updated_at: '',
  },
];

const CATEGORY_TABS = [
  { value: '', label: 'All' },
  { value: 'men', label: 'Men' },
  { value: 'women', label: 'Women' },
  { value: 'kids', label: 'Kids' },
] as const;

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get('category') ?? '';

  const [products, setProducts] = useState<Product[]>(FALLBACK_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<string>(categoryParam);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setActiveCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    (async () => {
      let query = supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (activeCategory) {
        query = query.eq('category', activeCategory);
      }

      const { data } = await query;
      if (data && data.length > 0) setProducts(data as Product[]);
    })();
  }, [activeCategory]);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const q = searchQuery.toLowerCase();
    return products.filter((p) => p.name.toLowerCase().includes(q));
  }, [products, searchQuery]);

  const handleCategoryChange = (value: string) => {
    setActiveCategory(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('category', value);
    } else {
      params.delete('category');
    }
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  return (
    <section className="pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Our Collection
          </p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Products
          </h1>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Category tabs */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {CATEGORY_TABS.map((tab) => (
              <Button
                key={tab.value}
                variant={activeCategory === tab.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleCategoryChange(tab.value)}
                className="rounded-full px-5 text-xs tracking-wider uppercase"
              >
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-9 h-10 rounded-full bg-card border-border"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Product grid */}
        {filteredProducts.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-muted-foreground text-lg">No products found.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  href={`/products/${product.id}`}
                  className="group block"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    {product.discount_price && (
                      <span className="absolute top-3 left-3 bg-foreground text-background text-xs font-medium px-3 py-1 rounded-full">
                        {Math.round(
                          ((product.price - product.discount_price) /
                            product.price) *
                            100
                        )}
                        % OFF
                      </span>
                    )}
                    {product.stock_status === 'out_of_stock' && (
                      <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                        <span className="text-sm font-semibold tracking-wider uppercase bg-foreground text-background px-4 py-2 rounded-full">
                          Sold Out
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <p className="text-xs tracking-wider uppercase text-muted-foreground mb-1">
                      {product.category}
                    </p>
                    <h3 className="font-semibold text-base group-hover:text-muted-foreground transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      {product.discount_price ? (
                        <>
                          <span className="font-bold text-lg">
                            &#8377;{product.discount_price}
                          </span>
                          <span className="text-muted-foreground line-through text-sm">
                            &#8377;{product.price}
                          </span>
                        </>
                      ) : (
                        <span className="font-bold text-lg">
                          &#8377;{product.price}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
