import React from 'react';

export enum Platform {
  INSTAGRAM = 'instagram',
  IG_STORY = 'igstory',
  TIKTOK = 'tiktok',
  YOUTUBE_MP4 = 'ytmp4',
  SPOTIFY = 'spotify'
}

export interface PlatformInfo {
  id: Platform;
  name: string;
  icon: React.ReactNode;
  placeholder: string;
  color: string;
  glow: string;
  accentColor: string;
}

export interface MediaItem {
  url: string;
  quality?: string;
  extension?: string;
  size?: string;
  formattedSize?: string;
  type: 'video' | 'audio' | 'image';
}

export interface DownloadResult {
  status: boolean;
  title?: string;
  thumbnail?: string;
  author?: string;
  duration?: string;
  medias?: MediaItem[];
  url?: string;
  error?: string;
  stats?: {
    likes?: string | number;
    comments?: string | number;
    followers?: string | number;
    views?: string | number;
  };
}

export interface DownloadRequest {
  platform: Platform;
  link: string;
}
