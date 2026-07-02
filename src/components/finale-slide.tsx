import { useRef, useState, type ReactElement } from 'react';
import { SlideLayout } from './slide-layout';
import { imagePaths } from '../config/slides';
import { downloadElementAsImage } from '../utils/download-element-as-image';

export function FinaleSlide(): ReactElement {
  const inviteRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const handleDownloadInvite = async (): Promise<void> => {
    if (!inviteRef.current || isDownloading) {
      return;
    }
    setIsDownloading(true);
    setDownloadError(null);
    try {
      await downloadElementAsImage({
        element: inviteRef.current,
        fileName: 'lev-birthday-invite.png',
      });
    } catch {
      setDownloadError('Не удалось сохранить картинку. Попробуй ещё раз.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <SlideLayout
      title="Имба! Ты заспавнил приглашение!"
      className="slide-card--finale"
    >
      <div className="finale-stack" ref={inviteRef}>
        <div className="invite-card invite-card--spawn">
          <img src={imagePaths.invite66} alt="Приглашение Lev birthday" />
        </div>
        <div className="invite-ticket">
          <header className="invite-ticket__section invite-ticket__section--hero">
            <div className="invite-ticket__hero">
              <span className="invite-ticket__spark" aria-hidden="true">
                🎉
              </span>
              <p className="invite-ticket__eyebrow sticker-text sticker-text--sm">
                Приглашение на
              </p>
              <h2 className="invite-ticket__headline sticker-text sticker-text--lg">
                День рождения!
              </h2>
            </div>
          </header>
          <section
            className="invite-ticket__section invite-ticket__section--facts"
            aria-label="Дата и место"
          >
            <div className="invite-ticket__facts">
              <div className="invite-ticket__fact invite-ticket__fact--date">
                <span className="invite-ticket__fact-icon" aria-hidden="true">
                  📅
                </span>
                <span className="invite-ticket__fact-text sticker-text sticker-text--sm sticker-text--white">
                  07 июля · 15:00
                </span>
              </div>
              <div className="invite-ticket__fact invite-ticket__fact--place">
                <span className="invite-ticket__fact-icon" aria-hidden="true">
                  📍
                </span>
                <span className="invite-ticket__fact-text sticker-text sticker-text--sm sticker-text--white">
                  Тольятти, ЛАДА-Ресорт
                </span>
              </div>
            </div>
          </section>
          <footer className="invite-ticket__section invite-ticket__section--footer">
            <div className="invite-ticket__panel invite-ticket__signature">
              <span className="invite-ticket__label">От кого</span>
              <span className="invite-ticket__signature-name">
                твой друг{' '}
                <span className="invite-ticket__signature-highlight">Лев</span>{' '}
                <strong className="invite-ticket__signature-number">#70</strong>
              </span>
            </div>
            <div className="invite-ticket__panel invite-ticket__ps">
              <span className="invite-ticket__ps-badge sticker-text sticker-text--sm sticker-text--white">
                P.S.
              </span>
              <p className="invite-ticket__ps-text">
                С собой возьми хорошее настроение, вещи для купания, а родителей можешь
                на время оставить на баре — им и так будет прекрасно 🍻😀
              </p>
            </div>
          </footer>
        </div>
      </div>
      <div className="finale-actions">
        <button
          type="button"
          className="lego-button lego-button--green invite-download-button"
          onClick={() => {
            void handleDownloadInvite();
          }}
          disabled={isDownloading}
        >
          {isDownloading ? 'Сохраняем...' : 'Скачать приглашение 📥'}
        </button>
        {downloadError && (
          <p className="finale-actions__error" role="alert">
            {downloadError}
          </p>
        )}
      </div>
    </SlideLayout>
  );
}
