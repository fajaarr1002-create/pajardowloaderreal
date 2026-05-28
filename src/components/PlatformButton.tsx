import React from 'react';
import { PlatformInfo } from '../types';

interface Props {
  platform: PlatformInfo;
  isActive: boolean;
  onClick: () => void;
}

export const PlatformButton: React.FC<Props> = ({ platform, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`platform-btn relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium tracking-wide transition-all duration-300 ${
        isActive
          ? 'platform-btn-active text-[#ece9e3]'
          : 'text-[#5a5a55] hover:text-[#9a9a93]'
      }`}
      style={isActive ? {
        background: `linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)`,
        borderColor: `${platform.accentColor}25`,
        boxShadow: `0 0 20px -8px ${platform.glow}, inset 0 1px 0 rgba(255,255,255,0.06)`,
      } : {}}
    >
      <span
        className="transition-all duration-300"
        style={isActive ? { color: platform.accentColor } : {}}
      >
        {platform.icon}
      </span>
      <span className="whitespace-nowrap">{platform.name}</span>
      {isActive && (
        <span
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-px rounded-full"
          style={{ background: `${platform.accentColor}60` }}
        />
      )}
    </button>
  );
};
