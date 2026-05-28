import React from 'react';
import { Platform, PlatformInfo } from './types';

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const StoryIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <circle cx="12" cy="12" r="9" strokeDasharray="3 2" />
  </svg>
);

const TikTokIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const YouTubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

const SpotifyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12.5s2-1 4-1 4 1 4 1" />
    <path d="M7 10.5s2.5-1.5 5-1.5 5 1.5 5 1.5" />
    <path d="M9 14.5s1.5-.5 3-.5 3 .5 3 .5" />
  </svg>
);

export const PLATFORMS: PlatformInfo[] = [
  {
    id: Platform.INSTAGRAM,
    name: 'Instagram',
    icon: <InstagramIcon />,
    placeholder: 'https://www.instagram.com/p/... (Post atau Reel)',
    color: 'from-purple-400/20 to-pink-400/20',
    glow: 'rgba(168, 85, 247, 0.15)',
    accentColor: '#c084fc',
  },
  {
    id: Platform.IG_STORY,
    name: 'IG Story',
    icon: <StoryIcon />,
    placeholder: 'https://www.instagram.com/stories/...',
    color: 'from-amber-400/20 to-orange-400/20',
    glow: 'rgba(251, 191, 36, 0.12)',
    accentColor: '#fbbf24',
  },
  {
    id: Platform.TIKTOK,
    name: 'TikTok',
    icon: <TikTokIcon />,
    placeholder: 'https://www.tiktok.com/@user/video/...',
    color: 'from-sky-400/20 to-cyan-400/20',
    glow: 'rgba(56, 189, 248, 0.12)',
    accentColor: '#38bdf8',
  },
  {
    id: Platform.YOUTUBE_MP4,
    name: 'YouTube',
    icon: <YouTubeIcon />,
    placeholder: 'https://www.youtube.com/watch?v=...',
    color: 'from-red-400/20 to-rose-500/20',
    glow: 'rgba(248, 113, 113, 0.12)',
    accentColor: '#f87171',
  },
  {
    id: Platform.SPOTIFY,
    name: 'Spotify',
    icon: <SpotifyIcon />,
    placeholder: 'https://open.spotify.com/track/...',
    color: 'from-emerald-400/20 to-green-500/20',
    glow: 'rgba(52, 211, 153, 0.12)',
    accentColor: '#34d399',
  },
];
