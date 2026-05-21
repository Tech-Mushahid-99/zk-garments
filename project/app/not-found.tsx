'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center gap-2 mb-8">
          <ShoppingBag className="h-8 w-8" />
          <span className="text-2xl font-bold tracking-wider">ZK Garments</span>
        </div>

        <h1 className="text-8xl md:text-9xl font-bold tracking-tighter text-muted-foreground/20 mb-4">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Page Not Found</h2>

        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <Button asChild size="lg" className="gap-2">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}
