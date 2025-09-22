// src/app/api/dashboard/route.js
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET(req) {
  const org_id = new URL(req.url).searchParams.get('org_id');
  if (!org_id) return NextResponse.json({ error: 'org_id required' }, { status: 400 });

  const { data: pos, error } = await supabaseAdmin
    .from('positions')
    .select(`
      qty, avg_cost, as_of_date,
      instruments(id, name, asset_class),
      accounts(id, provider, account_ref)
    `)
    .eq('org_id', org_id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  let totalCost = 0, totalValue = 0;
  const holdings = (pos || []).map(p => {
    const value = p.qty * p.avg_cost; // V0: MTM = cost (we’ll add NAV/price later)
    totalCost += p.qty * p.avg_cost;
    totalValue += value;
    return {
      name: p.instruments.name,
      asset_class: p.instruments.asset_class,
      account: p.accounts.account_ref,
      qty: Number(p.qty),
      avg_cost: Number(p.avg_cost),
      value: Number(value)
    };
  });

  return NextResponse.json({
    net_worth: Number(totalValue.toFixed(2)),
    pnl: Number((totalValue - totalCost).toFixed(2)),
    holdings
  });
}
