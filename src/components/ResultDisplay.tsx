import React from 'react';
import { DownloadResult, PlatformInfo, MediaItem } from '../types';

interface Props {
  result: DownloadResult;
  platform: PlatformInfo;
}

const AudioIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);

const VideoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const HeartIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const CommentIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
  </svg>
);

const PlayIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

export const ResultDisplay: React.FC<Props> = ({ result, platform }) => {
  const title = result.title || 'Konten Berhasil Diekstrak';
  const thumbnail = result.thumbnail || `https://placehold.co/600x400/141414/888888?text=${platform.name}`;
  const medias = result.medias || [];

  const formatStat = (val: string | number | undefined) => {
    if (!val) return '0';
    const n = typeof val === 'string' ? parseInt(val.replace(/[^0-9]/g, ''), 10) : val;
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return n.toString();
  };

  return (
    <div className="result-card rounded-[2rem] overflow-hidden reveal-up">
      <div className="flex flex-col lg:flex-row">
        {/* Thumbnail Side */}
        <div className="w-full lg:w-[38%] relative bg-[#0d0d0d] overflow-hidden" style={{ minHeight: '260px' }}>
          {thumbnail && (
            <>
              <img
                src={thumbnail}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#141414] hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent lg:hidden" />
            </>
          )}

          <div className="absolute top-5 left-5">
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-semibold tracking-widest uppercase"
              style={{
                background: `${platform.accentColor}18`,
                border: `1px solid ${platform.accentColor}28`,
                color: platform.accentColor,
              }}
            >
              {platform.icon}
              {platform.name}
            </span>
          </div>

          {result.duration && (
            <div className="absolute bottom-5 left-5 font-mono text-xs px-3 py-1.5 rounded-lg text-[#9a9a93]" style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}>
              {result.duration}
            </div>
          )}

          {result.stats && (
            <div className="absolute bottom-5 right-5 flex flex-col gap-1.5">
              {result.stats.likes !== undefined && Number(result.stats.likes) > 0 && (
                <div className="stat-badge">
                  <HeartIcon /> {formatStat(result.stats.likes)}
                </div>
              )}
              {result.stats.comments !== undefined && Number(result.stats.comments) > 0 && (
                <div className="stat-badge">
                  <CommentIcon /> {formatStat(result.stats.comments)}
                </div>
              )}
              {result.stats.views !== undefined && Number(result.stats.views) > 0 && (
                <div className="stat-badge">
                  <PlayIcon /> {formatStat(result.stats.views)}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Content Side */}
        <div className="w-full lg:w-[62%] p-7 md:p-10 flex flex-col justify-center">
          <div className="mb-8">
            {result.author && (
              <p className="text-xs font-medium tracking-widest uppercase text-[#5a5a55] mb-3">
                by <span style={{ color: platform.accentColor }}>@{result.author}</span>
              </p>
            )}
            <h3 className="text-xl md:text-2xl font-semibold text-[#ece9e3] line-clamp-3 leading-snug">
              {title}
            </h3>
          </div>

          <div className="space-y-3">
            <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[#3a3a38] mb-5">
              Siap untuk diunduh
            </p>

            {medias.length > 0 ? (
              medias.map((media, idx) => (
                <a
                  key={idx}
                  href={media.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="download-btn group/dl flex items-center justify-between w-full p-4 md:p-5 rounded-2xl transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="p-3 rounded-xl transition-all duration-300"
                      style={{
                        background: media.type === 'audio'
                          ? 'rgba(52,211,153,0.08)'
                          : 'rgba(255,255,255,0.05)',
                        color: media.type === 'audio' ? '#34d399' : '#c8c3b4',
                      }}
                    >
                      {media.type === 'audio' ? <AudioIcon /> : <VideoIcon />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#ece9e3] group-hover/dl:text-white transition-colors">
                        {media.type === 'audio' ? 'Download MP3' : 'Download MP4'}
                      </p>
                      <p className="text-xs text-[#4a4a47] mt-0.5 font-medium">
                        {media.quality} · {media.extension?.toUpperCase()}
                      </p>
                    </div>
                  </div>

                  <div
                    className="p-3 rounded-xl transition-all duration-300 group-hover/dl:scale-105"
                    style={{
                      background: media.type === 'audio'
                        ? 'rgba(52,211,153,0.12)'
                        : 'rgba(255,255,255,0.07)',
                      color: media.type === 'audio' ? '#34d399' : '#c8c3b4',
                    }}
                  >
                    <DownloadIcon />
                  </div>
                </a>
              ))
            ) : (
              <div className="py-10 text-center rounded-2xl" style={{ border: '1px dashed rgba(255,255,255,0.06)' }}>
                <div className="skeleton-pulse inline-block px-6 py-2 rounded-lg">
                  <p className="text-xs text-[#3a3a38] font-medium tracking-widest uppercase">
                    Menyiapkan tautan...
                  </p>
                </div>
              </div>
            )}
          </div>

          <p className="mt-8 text-[10px] text-[#2e2e2c] font-medium tracking-wider text-center">
            Gunakan hanya untuk keperluan pribadi. Hormati hak cipta.
          </p>
        </div>
      </div>
    </div>
  );
};
