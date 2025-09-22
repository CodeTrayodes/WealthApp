// src/app/api/cas/parse/route.js
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req) {
  const { cas_request_id } = await req.json();
  if (!cas_request_id) return NextResponse.json({ error: 'Missing cas_request_id' }, { status: 400 });

  // Find org
  const { data: reqRow, error } = await supabaseAdmin
    .from('cas_requests').select('id, org_id').eq('id', cas_request_id).single();
  if (error) return NextResponse.json({ error: error.message }, { status: 404 });

  // === STUBBED parsed result (replace later) ===
  const parsed = {
    account: { provider: 'CAMS', account_ref: 'FOLIO xxxx1234', type: 'mf_folio' },
    positions: [
      { isin: 'INF109K01ZT1', name: 'HDFC S&P BSE 500', asset_class: 'mutual_fund', qty: 120.5, avg_cost: 682.13, as_of_date: '2025-09-18' },
      { isin: 'INF174K01LS2', name: 'SBI Nifty 50', asset_class: 'mutual_fund', qty: 90.0, avg_cost: 210.10, as_of_date: '2025-09-18' }
    ]
  };

  // upsert account
  const { data: acc } = await supabaseAdmin.from('accounts')
    .upsert({ org_id: reqRow.org_id, provider: parsed.account.provider, account_ref: parsed.account.account_ref, type: parsed.account.type },
            { onConflict: 'org_id,account_ref' })
    .select().single();

  for (const p of parsed.positions) {
    const { data: inst } = await supabaseAdmin.from('instruments')
      .upsert({ isin: p.isin, name: p.name, asset_class: p.asset_class }, { onConflict: 'isin' })
      .select().single();

    await supabaseAdmin.from('positions').upsert({
      org_id: reqRow.org_id,
      account_id: acc.id,
      instrument_id: inst.id,
      qty: p.qty,
      avg_cost: p.avg_cost,
      as_of_date: p.as_of_date
    });
  }

  await supabaseAdmin.from('cas_requests').update({ status: 'parsed' }).eq('id', cas_request_id);
  return NextResponse.json({ ok: true });
}
