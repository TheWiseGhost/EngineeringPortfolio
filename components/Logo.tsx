// Minimal glasses glyph.
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 16" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <rect x="1.5" y="2" width="15" height="11" rx="4" />
      <rect x="23.5" y="2" width="15" height="11" rx="4" />
      <path d="M16.5 6.5c1.2-1.6 5.8-1.6 7 0" />
      <circle cx="20" cy="2.5" r="1.2" fill="#ff6b1a" stroke="none" />
    </svg>
  );
}
