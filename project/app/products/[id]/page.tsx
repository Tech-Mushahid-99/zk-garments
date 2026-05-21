'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, Check, AlertTriangle, X as XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/lib/types';

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Classic Black Blazer',
    description:
      'Premium tailored blazer crafted from fine fabric for a sharp, sophisticated look. Perfect for formal occasions and business meetings.',
    price: 2499,
    discount_price: 1999,
    images: [
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/994517/pexels-photo-994517.jpeg?auto=compress&cs=tinysrgb&w=400',
    ],
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
    description:
      'Elegant floral print dress designed for the season. Lightweight fabric with a flattering silhouette for effortless style.',
    price: 1899,
    discount_price: 1499,
    images: [
      'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/994517/pexels-photo-994517.jpeg?auto=compress&cs=tinysrgb&w=400',
    ],
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
    description:
      'Comfortable and durable denim outfit for kids. Perfect for playtime and everyday adventures with a trendy look.',
    price: 999,
    discount_price: 799,
    images: [
      'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=400',
    ],
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
    description:
      'Breathable linen shirt for everyday comfort. Relaxed fit with a premium feel, ideal for casual outings and weekend wear.',
    price: 1299,
    discount_price: 999,
    images: [
      'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/994517/pexels-photo-994517.jpeg?auto=compress&cs=tinysrgb&w=400',
    ],
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
    description:
      'Beautiful ethnic kurta paired with a matching palazzo set. Intricate embroidery and premium fabric for festive occasions.',
    price: 2199,
    discount_price: 1799,
    images: [
      'https://images.pexels.com/photos/886404/pexels-photo-886404.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/886404/pexels-photo-886404.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/994517/pexels-photo-994517.jpeg?auto=compress&cs=tinysrgb&w=400',
    ],
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
    description:
      'Set of 3 fun printed t-shirts for kids. Soft cotton blend with vibrant prints that stay bright wash after wash.',
    price: 699,
    discount_price: 549,
    images: [
      'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=400',
    ],
    category: 'kids',
    sizes: ['S', 'M', 'L'],
    colors: ['Red', 'Blue', 'Green'],
    stock_status: 'in_stock',
    featured: true,
    created_at: '',
    updated_at: '',
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (data) {
        setProduct(data as Product);
      } else {
        const fallback = FALLBACK_PRODUCTS.find((p) => p.id === id);
        if (fallback) setProduct(fallback);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] ?? null);
      setSelectedColor(product.colors[0] ?? null);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const discountPercent = product.discount_price
    ? Math.round(
        ((product.price - product.discount_price) / product.price) * 100
      )
    : 0;

  const whatsappMessage = `Hi ZK Garments! I'm interested in the ${product.name}${selectedSize ? ` (Size: ${selectedSize})` : ''}${selectedColor ? ` (Color: ${selectedColor})` : ''}. Could you share more details?`;
  const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(whatsappMessage)}`;

  const stockIndicator = {
    in_stock: { label: 'In Stock', color: 'text-emerald-600 dark:text-emerald-400', icon: Check },
    low_stock: { label: 'Low Stock', color: 'text-amber-600 dark:text-amber-400', icon: AlertTriangle },
    out_of_stock: { label: 'Out of Stock', color: 'text-red-600 dark:text-red-400', icon: XIcon },
  }[product.stock_status];

  const StockIcon = stockIndicator.icon;

  return (
    <section className="pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <Link href="/products">
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Link>
          </Button>
        </motion.div>

        {/* Product layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main image */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.discount_price && (
                <Badge className="absolute top-4 left-4 bg-foreground text-background hover:bg-foreground/90 font-medium px-3 py-1 text-xs rounded-full">
                  {discountPercent}% OFF
                </Badge>
              )}
            </div>

            {/* Thumbnail strip */}
            {product.images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx
                        ? 'border-foreground'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col"
          >
            {/* Category label */}
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
              {product.category}&apos;s Collection
            </p>

            {/* Product name */}
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              {product.discount_price ? (
                <>
                  <span className="text-2xl md:text-3xl font-bold">
                    &#8377;{product.discount_price}
                  </span>
                  <span className="text-muted-foreground line-through text-lg">
                    &#8377;{product.price}
                  </span>
                  <Badge
                    variant="secondary"
                    className="text-xs font-medium rounded-full"
                  >
                    Save &#8377;{product.price - product.discount_price}
                  </Badge>
                </>
              ) : (
                <span className="text-2xl md:text-3xl font-bold">
                  &#8377;{product.price}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Stock status */}
            <div className="flex items-center gap-2 mb-8">
              <StockIcon className={`h-4 w-4 ${stockIndicator.color}`} />
              <span className={`text-sm font-medium ${stockIndicator.color}`}>
                {stockIndicator.label}
              </span>
            </div>

            {/* Size selector */}
            {product.sizes.length > 0 && (
              <div className="mb-8">
                <p className="text-sm font-semibold mb-3">
                  Size
                  {selectedSize && (
                    <span className="text-muted-foreground font-normal ml-2">
                      {selectedSize}
                    </span>
                  )}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-10 min-w-[2.5rem] px-4 rounded-md border text-sm font-medium transition-all ${
                        selectedSize === size
                          ? 'bg-foreground text-background border-foreground'
                          : 'bg-card border-border text-foreground hover:border-foreground'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color selector */}
            {product.colors.length > 0 && (
              <div className="mb-10">
                <p className="text-sm font-semibold mb-3">
                  Color
                  {selectedColor && (
                    <span className="text-muted-foreground font-normal ml-2">
                      {selectedColor}
                    </span>
                  )}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`h-10 px-4 rounded-md border text-sm font-medium transition-all ${
                        selectedColor === color
                          ? 'bg-foreground text-background border-foreground'
                          : 'bg-card border-border text-foreground hover:border-foreground'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* WhatsApp inquiry */}
            <motion.div
              className="mt-auto"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                asChild
                size="lg"
                className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white gap-2 rounded-full h-12 text-sm font-semibold tracking-wide"
                disabled={product.stock_status === 'out_of_stock'}
              >
                <a
                  href={
                    product.stock_status === 'out_of_stock'
                      ? undefined
                      : whatsappUrl
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5" />
                  {product.stock_status === 'out_of_stock'
                    ? 'Out of Stock'
                    : 'Inquire on WhatsApp'}
                </a>
              </Button>
            </motion.div>

            <p className="text-xs text-muted-foreground text-center mt-3">
              Click to chat with us on WhatsApp for pricing, availability, and
              custom orders.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
