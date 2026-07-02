import type { ReactElement } from 'react';

export function InviteCalendarIcon(): ReactElement {
  return (
    <svg
      className="invite-calendar-icon"
      viewBox="0 0 48 48"
      aria-hidden="true"
      role="img"
    >
      <rect x="4" y="8" width="40" height="36" rx="6" fill="#ffffff" stroke="#1a1a1a" strokeWidth="3" />
      <rect x="4" y="8" width="40" height="12" rx="6" fill="#e3000b" stroke="#1a1a1a" strokeWidth="3" />
      <line x1="16" y1="4" x2="16" y2="12" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
      <line x1="32" y1="4" x2="32" y2="12" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
      <text
        x="24"
        y="36"
        textAnchor="middle"
        fontFamily="'Titan One', 'Fredoka', sans-serif"
        fontSize="18"
        fontWeight="700"
        fill="#1a1a1a"
      >
        7
      </text>
    </svg>
  );
}
