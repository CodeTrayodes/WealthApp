// example: src/app/api/pan/upsert/route.js
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req) {
  const { user_id, org_id, pan, email, consent_text } = await req.json();
  if (!pan || !email) return NextResponse.json({ error: 'PAN and email required' }, { status: 400 });

  // 1) Encrypt & hash inside DB
  const { data: enc, error: encErr } = await supabaseAdmin
    .rpc('encrypt_pan_with_key', { p_pan: pan.trim().toUpperCase(), p_key: process.env.PAN_KEY });

  if (encErr) return NextResponse.json({ error: encErr.message }, { status: 500 });

  const { data: hashRes, error: hashErr } = await supabaseAdmin
    .rpc('hash_pan', { p_pan: pan });

  if (hashErr) return NextResponse.json({ error: hashErr.message }, { status: 500 });

  // 2) Upsert into pan_links
  const pan_last4 = pan.slice(-4).toUpperCase();
  const { error: upErr } = await supabaseAdmin.from('pan_links').upsert({
    user_id,
    org_id,
    pan_cipher: enc,        // bytea from RPC
    pan_last4,              // for UI
    email_on_record: email,
    consent_text
  });

  if (upErr) return NextResponse.json({ error: upErr.message }, { status: 500 });

  return NextResponse.json({ ok: true, pan_last4 });
}
