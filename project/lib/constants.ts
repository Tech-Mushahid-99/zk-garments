export const SITE_NAME = 'ZK Garments';
export const SITE_TAGLINE = 'Fashion for Everyone';
export const SITE_DESCRIPTION = 'Premium readymade garments for Men, Women & Kids in Kondhwa, Pune';
export const STORE_LOCATION = 'Kondhwa, Pune, Maharashtra, India';
export const MAPS_EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.5!2d73.88!3d18.48!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDI4JzQ4LjAiTiA3M8KwNTInNDguMCJF!5e0!3m2!1sen!2sin!4v1';

export const CATEGORIES = [
  { slug: 'men', label: "Men's Collection", description: 'Sharp suits, casual shirts, and everyday essentials' },
  { slug: 'women', label: "Women's Collection", description: 'Elegant dresses, ethnic wear, and modern styles' },
  { slug: 'kids', label: "Kids' Collection", description: 'Fun, comfortable, and trendy outfits for little ones' },
] as const;

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/categories', label: 'Categories' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/contact', label: 'Contact' },
] as const;

export const PRODUCT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'] as const;
export const PRODUCT_COLORS = ['Black', 'White', 'Navy', 'Red', 'Grey', 'Beige', 'Blue', 'Green', 'Pink', 'Maroon'] as const;
export const STOCK_STATUSES = ['in_stock', 'low_stock', 'out_of_stock'] as const;
