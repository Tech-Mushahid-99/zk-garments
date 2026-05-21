'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag, LogOut, Package, Image, MessageSquare, Mail, Settings,
  Menu, X, Plus, Pencil, Trash2, Eye, EyeOff, Star, Search, ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import type { Product, GalleryImage, Testimonial, Inquiry, SiteSettings } from '@/lib/types';

type Tab = 'products' | 'gallery' | 'testimonials' | 'inquiries' | 'settings';

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'products', label: 'Products', icon: <Package className="h-4 w-4" /> },
  { id: 'gallery', label: 'Gallery', icon: <Image className="h-4 w-4" /> },
  { id: 'testimonials', label: 'Testimonials', icon: <Star className="h-4 w-4" /> },
  { id: 'inquiries', label: 'Inquiries', icon: <Mail className="h-4 w-4" /> },
  { id: 'settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('products');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/admin/verify');
      if (!res.ok) {
        router.push('/admin/login');
        return;
      }
      setAuthChecked(true);
    })();
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Verifying authentication...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform lg:translate-x-0 lg:static lg:w-64 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            <span className="font-bold tracking-wider text-sm">ZK Admin</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-3 space-y-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <main className="flex-1 min-h-screen">
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-border px-4 lg:px-8 py-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold capitalize">{activeTab}</h1>
          <div className="text-sm text-muted-foreground">Admin Panel</div>
        </header>

        <div className="p-4 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'products' && <ProductsManager />}
              {activeTab === 'gallery' && <GalleryManager />}
              {activeTab === 'testimonials' && <TestimonialsManager />}
              {activeTab === 'inquiries' && <InquiriesManager />}
              {activeTab === 'settings' && <SettingsManager />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// --- Products Manager ---
function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [search, setSearch] = useState('');

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/products${search ? `?search=${search}` : ''}`);
    const data = await res.json();
    setProducts(Array.isArray(data) ? data : []);
    setLoading(false);
  }, [search]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
    if (res.ok) { toast.success('Product deleted'); fetchProducts(); }
    else toast.error('Failed to delete');
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={() => { setEditing(null); setShowForm(true); }} className="gap-2">
          <Plus className="h-4 w-4" /> Add Product
        </Button>
      </div>

      {showForm && (
        <ProductForm
          product={editing}
          onClose={() => { setShowForm(false); setEditing(null); }}
          onSave={fetchProducts}
        />
      )}

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {products.map((p) => (
            <div key={p.id} className="flex items-center gap-4 bg-card border border-border rounded-lg p-4">
              <div className="w-16 h-16 rounded-md overflow-hidden bg-muted shrink-0">
                {p.images?.[0] && <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{p.name}</h3>
                <p className="text-sm text-muted-foreground capitalize">{p.category} &middot; {p.stock_status.replace('_', ' ')}</p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-bold">&#8377;{p.discount_price || p.price}</span>
                  {p.discount_price && <span className="text-muted-foreground line-through">&#8377;{p.price}</span>}
                  {p.featured && <span className="text-xs bg-foreground text-background px-2 py-0.5 rounded-full">Featured</span>}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => { setEditing(p); setShowForm(true); }}
                  className="p-2 hover:bg-accent rounded-lg transition-colors"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          {products.length === 0 && <p className="text-center text-muted-foreground py-8">No products found</p>}
        </div>
      )}
    </div>
  );
}

function ProductForm({ product, onClose, onSave }: { product: Product | null; onClose: () => void; onSave: () => void }) {
  const [form, setForm] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    discount_price: product?.discount_price || null,
    images: product?.images || [],
    category: product?.category || 'men',
    sizes: product?.sizes || [],
    colors: product?.colors || [],
    stock_status: product?.stock_status || 'in_stock',
    featured: product?.featured || false,
  });
  const [imageInput, setImageInput] = useState('');
  const [saving, setSaving] = useState(false);

  const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
  const COLORS = ['Black', 'White', 'Navy', 'Red', 'Grey', 'Beige', 'Blue', 'Green', 'Pink', 'Maroon'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = product ? `/api/products/${product.id}` : '/api/products';
      const method = product ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success(product ? 'Product updated' : 'Product created');
        onSave();
        onClose();
      } else {
        toast.error('Failed to save product');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  const addImage = () => {
    if (imageInput.trim()) {
      setForm({ ...form, images: [...form.images, imageInput.trim()] });
      setImageInput('');
    }
  };

  const removeImage = (idx: number) => {
    setForm({ ...form, images: form.images.filter((_, i) => i !== idx) });
  };

  const toggleSize = (size: string) => {
    setForm({
      ...form,
      sizes: form.sizes.includes(size) ? form.sizes.filter((s) => s !== size) : [...form.sizes, size],
    });
  };

  const toggleColor = (color: string) => {
    setForm({
      ...form,
      colors: form.colors.includes(color) ? form.colors.filter((c) => c !== color) : [...form.colors, color],
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-card border border-border rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4">{product ? 'Edit Product' : 'Add Product'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Name</label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as 'men' | 'women' | 'kids' })}
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kids">Kids</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Description</label>
            <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Price (&#8377;)</label>
              <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} required />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Discount Price (&#8377;)</label>
              <Input type="number" value={form.discount_price || ''} onChange={(e) => setForm({ ...form, discount_price: Number(e.target.value) || null })} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Stock Status</label>
              <select
                value={form.stock_status}
                onChange={(e) => setForm({ ...form, stock_status: e.target.value as 'in_stock' | 'low_stock' | 'out_of_stock' })}
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="in_stock">In Stock</option>
                <option value="low_stock">Low Stock</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Images (URLs)</label>
            <div className="flex gap-2">
              <Input value={imageInput} onChange={(e) => setImageInput(e.target.value)} placeholder="Paste image URL" />
              <Button type="button" onClick={addImage} variant="outline" size="sm">Add</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {form.images.map((img, i) => (
                <div key={i} className="relative w-16 h-16 rounded-md overflow-hidden bg-muted group">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4 text-white" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Sizes</label>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                    form.sizes.includes(size) ? 'bg-foreground text-background border-foreground' : 'border-input hover:bg-accent'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Colors</label>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => toggleColor(color)}
                  className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                    form.colors.includes(color) ? 'bg-foreground text-background border-foreground' : 'border-input hover:bg-accent'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Switch checked={form.featured} onCheckedChange={(checked) => setForm({ ...form, featured: checked })} />
            <label className="text-sm font-medium">Featured Product</label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Product'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- Gallery Manager ---
function GalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/gallery');
    const data = await res.json();
    setImages(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchImages(); }, [fetchImages]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this image?')) return;
    const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
    if (res.ok) { toast.success('Image deleted'); fetchImages(); }
    else toast.error('Failed to delete');
  };

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = {
      image_url: fd.get('image_url') as string,
      title: fd.get('title') as string,
      category: fd.get('category') as string,
      sort_order: Number(fd.get('sort_order')) || 0,
    };

    const res = await fetch('/api/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) { toast.success('Image added'); setShowForm(false); fetchImages(); }
    else toast.error('Failed to add image');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Gallery Images</h2>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="h-4 w-4" /> Add Image
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-card border border-border rounded-lg p-4 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input name="image_url" placeholder="Image URL" required />
          <Input name="title" placeholder="Title" />
          <select name="category" className="h-10 rounded-md border border-input bg-background px-3 text-sm">
            <option value="store">Store</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
            <option value="general">General</option>
          </select>
          <Input name="sort_order" type="number" placeholder="Sort order" defaultValue="0" />
          <div className="sm:col-span-2 flex gap-2">
            <Button type="submit">Save</Button>
            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-square bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.id} className="relative aspect-square rounded-lg overflow-hidden group bg-muted">
              <img src={img.image_url} alt={img.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <button
                  onClick={() => handleDelete(img.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-destructive text-white rounded-full"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white text-xs truncate">{img.title || 'Untitled'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// --- Testimonials Manager ---
function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/testimonials');
    const data = await res.json();
    setTestimonials(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchTestimonials(); }, [fetchTestimonials]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
    if (res.ok) { toast.success('Testimonial deleted'); fetchTestimonials(); }
    else toast.error('Failed to delete');
  };

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = {
      name: fd.get('name') as string,
      rating: Number(fd.get('rating')) || 5,
      review: fd.get('review') as string,
      avatar_url: fd.get('avatar_url') as string || '',
    };

    const res = await fetch('/api/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) { toast.success('Testimonial added'); setShowForm(false); fetchTestimonials(); }
    else toast.error('Failed to add testimonial');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Testimonials</h2>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="h-4 w-4" /> Add Testimonial
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-card border border-border rounded-lg p-4 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input name="name" placeholder="Customer name" required />
          <Input name="rating" type="number" min="1" max="5" placeholder="Rating (1-5)" defaultValue="5" />
          <Textarea name="review" placeholder="Review text" className="sm:col-span-2" required />
          <Input name="avatar_url" placeholder="Avatar URL (optional)" className="sm:col-span-2" />
          <div className="sm:col-span-2 flex gap-2">
            <Button type="submit">Save</Button>
            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-card border border-border rounded-lg p-4 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-sm shrink-0">
                {t.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{t.name}</h3>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-3 w-3 ${i < t.rating ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground/30'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{t.review}</p>
              </div>
              <button onClick={() => handleDelete(t.id)} className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors shrink-0">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// --- Inquiries Manager ---
function InquiriesManager() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/inquiries');
    const data = await res.json();
    setInquiries(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchInquiries(); }, [fetchInquiries]);

  const toggleRead = async (inq: Inquiry) => {
    const res = await fetch(`/api/inquiries/${inq.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_read: !inq.is_read }),
    });
    if (res.ok) fetchInquiries();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return;
    const res = await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
    if (res.ok) { toast.success('Inquiry deleted'); fetchInquiries(); }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-6">Customer Inquiries</h2>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {inquiries.map((inq) => (
            <div key={inq.id} className={`bg-card border border-border rounded-lg p-4 ${inq.is_read ? 'opacity-60' : ''}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-medium">{inq.name}</h3>
                    <span className="text-xs text-muted-foreground">{inq.email}</span>
                    {inq.phone && <span className="text-xs text-muted-foreground">&middot; {inq.phone}</span>}
                    {!inq.is_read && <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">New</span>}
                  </div>
                  {inq.subject && <p className="text-sm font-medium mt-1">{inq.subject}</p>}
                  <p className="text-sm text-muted-foreground mt-1">{inq.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">{new Date(inq.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => toggleRead(inq)} className="p-2 hover:bg-accent rounded-lg transition-colors" title={inq.is_read ? 'Mark unread' : 'Mark read'}>
                    {inq.is_read ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  <button onClick={() => handleDelete(inq.id)} className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {inquiries.length === 0 && <p className="text-center text-muted-foreground py-8">No inquiries yet</p>}
        </div>
      )}
    </div>
  );
}

// --- Settings Manager ---
function SettingsManager() {
  const [settings, setSettings] = useState<Partial<SiteSettings>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data) setSettings(data);
      setLoading(false);
    })();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) toast.success('Settings saved');
      else toast.error('Failed to save settings');
    } catch {
      toast.error('Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="animate-pulse h-64 bg-muted rounded-lg" />;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-6">Site Settings</h2>
      <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h3 className="font-medium text-sm uppercase tracking-wider text-muted-foreground">Banner</h3>
          <Input
            value={settings.banner_title || ''}
            onChange={(e) => setSettings({ ...settings, banner_title: e.target.value })}
            placeholder="Banner Title"
          />
          <Input
            value={settings.banner_subtitle || ''}
            onChange={(e) => setSettings({ ...settings, banner_subtitle: e.target.value })}
            placeholder="Banner Subtitle"
          />
        </div>

        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h3 className="font-medium text-sm uppercase tracking-wider text-muted-foreground">Contact Information</h3>
          <Input
            value={settings.contact_phone || ''}
            onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
            placeholder="Phone Number"
          />
          <Input
            value={settings.contact_email || ''}
            onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
            placeholder="Email"
          />
          <Textarea
            value={settings.contact_address || ''}
            onChange={(e) => setSettings({ ...settings, contact_address: e.target.value })}
            placeholder="Address"
            rows={2}
          />
          <Input
            value={settings.whatsapp_number || ''}
            onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
            placeholder="WhatsApp Number (with country code)"
          />
        </div>

        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h3 className="font-medium text-sm uppercase tracking-wider text-muted-foreground">Social Links</h3>
          <Input
            value={settings.instagram_url || ''}
            onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
            placeholder="Instagram URL"
          />
          <Input
            value={settings.facebook_url || ''}
            onChange={(e) => setSettings({ ...settings, facebook_url: e.target.value })}
            placeholder="Facebook URL"
          />
          <Input
            value={settings.youtube_url || ''}
            onChange={(e) => setSettings({ ...settings, youtube_url: e.target.value })}
            placeholder="YouTube URL"
          />
        </div>

        <Button type="submit" disabled={saving} className="w-full sm:w-auto">
          {saving ? 'Saving...' : 'Save Settings'}
        </Button>
      </form>
    </div>
  );
}
