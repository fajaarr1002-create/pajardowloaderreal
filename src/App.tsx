import React, { useState, useEffect } from 'react';
import { DownloadSection } from './components/DownloadSection';

export default function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="app-root relative min-h-screen w-full overflow-x-hidden">
      {/* Grain texture */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Ambient glow orbs */}
      <div
        className="fixed pointer-events-none"
        style={{
          top: '-15%',
          left: '-10%',
          width: '55%',
          height: '55%',
          background: 'radial-gradient(circle, rgba(200,195,180,0.03) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />
      <div
        className="fixed pointer-events-none"
        style={{
          bottom: '-10%',
          right: '-8%',
          width: '45%',
          height: '45%',
          background: 'radial-gradient(circle, rgba(180,195,200,0.025) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        aria-hidden="true"
      />

      {/* Subtle center radial */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,255,255,0.015) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Floating Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          mounted ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
        }`}
      >
        <div className="mx-auto max-w-6xl px-5 md:px-8 pt-5">
          <nav className="navbar-glass flex items-center justify-between px-5 py-3.5 rounded-2xl">
            <div className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(200,195,180,0.1)', border: '1px solid rgba(200,195,180,0.15)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8c3b4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </div>
              <span className="text-sm font-semibold tracking-tight text-[#ece9e3]">Jar</span>
              <span
                className="text-[10px] font-medium px-2 py-0.5 rounded-md tracking-wide"
                style={{ background: 'rgba(200,195,180,0.07)', border: '1px solid rgba(200,195,180,0.1)', color: '#7a7a73' }}
              >
                DOWNLOADER
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70 animate-pulse" />
                <span className="text-[11px] text-[#4a4a47] font-medium tracking-wide">Online</span>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main
        className={`relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-32 pb-24 transition-all duration-700 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {/* Hero */}
        <div className="text-center mb-14 space-y-5">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-medium tracking-widest uppercase"
            style={{
              background: 'rgba(200,195,180,0.05)',
              border: '1px solid rgba(200,195,180,0.1)',
              color: '#6a6a63',
            }}
          >
            <span className="w-1 h-1 rounded-full bg-[#c8c3b4]/50" />
            Media Downloader Premium
          </div>

          <h1 className="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.05]">
            Jar Downloader
          </h1>

          <p className="text-[#4a4a47] text-sm md:text-base font-medium max-w-lg mx-auto leading-relaxed">
            Simpan konten favorit dari Instagram, TikTok, YouTube, dan Spotify.
            Kualitas terbaik, instan, tanpa watermark.
          </p>
        </div>

        {/* Main Card */}
        <div className="main-card rounded-[2rem] overflow-hidden">
          <DownloadSection />
        </div>

        {/* Stats Row */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 md:gap-14">
          {[
            { label: 'Platform', value: '5' },
            { label: 'Format', value: 'MP4 & MP3' },
            { label: 'Kualitas', value: 'HD 1080p' },
            { label: 'Kecepatan', value: 'Instan' },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="text-lg md:text-xl font-semibold text-[#c8c3b4]">{value}</p>
              <p className="text-[11px] text-[#3a3a38] font-medium tracking-widest uppercase mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 pb-8 text-center">
        <div
          className="inline-block w-px h-8 mb-6"
          style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.06), transparent)' }}
        />
        <p className="text-[11px] text-[#2e2e2c] font-medium tracking-[0.3em] uppercase">
          © {new Date().getFullYear()} Jar — All rights reserved
        </p>
      </footer>
    </div>
  );
}
