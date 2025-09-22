// src/app/link-accounts/page.js
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

export default function LinkAccountsPage() {
  const [pan, setPan] = useState('');
  const [email, setEmail] = useState('');
  const [casRequestId, setCasRequestId] = useState(null);
  const [step, setStep] = useState('form'); // form -> otp -> parse -> done
  const [orgId, setOrgId] = useState('demo-org'); // replace with real org id
  const userId = 'demo-user'; // replace with auth user id

  const requestCAS = async () => {
    const res = await fetch('/api/cas/request', {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, org_id: orgId, pan, email, provider: 'cams' })
    });
    const data = await res.json();
    if (data.cas_request_id) {
      setCasRequestId(data.cas_request_id);
      setStep(data.next === 'parse' ? 'parse' : 'otp');
    } else {
      alert(data.error || 'Failed');
    }
  };

  const verifyOTP = async () => {
    const res = await fetch('/api/cas/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ cas_request_id: casRequestId, otp: '000000' })
    });
    const data = await res.json();
    if (data.next === 'parse') setStep('parse');
  };

  const parseCAS = async () => {
    const res = await fetch('/api/cas/parse', {
      method: 'POST',
      body: JSON.stringify({ cas_request_id: casRequestId })
    });
    const data = await res.json();
    if (data.ok) setStep('done');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Link Your Investments</CardTitle>
            <CardDescription>Use your PAN and registered email to import holdings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === 'form' && (
              <>
                <div className="space-y-2">
                  <Label>PAN</Label>
                  <Input value={pan} onChange={e=>setPan(e.target.value.toUpperCase())} placeholder="ABCDE1234F" />
                </div>
                <div className="space-y-2">
                  <Label>Registered Email</Label>
                  <Input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com" />
                </div>
                <Button variant="primary" className="w-full" onClick={requestCAS}>Request CAS</Button>
                <p className="text-xs text-gray-500">We will never store your PAN in plaintext.</p>
              </>
            )}

            {step === 'otp' && (
              <>
                <p className="text-sm text-gray-600">Enter the OTP sent to your email.</p>
                <Button variant="primary" className="w-full" onClick={verifyOTP}>Verify OTP</Button>
              </>
            )}

            {step === 'parse' && (
              <>
                <p className="text-sm text-gray-600">Parsing your statement…</p>
                <Button variant="primary" className="w-full" onClick={parseCAS}>Continue</Button>
              </>
            )}

            {step === 'done' && (
              <>
                <p className="text-sm text-green-700">Holdings imported successfully.</p>
                <a href={`/dashboard?org_id=${orgId}`} className="block">
                  <Button variant="primary" className="w-full">Go to Dashboard</Button>
                </a>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
