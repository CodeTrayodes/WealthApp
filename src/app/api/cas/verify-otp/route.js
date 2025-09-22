// src/app/api/cas/verify-otp/route.js
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req) {
  const { cas_request_id, otp } = await req.json();
  if (!cas_request_id || !otp) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

  // For V0, just mark ready
  await supabaseAdmin.from('cas_requests')
    .update({ status: 'ready', updated_at: new Date().toISOString() })
    .eq('id', cas_request_id);

  return NextResponse.json({ ok: true, next: 'parse' });
}
