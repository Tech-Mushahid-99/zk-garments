'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShoppingBag,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Youtube,
} from 'lucide-react';
import { SITE_NAME, NAV_LINKS } from '@/lib/constants';

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag className="h-6 w-6" />
              <span className="text-xl font-bold tracking-wider">
                {SITE_NAME}
              </span>
            </div>

            <p className="text-background/70 text-sm leading-relaxed">
              Premium readymade garments for Men, Women & Kids. Located in the heart of Kondhwa, Pune.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="font-semibold text-sm tracking-wider uppercase mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-background text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="font-semibold text-sm tracking-wider uppercase mb-4">
              Contact
            </h3>

            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-background/70">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Kondhwa, Pune, Maharashtra, India</span>
              </li>

              <li className="flex items-center gap-3 text-sm text-background/70">
                <Phone className="h-4 w-4 shrink-0" />
                <a href="tel:+919876543210" className="hover:text-background">
                  +91 98765 43210
                </a>
              </li>

              <li className="flex items-center gap-3 text-sm text-background/70">
                <Mail className="h-4 w-4 shrink-0" />
                <a href="mailto:info@zkgarments.com" className="hover:text-background">
                  info@zkgarments.com
                </a>
              </li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h3 className="font-semibold text-sm tracking-wider uppercase mb-4">
              Follow Us
            </h3>

            <div className="flex gap-3">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  target="_blank"
                  className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center hover:bg-background hover:text-foreground transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            <div className="mt-6">
              <h4 className="font-semibold text-sm tracking-wider uppercase mb-2">
                Store Hours
              </h4>
              <p className="text-background/70 text-sm">
                Mon - Sat: 10:00 AM - 9:00 PM
              </p>
              <p className="text-background/70 text-sm">
                Sunday: 11:00 AM - 7:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <p className="text-background/50 text-sm">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>

          <p className="text-background/50 text-sm flex items-center gap-1">
            Crafted with <span className="text-red-400 animate-pulse">❤</span> in Pune by
            <span className="ml-1 font-semibold text-background">
              Ventavo Studio
            </span>
          </p>

        </div>
      </div>
    </footer>
  );
}
