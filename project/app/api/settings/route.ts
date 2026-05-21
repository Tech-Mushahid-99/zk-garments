import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { supabase, supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase.from('site_settings').select('*').limit(1).maybeSingle();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const token = req.cookies.get('admin_token')?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    const { data: existing } = await supabase.from('site_settings').select('id').limit(1).maybeSingle();

    let data, error;
    if (existing) {
      ({ data, error } = await supabaseAdmin.from('site_settings').update(body).eq('id', existing.id).select());
    } else {
      ({ data, error } = await supabaseAdmin.from('site_settings').insert([body]).select());
    }

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data?.[0] ?? null);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
