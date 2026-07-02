import type { ReactElement } from 'react';

const confettiColors = ['#ffcf00', '#e3000b', '#0055bf', '#237841', '#ff8c00'] as const;

export function FinaleConfetti(): ReactElement {
  return (
    <div className="finale-confetti" aria-hidden="true">
      {Array.from({ length: 24 }, (_, index) => (
        <span
          key={`confetti-${index}`}
          className="finale-confetti__piece"
          style={{
            left: `${(index * 17) % 100}%`,
            animationDelay: `${(index % 8) * 0.12}s`,
            backgroundColor: confettiColors[index % confettiColors.length],
          }}
        />
      ))}
    </div>
  );
}
