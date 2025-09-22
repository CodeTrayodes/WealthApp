'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  CalendarDaysIcon,
  ClockIcon,
  UserIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  VideoCameraIcon,
  PhoneIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

/* -------------------- utils -------------------- */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const phoneDigits = (s) => (s || '').replace(/[^\d]/g, '');

/* -------------------- data -------------------- */
const countryCodes = [
  { value: '+91', label: 'India (+91)' },
  { value: '+1', label: 'USA/Canada (+1)' },
  { value: '+44', label: 'UK (+44)' },
  { value: '+971', label: 'UAE (+971)' },
  { value: '+65', label: 'Singapore (+65)' },
  { value: '+61', label: 'Australia (+61)' },
];

const timezones = [
  { value: 'UTC+05:30', label: 'India Standard Time (IST)', offset: '+05:30' },
  { value: 'UTC-05:00', label: 'Eastern Time (ET)', offset: '-05:00' },
  { value: 'UTC-08:00', label: 'Pacific Time (PT)', offset: '-08:00' },
  { value: 'UTC+00:00', label: 'Greenwich Mean Time (GMT)', offset: '+00:00' },
  { value: 'UTC+01:00', label: 'Central European Time (CET)', offset: '+01:00' },
  { value: 'UTC+04:00', label: 'UAE Standard Time (GST)', offset: '+04:00' },
  { value: 'UTC+08:00', label: 'Singapore Standard Time (SGT)', offset: '+08:00' },
];

/* -------------------- tiny custom select -------------------- */
/** Yellow-themed dropdown (keyboard + click). */
function FancySelect({ value, onChange, options, className, buttonClassName, menuClassName, label }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  const current = options.find((o) => o.value === value) || options[0];

  useEffect(() => {
    const onDoc = (e) => {
      if (!menuRef.current || !btnRef.current) return;
      if (!menuRef.current.contains(e.target) && !btnRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const onKeyDown = (e) => {
    if (!open && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown')) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (open && e.key === 'Escape') setOpen(false);
  };

  return (
    <div className={`relative ${className || ''}`}>
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onKeyDown}
        className={
          buttonClassName ||
          'w-full bg-black text-white text-sm rounded-lg border border-yellow-500 px-3 py-2 pr-9 focus:outline-none focus:ring-2 focus:ring-yellow-500/30'
        }
      >
        <span className="truncate">{current?.label || label}</span>
        <ChevronDownIcon className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      </button>

      {open && (
        <ul
          ref={menuRef}
          role="listbox"
          tabIndex={-1}
          className={
            menuClassName ||
            'absolute z-50 mt-2 max-h-64 w-full overflow-auto rounded-xl border border-yellow-500/40 bg-black shadow-xl'
          }
        >
          {options.map((opt) => {
            const active = opt.value === value;
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={active}
                onClick={() => {
                  onChange?.(opt.value);
                  setOpen(false);
                }}
                className={`cursor-pointer px-3 py-2 text-sm ${
                  active
                    ? 'bg-yellow-500 text-black'
                    : 'text-white hover:bg-yellow-500/10'
                }`}
              >
                {opt.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* -------------------- main component -------------------- */
const ScheduleCall = ({
  hasUploadedDocuments = false,
  onBack = () => {},
  onComplete = () => {}, // default no-op prevents runtime error
}) => {
  const [selectedTimezone, setSelectedTimezone] = useState('UTC+05:30');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isScheduling, setIsScheduling] = useState(false);

  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    preferredMethod: 'video', // 'video' | 'phone'
    countryCode: '+91',
    phone: '',
  });

  // availability
  useEffect(() => {
    const slots = {};
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateKey = date.toISOString().split('T')[0];
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        slots[dateKey] = [
          '09:00','09:30','10:00','10:30','11:00','11:30',
          '14:00','14:30','15:00','15:30','16:00','16:30','17:00',
        ];
      }
    }
    setAvailableSlots(slots);
  }, []);

  const days = useMemo(() => {
    const y = currentMonth.getFullYear();
    const m = currentMonth.getMonth();
    const first = new Date(y, m, 1);
    const last = new Date(y, m + 1, 0);
    const pad = first.getDay();
    const out = [];
    for (let i = 0; i < pad; i++) out.push(null);
    for (let d = 1; d <= last.getDate(); d++) {
      const date = new Date(y, m, d);
      const dateKey = date.toISOString().split('T')[0];
      const isAvailable = !!(availableSlots[dateKey]?.length);
      const isPast = date < new Date(new Date().toDateString());
      out.push({
        day: d, date, dateKey,
        isAvailable: isAvailable && !isPast,
        isPast,
      });
    }
    return out;
  }, [currentMonth, availableSlots]);

  const monthYear = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const tzObj = timezones.find((t) => t.value === selectedTimezone);

  // validation
  const emailValid = emailRegex.test(contactInfo.email.trim());
  const phoneValid =
    contactInfo.preferredMethod === 'phone'
      ? phoneDigits(contactInfo.phone).length >= 8
      : true;

  const isFormReady =
    !!selectedDate &&
    !!selectedTime &&
    !!contactInfo.name.trim() &&
    (contactInfo.preferredMethod === 'video' ? emailValid : phoneValid);

  const handleSchedule = async () => {
    if (!isFormReady) return;
    setIsScheduling(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsScheduling(false);

    if (contactInfo.preferredMethod === 'video') {
      toast.success('Email sent with your secure meeting link.');
    } else {
      toast.success('WhatsApp message sent with call details.');
    }

    onComplete({
      date: selectedDate.dateKey,
      time: selectedTime,
      timezone: selectedTimezone,
      contact: contactInfo,
    });
  };

  const nextMonth = () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  const prevMonth = () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Schedule Your Consultation
        </h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-3xl mx-auto">
          Book a 30-minute consultation with our team. We’ll help finalize your onboarding and next steps.
        </p>
      </div>

      {/* Status banner */}
      <div
        className={`rounded-2xl p-4 text-center border ${
          hasUploadedDocuments
            ? 'bg-green-500/10 border-green-500/20 text-green-400'
            : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'
        }`}
      >
        {hasUploadedDocuments
          ? 'Documents uploaded — ready for consultation.'
          : 'Tip: Have your documents handy during the call.'}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar pane */}
        <div className="lg:col-span-2 rounded-2xl border border-gray-800 bg-gray-900 p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3 mb-5">
            <h3 className="text-lg sm:text-xl font-bold text-white">Select Date & Time</h3>

            {/* Custom dropdown for timezone */}
            <FancySelect
              value={selectedTimezone}
              onChange={setSelectedTimezone}
              options={timezones}
              className="w-72 max-w-[75vw]"
            />
          </div>

          {/* Calendar header */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={prevMonth}
              className="p-2 rounded-lg hover:bg-gray-800 text-gray-400"
              aria-label="Previous month"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <h4 className="text-base sm:text-lg font-semibold text-white">{monthYear}</h4>
            <button
              onClick={nextMonth}
              className="p-2 rounded-lg hover:bg-gray-800 text-gray-400"
              aria-label="Next month"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Week header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d) => (
              <div key={d} className="text-center text-gray-400 text-xs sm:text-sm py-1">{d}</div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, i) => (
              <button
                key={i}
                disabled={!day || day.isPast || !day.isAvailable}
                onClick={() => day && setSelectedDate(day)}
                className={[
                  'relative aspect-square rounded-lg text-sm transition',
                  !day
                    ? 'pointer-events-none'
                    : day.isPast || !day.isAvailable
                    ? 'text-gray-600 cursor-not-allowed'
                    : selectedDate?.dateKey === day.dateKey
                    ? 'bg-yellow-500 text-black font-semibold'
                    : 'text-white hover:bg-gray-800',
                ].join(' ')}
              >
                {day?.day}
                {day?.isAvailable && (
                  <span className="absolute bottom-1 h-1 w-1 rounded-full bg-green-400 left-1/2 -translate-x-1/2" />
                )}
              </button>
            ))}
          </div>

          {/* Time slots */}
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 pt-5 border-t border-gray-800"
            >
              <h4 className="text-white font-semibold mb-3">Available Times</h4>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {availableSlots[selectedDate.dateKey]?.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition ${
                      selectedTime === t
                        ? 'bg-yellow-500 text-black'
                        : 'bg-gray-800 text-white hover:bg-gray-700'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Info pane */}
        <div className="space-y-5">
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5 sm:p-6">
            <h3 className="text-lg font-bold text-white mb-4">Your Information</h3>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={contactInfo.name}
                  onChange={(e) => setContactInfo((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Enter your full name"
                  className="input-primary w-full"
                />
              </div>

              {/* Preferred method */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Method</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setContactInfo((p) => ({ ...p, preferredMethod: 'video' }))}
                    className={`flex items-center justify-center gap-2 py-2 rounded-lg ${
                      contactInfo.preferredMethod === 'video'
                        ? 'bg-yellow-500 text-black'
                        : 'bg-gray-800 text-white hover:bg-gray-700'
                    }`}
                  >
                    <VideoCameraIcon className="w-4 h-4" /> Video
                  </button>
                  <button
                    onClick={() => setContactInfo((p) => ({ ...p, preferredMethod: 'phone' }))}
                    className={`flex items-center justify-center gap-2 py-2 rounded-lg ${
                      contactInfo.preferredMethod === 'phone'
                        ? 'bg-yellow-500 text-black'
                        : 'bg-gray-800 text-white hover:bg-gray-700'
                    }`}
                  >
                    <PhoneIcon className="w-4 h-4" /> Phone
                  </button>
                </div>
              </div>

              {/* Email (required for video) */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email {contactInfo.preferredMethod === 'video' && '*'}
                </label>
                <input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo((p) => ({ ...p, email: e.target.value }))}
                  placeholder="name@example.com"
                  className={`input-primary w-full ${
                    contactInfo.preferredMethod === 'video' && contactInfo.email && !emailValid
                      ? 'ring-2 ring-red-400'
                      : ''
                  }`}
                />
                {contactInfo.preferredMethod === 'video' && contactInfo.email && !emailValid && (
                  <p className="text-xs text-red-400 mt-1">Please enter a valid email for video calls.</p>
                )}
              </div>

              {/* Phone (country code & number on separate rows) */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number {contactInfo.preferredMethod === 'phone' && '*'}
                </label>

                {/* Country code - its own row */}
                <FancySelect
                  value={contactInfo.countryCode}
                  onChange={(v) => setContactInfo((p) => ({ ...p, countryCode: v }))}
                  options={countryCodes}
                  className="w-full mb-2"
                />

                {/* Phone number - below country code */}
                <input
                  type="tel"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo((p) => ({ ...p, phone: e.target.value }))}
                  placeholder="Enter phone number"
                  className={`input-primary w-full ${
                    contactInfo.preferredMethod === 'phone' && contactInfo.phone && !phoneValid
                      ? 'ring-2 ring-red-400'
                      : ''
                  }`}
                />
                {contactInfo.preferredMethod === 'phone' && contactInfo.phone && !phoneValid && (
                  <p className="text-xs text-red-400 mt-1">
                    Please enter a valid phone number.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Summary */}
          {selectedDate && selectedTime && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-5"
            >
              <h3 className="text-lg font-bold text-white mb-3">Meeting Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CalendarDaysIcon className="w-4 h-4 text-yellow-500" />
                  <span className="text-white">
                    {selectedDate.date.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4 text-yellow-500" />
                  <span className="text-white">
                    {selectedTime} ({tzObj?.offset})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4 text-yellow-500" />
                  <span className="text-white">NRI Consultation (30 min)</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-800">
        <motion.button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-800 text-white font-semibold hover:bg-gray-700"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Documents
        </motion.button>

        <motion.button
          onClick={handleSchedule}
          disabled={!isFormReady || isScheduling}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold ${
            !isFormReady || isScheduling
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-yellow-500 text-black hover:bg-yellow-400'
          }`}
          whileHover={isFormReady && !isScheduling ? { scale: 1.02 } : {}}
          whileTap={isFormReady && !isScheduling ? { scale: 0.98 } : {}}
        >
          {isScheduling ? (
            <>
              <div className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
              Scheduling…
            </>
          ) : (
            <>
              Confirm Meeting
              <ArrowRightIcon className="w-5 h-5" />
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default ScheduleCall;
