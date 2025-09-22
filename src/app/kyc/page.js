'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import Header from '@/components/layout/Header';
import DocumentUpload from '@/components/kyc/DocumentUpload';
import ScheduleCall from '@/components/kyc/ScheduleCall'; // <-- use your existing component
import { cn } from '@/lib/utils';
import { toast } from 'react-hot-toast';
import {
  ShieldCheckIcon,
  ClockIcon,
  CheckCircleIcon,
  CalendarIcon,
  LockClosedIcon,
  CloudArrowUpIcon,
} from '@heroicons/react/24/outline';

/** ----- Config ----- */
const DOCS = [
  { id: 'pan',       title: 'PAN Card',                     description: 'Clear copy of your Permanent Account Number card issued by Income Tax Department' },
  { id: 'passport',  title: 'Indian/Foreign Passport',      description: 'Valid passport showing personal details and visa status' },
  { id: 'fatca',     title: 'FATCA Declaration',            description: 'Foreign Account Tax Compliance Act declaration form' },
  { id: 'cheque',    title: 'Cancelled Cheque (NRE/NRO)',   description: 'Cancelled cheque or bank statement of your NRE/NRO account' },
  { id: 'address',    title: 'Address Proof',               description: 'Utility bill / bank statement / BRP / tenancy agreement (recent)' },
];

// Step indices to match your UI: 1=Requirements, 2=Upload, 3=Schedule, 4=Verification
const STEP_UPLOAD = 2;
const STEP_SCHEDULE = 3;

export default function KYCPage() {
  /** ----- State ----- */
  const [currentStep, setCurrentStep] = useState(STEP_UPLOAD);
  const [uploaded, setUploaded] = useState(() =>
    DOCS.reduce((acc, d) => ({ ...acc, [d.id]: null }), {})
  );

  const scheduleRef = useRef(null);

  /** ----- Derived ----- */
  const uploadedCount = useMemo(
    () => Object.values(uploaded).filter(Boolean).length,
    [uploaded]
  );
  const progress = useMemo(
    () => Math.round((uploadedCount / DOCS.length) * 100),
    [uploadedCount]
  );
  const canContinue = uploadedCount >= 3; // adjust your threshold if needed

  /** ----- Handlers ----- */
  const handleDocChange = useCallback((docId, payloadOrNull) => {
    setUploaded((prev) => ({ ...prev, [docId]: payloadOrNull }));
  }, []);

  const handleContinueToSchedule = useCallback(() => {
    // In a real flow, you might persist uploads here first.
    setCurrentStep(STEP_SCHEDULE);
    // Smooth scroll to the schedule section
    requestAnimationFrame(() => {
      scheduleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, []);

  const handleCallBooked = useCallback((payload) => {
    // payload could be { date, time, timezone, calendarEventId, ... }
    setCurrentStep(4); // Verification step next
    // Optionally route: router.push('/kyc/verification')
  }, []);

  const handleReset = () => {
    setUploaded(DOCS.reduce((acc, d) => ({ ...acc, [d.id]: null }), {}));
  };

  /** ----- Render ----- */
  return (
    <div className="min-h-screen bg-black text-white pt-20 md:pt-24">
      {/* ✅ Header restored */}
      <Header />

      {/* HERO */}
      <section className="bg-white text-black rounded-b-[2rem]">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-8 sm:py-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-center">
            Complete Your <span className="text-yellow-500">KYC Verification</span>
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-center text-gray-700 text-sm sm:text-base">
            Start your investment journey with India&apos;s most trusted NRI wealth management
            platform. Complete KYC in minutes and unlock exclusive investment opportunities.
          </p>

          {/* badges */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
            <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1">
              <ShieldCheckIcon className="h-4 w-4 text-green-600" /> RBI Compliant
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1">
              <ClockIcon className="h-4 w-4 text-yellow-600" /> ~15 minutes
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1">
              <LockClosedIcon className="h-4 w-4 text-blue-600" /> Secure Process
            </span>
          </div>
        </div>
      </section>

      {/* PROGRESS + STEPS */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 pt-6">
        <div className="rounded-3xl border border-gray-900 bg-[#0b0b0b] p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">KYC Progress</h2>
            <p className="text-sm text-yellow-400">Documents: {uploadedCount}/{DOCS.length}</p>
          </div>

          <div className="mt-3">
            <div className="h-2 w-full rounded-full bg-gray-800">
              <div
                className={cn('h-2 rounded-full bg-yellow-500 transition-[width] duration-300 ease-out')}
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-gray-400">{progress}% Complete</p>
          </div>
        </div>

        {/* Steps row */}
        <div className="mt-6 grid grid-cols-4 gap-4">
          <StepBadge active={currentStep >= 1} icon={<CheckCircleIcon className="h-5 w-5" />} label="Document Requirements" />
          <StepBadge active={currentStep >= 2} icon={<CloudArrowUpIcon className="h-5 w-5" />} label="Upload Documents" />
          <StepBadge active={currentStep >= 3} icon={<CalendarIcon className="h-5 w-5" />} label="Schedule Consultation" />
          <StepBadge active={currentStep >= 4} icon={<ShieldCheckIcon className="h-5 w-5" />} label="Verification" />
        </div>
      </section>

      {/* UPLOAD SECTION */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 pt-6">
        <div className="rounded-3xl border border-gray-900 bg-[#0b0b0b] p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl font-bold">Upload Documents</h3>
            <p className="text-sm text-gray-400">{uploadedCount}/{DOCS.length} uploaded</p>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
            {DOCS.map((d) => (
              <DocumentUpload
                key={d.id}
                docId={d.id}
                title={d.title}
                description={d.description}
                accepted=".pdf,.jpg,.jpeg,.png"
                maxSizeMB={5}
                value={uploaded[d.id]}
                onChange={handleDocChange}
              />
            ))}
          </div>

          {/* CTA row */}
          <div className="mt-6 mb-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleContinueToSchedule}
              disabled={!canContinue}
              className={cn(
                'w-full sm:w-auto rounded-full px-6 py-3 font-semibold',
                canContinue
                  ? 'bg-yellow-500 text-black hover:bg-yellow-400'
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              )}
            >
              Continue to Schedule
            </button>
            <button
              onClick={handleReset}
              className="w-full sm:w-auto rounded-full bg-gray-900 px-6 py-3 font-semibold hover:bg-gray-800"
            >
              Reset
            </button>
          </div>
        </div>
      </section>

      {/* SCHEDULE CALL SECTION */}
      <section ref={scheduleRef} className="mx-auto w-full max-w-6xl px-4 sm:px-6 pt-6 pb-12">
        <div className="rounded-3xl border border-gray-900 bg-[#0b0b0b] p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl font-bold">Schedule Consultation</h3>
            <p className="text-sm text-gray-400">Step 3 of 4</p>
          </div>

          {/* Render your existing scheduler */}
          <div className="mt-5">
            <ScheduleCall
              hasUploadedDocuments={Object.values(uploaded).filter(Boolean).length > 0}
              onBack={() => {
                setCurrentStep(2);
                // scroll back to uploads
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onComplete={(result) => {
                // result: { date, time, timezone, contact }
                setCurrentStep(4); // Verification next
                toast.success('Consultation booked! We’ll be in touch.');
                // Optionally: router.push('/kyc/verification')
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

/** ----- Small presentational helpers ----- */
function StepBadge({ icon, label, active = false }) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-2xl border px-4 py-3',
        active
          ? 'border-yellow-500/30 bg-yellow-500/10'
          : 'border-gray-900 bg-[#0b0b0b]'
      )}
    >
      <div
        className={cn(
          'grid h-8 w-8 place-items-center rounded-full',
          active ? 'bg-yellow-500 text-black' : 'bg-gray-900 text-gray-400'
        )}
      >
        {icon}
      </div>
      <p className={cn('text-sm', active ? 'text-yellow-400' : 'text-gray-300')}>{label}</p>
    </div>
  );
}
