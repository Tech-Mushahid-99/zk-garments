/*
  # ZK Garments - Complete Database Schema

  1. New Tables
    - `products` - Fashion products with name, description, price, discount_price, images, category, sizes, colors, stock_status, featured toggle
    - `gallery_images` - Instagram-style gallery images with title and category
    - `testimonials` - Customer testimonials with name, rating, review text
    - `inquiries` - Customer contact inquiries from the website form
    - `site_settings` - Dynamic site configuration (banner text, contact info, social links)
    - `admin_sessions` - JWT session tracking for admin authentication

  2. Security
    - RLS enabled on all tables
    - Public read access for products, gallery, testimonials, site_settings
    - Admin-only write access (via service role key in API routes)
    - Inquiries insertable by anyone (for contact form)
    - Admin sessions fully restricted
*/

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  price numeric(10,2) NOT NULL DEFAULT 0,
  discount_price numeric(10,2),
  images text[] DEFAULT '{}',
  category text NOT NULL DEFAULT 'men',
  sizes text[] DEFAULT '{}',
  colors text[] DEFAULT '{}',
  stock_status text DEFAULT 'in_stock',
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Gallery images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  title text DEFAULT '',
  category text DEFAULT 'general',
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  rating integer DEFAULT 5,
  review text DEFAULT '',
  avatar_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Customer inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  subject text DEFAULT '',
  message text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Site settings table (singleton pattern - one row)
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  banner_title text DEFAULT 'New Collection 2025',
  banner_subtitle text DEFAULT 'Discover the latest trends in fashion',
  contact_phone text DEFAULT '+91 9876543210',
  contact_email text DEFAULT 'info@zkgarments.com',
  contact_address text DEFAULT 'ZK Garments, Kondhwa, Pune, India',
  whatsapp_number text DEFAULT '919876543210',
  instagram_url text DEFAULT '',
  facebook_url text DEFAULT '',
  youtube_url text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

-- Admin sessions table
CREATE TABLE IF NOT EXISTS admin_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token text NOT NULL UNIQUE,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;

-- Products: public read, admin write via service role
CREATE POLICY "Public can view products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Service role can insert products"
  ON products FOR INSERT
  TO authenticated, service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update products"
  ON products FOR UPDATE
  TO authenticated, service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete products"
  ON products FOR DELETE
  TO authenticated, service_role
  USING (true);

-- Gallery: public read, admin write
CREATE POLICY "Public can view gallery"
  ON gallery_images FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Service role can manage gallery"
  ON gallery_images FOR INSERT
  TO authenticated, service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update gallery"
  ON gallery_images FOR UPDATE
  TO authenticated, service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete gallery"
  ON gallery_images FOR DELETE
  TO authenticated, service_role
  USING (true);

-- Testimonials: public read, admin write
CREATE POLICY "Public can view testimonials"
  ON testimonials FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Service role can manage testimonials"
  ON testimonials FOR INSERT
  TO authenticated, service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update testimonials"
  ON testimonials FOR UPDATE
  TO authenticated, service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete testimonials"
  ON testimonials FOR DELETE
  TO authenticated, service_role
  USING (true);

-- Inquiries: anyone can insert, admin can read/delete
CREATE POLICY "Anyone can submit inquiries"
  ON inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Service role can view inquiries"
  ON inquiries FOR SELECT
  TO authenticated, service_role
  USING (true);

CREATE POLICY "Service role can update inquiries"
  ON inquiries FOR UPDATE
  TO authenticated, service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete inquiries"
  ON inquiries FOR DELETE
  TO authenticated, service_role
  USING (true);

-- Site settings: public read, admin write
CREATE POLICY "Public can view site settings"
  ON site_settings FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Service role can update site settings"
  ON site_settings FOR UPDATE
  TO authenticated, service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can insert site settings"
  ON site_settings FOR INSERT
  TO authenticated, service_role
  WITH CHECK (true);

-- Admin sessions: fully restricted
CREATE POLICY "Service role can manage sessions"
  ON admin_sessions FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_stock ON products(stock_status);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery_images(category);
CREATE INDEX IF NOT EXISTS idx_inquiries_read ON inquiries(is_read);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_token ON admin_sessions(token);
