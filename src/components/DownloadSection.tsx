import React, { useState } from 'react';
import { Platform, DownloadResult } from '../types';
import { PLATFORMS } from '../constants';
import { PlatformButton } from './PlatformButton';
import { ResultDisplay } from './ResultDisplay';
import { fetchDownload } from '../services/downloadService';

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const SpinnerIcon = () => (
  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24">
    <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
    <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);

const AlertIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

export const DownloadSection: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(Platform.INSTAGRAM);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DownloadResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const activePlatform = PLATFORMS.find(p => p.id === selectedPlatform)!;

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setError('Harap masukkan tautan yang valid.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await fetchDownload({ platform: selectedPlatform, link: url });
      if (data.status) {
        setResult(data);
      } else {
        setError(data.error || 'Gagal memproses. Pastikan tautan benar dan coba lagi.');
      }
    } catch (err) {
      console.error(err);
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 md:p-8 space-y-8">
      {/* Platform Tabs */}
      <div className="flex flex-wrap justify-center gap-1" role="tablist">
        {PLATFORMS.map((platform) => (
          <PlatformButton
            key={platform.id}
            platform={platform}
            isActive={selectedPlatform === platform.id}
            onClick={() => {
              setSelectedPlatform(platform.id);
              setError(null);
            }}
          />
        ))}
      </div>

      {/* Input Area */}
      <form onSubmit={handleDownload} className="relative max-w-2xl mx-auto">
        <div className="input-wrapper relative flex flex-col sm:flex-row items-stretch sm:items-center overflow-hidden rounded-2xl transition-all duration-300">
          <div className="flex items-center flex-1 px-5 gap-3">
            <span className="text-[#3a3a38] flex-shrink-0 transition-colors duration-300 group-focus-within:text-[#7a7a73]">
              {activePlatform.icon}
            </span>
            <input
              type="text"
              value={url}
              onChange={(e) => { setUrl(e.target.value); setError(null); }}
              placeholder={activePlatform.placeholder}
              disabled={loading}
              className="flex-1 bg-transparent py-5 text-[#ece9e3] placeholder-[#2e2e2c] focus:outline-none text-sm font-medium min-w-0 disabled:opacity-50"
            />
          </div>

          <div className="px-3 py-3 sm:py-0">
            <button
              type="submit"
              disabled={loading}
              className={`extract-btn w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 ${
                loading
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {loading ? (
                <>
                  <SpinnerIcon />
                  <span>Memproses</span>
                </>
              ) : (
                <>
                  <span>Ekstrak</span>
                  <ArrowRightIcon />
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Loading Skeleton */}
      {loading && (
        <div className="max-w-2xl mx-auto space-y-3 reveal-up">
          <div className="skeleton-pulse h-4 rounded-lg w-3/4" />
          <div className="skeleton-pulse h-4 rounded-lg w-1/2" />
          <div className="skeleton-pulse h-20 rounded-2xl w-full" />
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="max-w-2xl mx-auto reveal-up">
          <div className="error-card flex items-start gap-3 px-5 py-4 rounded-2xl">
            <span className="text-[#f87171] mt-0.5 flex-shrink-0">
              <AlertIcon />
            </span>
            <p className="text-sm text-[#c8a0a0] font-medium leading-relaxed">{error}</p>
          </div>
        </div>
      )}

      {/* Result */}
      {result && !loading && (
        <div className="max-w-4xl mx-auto">
          <ResultDisplay result={result} platform={activePlatform} />
        </div>
      )}
    </div>
  );
};
