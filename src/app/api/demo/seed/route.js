// src/app/api/demo/seed/route.js
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req) {
  if (process.env.DEMO_MODE !== 'true') return NextResponse.json({ error: 'disabled' }, { status: 403 });
  const { user_id, org_name = 'Family Office' } = await req.json();

  // Create org + member if not present
  const { data: org } = await supabaseAdmin.from('orgs').insert({ name: org_name }).select().single();
  await supabaseAdmin.from('org_members').insert({ org_id: org.id, user_id, role: 'owner' });

  // Minimal account + instruments + positions
  const { data: acc } = await supabaseAdmin.from('accounts')
    .insert({ org_id: org.id, provider: 'CAMS', account_ref: 'FOLIO xxxx1234', type: 'mf_folio' })
    .select().single();

  const insts = [
    { isin: 'INF109K01ZT1', name: 'HDFC S&P BSE 500', asset_class: 'mutual_fund' },
    { isin: 'INF174K01LS2', name: 'SBI Nifty 50', asset_class: 'mutual_fund' }
  ];

  for (const i of insts) {
    const { data: inst } = await supabaseAdmin.from('instruments')
      .upsert(i, { onConflict: 'isin' }).select().single();
    await supabaseAdmin.from('positions').insert({
      org_id: org.id, account_id: acc.id, instrument_id: inst.id,
      qty: 100, avg_cost: 200, as_of_date: '2025-09-18'
    });
  }

  return NextResponse.json({ ok: true, org_id: org.id });
}
