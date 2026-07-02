import { TOTAL_SLIDES } from '../state/invite-types';

type ProgressBarProps = {
  currentSlide: number;
};

export function ProgressBar({ currentSlide }: ProgressBarProps) {
  return (
    <div className="progress-bar">
      <div className="progress-bar__label" key={currentSlide}>
        Уровень {currentSlide} из {TOTAL_SLIDES}
      </div>
      <div className="progress-bar__track">
        {Array.from({ length: TOTAL_SLIDES }, (_, index) => (
          <div
            key={index}
            className={`progress-bar__block${
              index < currentSlide ? ' progress-bar__block--filled' : ''
            }${index === currentSlide - 1 ? ' progress-bar__block--latest' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}
