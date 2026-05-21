import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET || 'zk-garments-secret-key-2025';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@zkgarments.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export function verifyCredentials(email: string, password: string): boolean {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}

export function generateToken(): string {
  return jwt.sign(
    { role: 'admin', email: ADMIN_EMAIL },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

export function verifyToken(token: string): { role: string; email: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { role: string; email: string };
  } catch {
    return null;
  }
}

export function setAuthCookie(token: string): string {
  return serialize('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 86400,
    path: '/',
  });
}

export function clearAuthCookie(): string {
  return serialize('admin_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
}
