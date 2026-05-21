'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ShieldCheck } from 'lucide-react';


export default function AdminLandingPage() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/admin/verify');
        const data = await res.json();
        setAuthenticated(Boolean(data?.authenticated));
        if (data?.authenticated) return;
        router.replace('/admin/login');
      } catch {
        toast.error('Unable to verify admin session');
        router.replace('/admin/login');
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Verifying authentication...</div>
      </div>
    );
  }

  if (!authenticated) return null;

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-background px-4"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="w-full max-w-xl">
        <div className="bg-card border border-border rounded-lg p-7 space-y-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-md bg-foreground text-background flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Admin Panel</h1>
              <p className="text-muted-foreground mt-1 text-sm">
                Manage products, gallery, testimonials, inquiries and site settings.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Link href="/admin/dashboard" className="block">
              <Button className="w-full" type="button">
                Go to Dashboard
              </Button>
            </Link>
          </div>

          <div className="text-xs text-muted-foreground">
            Tip: Use the Dashboard sidebar to switch between managers.
          </div>
        </div>
      </div>
    </motion.div>
  );
}

