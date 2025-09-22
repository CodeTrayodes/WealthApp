    
 // File: src/app/components/kyc/DocumentUpload.js


'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { cn, formatDate } from '@/lib/utils';
import {
  CloudArrowUpIcon,
  XMarkIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

/**
 * DocumentUpload (card-style)
 *
 * Props:
 * - docId: string (unique key)
 * - title: string
 * - description: string
 * - accepted: string (input `accept`, default '.pdf,.jpg,.jpeg,.png')
 * - maxSizeMB: number (default 5)
 * - value: { file?: File, name?: string, size?: number, type?: string, url?: string } | null
 * - onChange: (docId, payload|null) => void
 * - className: string (optional)
 */
export default function DocumentUpload({
  docId,
  title,
  description,
  accepted = '.pdf,.jpg,.jpeg,.png',
  maxSizeMB = 5,
  value,
  onChange,
  className,
}) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [localFile, setLocalFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState('');

  // When parent clears or preloads (url/name), mirror it locally for preview text
  useEffect(() => {
    // Clear
    if (!value) {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setLocalFile(null);
      setPreviewUrl(null);
      setError('');
      if (inputRef.current) inputRef.current.value = '';
      return;
    }

    // Preloaded URL (optional)
    if (value?.url && !localFile) {
      setPreviewUrl(value.url);
    }
  }, [value]); // eslint-disable-line

  const sizeLimitBytes = useMemo(() => maxSizeMB * 1024 * 1024, [maxSizeMB]);

  const validateFile = useCallback(
    (file) => {
      if (!file) return 'No file selected.';
      if (file.size > sizeLimitBytes) return `File too large. Max ${maxSizeMB}MB.`;

      // Accept whitelist
      const acceptList = accepted.split(',').map((s) => s.trim().toLowerCase());
      const fileExt = '.' + (file.name.split('.').pop() || '').toLowerCase();
      const fileType = (file.type || '').toLowerCase();
      const ok =
        acceptList.includes(fileExt) ||
        acceptList.includes(fileType) ||
        acceptList.some((a) => a.endsWith('/*') && fileType.startsWith(a.replace('/*', '')));
      if (!ok) return `Unsupported file type. Allowed: ${accepted}`;
      return '';
    },
    [accepted, maxSizeMB, sizeLimitBytes]
  );

  const setFile = useCallback(
    (file) => {
      const err = validateFile(file);
      if (err) {
        setError(err);
        return;
      }
      setError('');
      setLocalFile(file);

      if (previewUrl) URL.revokeObjectURL(previewUrl);
      const nextUrl =
        file && (file.type.startsWith('image/') || file.type === 'application/pdf')
          ? URL.createObjectURL(file)
          : null;
      setPreviewUrl(nextUrl);

      // ✅ notify parent (event, not during render)
      onChange?.(docId, {
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        // url will be filled by server after upload if you persist it
      });
    },
    [docId, onChange, previewUrl, validateFile]
  );

  const clearFile = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setLocalFile(null);
    setError('');
    onChange?.(docId, null);
    if (inputRef.current) inputRef.current.value = '';
  }, [docId, onChange, previewUrl]);

  // DnD
  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) setFile(file);
  };

  const hasFile = !!localFile || !!value;

  return (
    <div
      className={cn(
        // Card container (keeps your dashed outline look)
        'rounded-3xl border border-gray-800 bg-[#0b0b0b] p-5 sm:p-6 relative',
        'hover:border-gray-700 transition-colors',
        className
      )}
    >
      <div className="absolute inset-0 rounded-3xl border border-dashed border-gray-700 pointer-events-none" />

      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900 border border-gray-800">
          <DocumentTextIcon className="h-6 w-6 text-gray-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="mt-1 text-sm text-gray-400">{description}</p>
        </div>
      </div>

      {/* Upload area */}
      {!hasFile ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          className={cn(
            'mt-5 rounded-2xl border-2 border-dashed p-5 sm:p-6 text-center',
            dragOver ? 'border-yellow-500 bg-yellow-500/10' : 'border-gray-700 bg-gray-900'
          )}
        >
          <CloudArrowUpIcon className="mx-auto h-8 w-8 text-gray-400" />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mt-2 text-sm font-semibold text-yellow-400 hover:text-yellow-300"
          >
            Click to upload or drag & drop
          </button>
          <p className="mt-1 text-xs text-gray-500">PDF, JPG, PNG (Max {maxSizeMB}MB)</p>

          <input
            ref={inputRef}
            type="file"
            accept={accepted}
            className="sr-only"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) setFile(f);
            }}
          />
        </div>
      ) : (
        <div className="mt-5 rounded-2xl border border-gray-800 bg-gray-900 p-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              <DocumentTextIcon className="h-6 w-6 text-yellow-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-white">
                {localFile?.name || value?.name}
              </p>
              <p className="text-xs text-gray-400">
                {humanBytes(localFile?.size ?? value?.size ?? 0)} •{' '}
                {(localFile?.type || value?.type || '').toUpperCase() || '—'}
              </p>

              {/* Optional tiny preview for images/pdf */}
              {!!previewUrl && (
                <div className="mt-3">
                  {localFile?.type?.startsWith('image/') ? (
                    <img
                      src={previewUrl}
                      alt="preview"
                      className="max-h-40 rounded-lg border border-gray-800 object-contain"
                    />
                  ) : localFile?.type === 'application/pdf' ? (
                    <div className="h-40 w-full rounded-lg border border-gray-800 grid place-items-center text-xs text-gray-400">
                      PDF preview
                    </div>
                  ) : null}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={clearFile}
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-800"
              aria-label={`Remove ${title}`}
              title="Remove file"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {!!error && <p className="mt-2 text-xs text-red-400">{error}</p>}

      <p className="mt-3 text-[11px] text-gray-500">
        Last updated: {formatDate(new Date(), 'long')}
      </p>
    </div>
  );
}

function humanBytes(bytes) {
  if (!bytes || isNaN(bytes)) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}
