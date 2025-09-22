// src/app/api/cas/upload/route.js
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req) {
  const form = await req.formData();
  const cas_request_id = form.get('cas_request_id');
  const file = form.get('file');
  if (!cas_request_id || !file) return NextResponse.json({ error: 'Missing' }, { status: 400 });

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const path = `cas/${cas_request_id}.pdf`;

  const { error: upErr } = await supabaseAdmin.storage.from('cas')
    .upload(path, buffer, { contentType: 'application/pdf', upsert: true });
  if (upErr) return NextResponse.json({ error: upErr.message }, { status: 500 });

  await supabaseAdmin.from('cas_files').insert({
    cas_request_id,
    storage_path: path,
    password_hint: 'PAN+DOB (as per RTA)'
  });
  await supabaseAdmin.from('cas_requests').update({ status: 'ready' }).eq('id', cas_request_id);

  return NextResponse.json({ ok: true, next: 'parse' });
}
