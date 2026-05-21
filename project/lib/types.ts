export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount_price: number | null;
  images: string[];
  category: 'men' | 'women' | 'kids';
  sizes: string[];
  colors: string[];
  stock_status: 'in_stock' | 'low_stock' | 'out_of_stock';
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface GalleryImage {
  id: string;
  image_url: string;
  title: string;
  category: string;
  sort_order: number;
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  review: string;
  avatar_url: string;
  created_at: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface SiteSettings {
  id: string;
  banner_title: string;
  banner_subtitle: string;
  contact_phone: string;
  contact_email: string;
  contact_address: string;
  whatsapp_number: string;
  instagram_url: string;
  facebook_url: string;
  youtube_url: string;
  updated_at: string;
}

export interface AdminSession {
  id: string;
  token: string;
  expires_at: string;
  created_at: string;
}

export type ProductFormData = Omit<Product, 'id' | 'created_at' | 'updated_at'>;
export type TestimonialFormData = Omit<Testimonial, 'id' | 'created_at'>;
export type GalleryFormData = Omit<GalleryImage, 'id' | 'created_at'>;
export type InquiryFormData = Omit<Inquiry, 'id' | 'is_read' | 'created_at'>;
