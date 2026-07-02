import type { ReactNode } from 'react';

type SlideLayoutProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  backgroundImage?: string | null;
  className?: string;
};

export function SlideLayout({
  title,
  subtitle,
  children,
  backgroundImage,
  className,
}: SlideLayoutProps) {
  const cardClassName = className ? `slide-card ${className}` : 'slide-card';
  return (
    <>
      {backgroundImage && (
        <div
          className="skill-bg"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className={cardClassName}>
        <h1 className="slide-title">{title}</h1>
        {subtitle && <p className="slide-subtitle">{subtitle}</p>}
        <div className="slide-content">{children}</div>
      </div>
    </>
  );
}
