import { TerminalTheme } from '../types/story';

export interface ThemeColors {
  name: string;
  bg: string;
  surface: string;
  border: string;
  borderGlow: string;
  text: string;
  brightText: string;
  mutedText: string;
  accent: string;
  badgeBg: string;
  choiceHover: string;
  glowClass: string;
}

export const THEME_CONFIG: Record<TerminalTheme, ThemeColors> = {
  green: {
    name: 'Phosphor Green',
    bg: 'bg-[#070d0a]',
    surface: 'bg-[#0b1510]/80',
    border: 'border-[#1b3829]',
    borderGlow: 'hover:border-[#4ade80]/60 hover:shadow-[0_0_15px_rgba(74,222,128,0.2)]',
    text: 'text-[#4ade80]',
    brightText: 'text-[#86efac]',
    mutedText: 'text-[#166534]',
    accent: 'bg-[#22c55e] text-black',
    badgeBg: 'bg-[#1b3829]/50 text-[#86efac] border border-[#22c55e]/40',
    choiceHover: 'hover:bg-[#14291f]/60 hover:border-[#4ade80]',
    glowClass: 'glow-green',
  },
  amber: {
    name: 'Amber CRT',
    bg: 'bg-[#0e0b06]',
    surface: 'bg-[#181309]/80',
    border: 'border-[#3c2912]',
    borderGlow: 'hover:border-[#fbbf24]/60 hover:shadow-[0_0_15px_rgba(251,191,36,0.2)]',
    text: 'text-[#fbbf24]',
    brightText: 'text-[#fde68a]',
    mutedText: 'text-[#92400e]',
    accent: 'bg-[#f59e0b] text-black',
    badgeBg: 'bg-[#3c2912]/50 text-[#fde68a] border border-[#f59e0b]/40',
    choiceHover: 'hover:bg-[#281d0f]/60 hover:border-[#fbbf24]',
    glowClass: 'glow-amber',
  },
  slate: {
    name: 'Cyber Slate',
    bg: 'bg-[#090d16]',
    surface: 'bg-[#0f172a]/80',
    border: 'border-[#1e293b]',
    borderGlow: 'hover:border-[#38bdf8]/60 hover:shadow-[0_0_15px_rgba(56,189,248,0.2)]',
    text: 'text-[#93c5fd]',
    brightText: 'text-[#e0f2fe]',
    mutedText: 'text-[#1e40af]',
    accent: 'bg-[#38bdf8] text-black',
    badgeBg: 'bg-[#1e293b]/50 text-[#e0f2fe] border border-[#38bdf8]/40',
    choiceHover: 'hover:bg-[#1e293b]/60 hover:border-[#38bdf8]',
    glowClass: 'glow-slate',
  },
};
