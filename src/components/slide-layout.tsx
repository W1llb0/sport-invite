import type { ReactNode } from 'react';

type SlideLayoutProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  backgroundImage?: string | null;
};

export function SlideLayout({
  title,
  subtitle,
  children,
  backgroundImage,
}: SlideLayoutProps) {
  return (
    <>
      {backgroundImage && (
        <div
          className="skill-bg"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className="slide-card">
        <h1 className="slide-title">{title}</h1>
        {subtitle && <p className="slide-subtitle">{subtitle}</p>}
        {children}
      </div>
    </>
  );
}
