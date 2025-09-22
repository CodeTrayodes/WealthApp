// src/app/api/cas/request/route.js
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req) {
  const { user_id, org_id, pan, email, provider = 'cams' } = await req.json();
  if (!user_id || !org_id || !pan || !email) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  // Encrypt inside DB
  const { data: enc, error: encErr } = await supabaseAdmin
    .rpc('encrypt_pan_with_key', { p_pan: pan, p_key: process.env.PAN_KEY });
  if (encErr) return NextResponse.json({ error: encErr.message }, { status: 500 });

  const { error: upErr } = await supabaseAdmin.from('pan_links').upsert({
    user_id,
    org_id,
    pan_cipher: enc,
    pan_last4: pan.slice(-4).toUpperCase(),
    email_on_record: email,
    consent_text: 'CAS retrieval for portfolio display'
  });
  if (upErr) return NextResponse.json({ error: upErr.message }, { status: 500 });

  // Create request
  const { data: casReq, error: reqErr } = await supabaseAdmin
    .from('cas_requests')
    .insert({ user_id, org_id, provider, status: 'otp_required' })
    .select().single();
  if (reqErr) return NextResponse.json({ error: reqErr.message }, { status: 500 });

  // In demo, auto-OTP
  if (process.env.DEMO_MODE === 'true') {
    await supabaseAdmin.from('cas_requests')
      .update({ status: 'ready', updated_at: new Date().toISOString() })
      .eq('id', casReq.id);
    return NextResponse.json({ cas_request_id: casReq.id, next: 'parse' });
  }

  return NextResponse.json({ cas_request_id: casReq.id, next: 'otp' });
}
