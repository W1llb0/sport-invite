import { useRef, useState, type ReactElement } from 'react';
import { SlideLayout } from './slide-layout';
import { SkillAvatar } from './skill-avatar';
import { InviteCalendarIcon } from './invite-calendar-icon';
import { imagePaths } from '../config/slides';
import type { InviteState } from '../state/invite-types';
import {
  downloadElementAsImage,
  revokeInviteImageBlobUrl,
} from '../utils/download-element-as-image';

type FinaleSlideProps = {
  state: InviteState;
};

const FINALE_TITLE = 'Имба! Ты заспавнил приглашение!';

export function FinaleSlide({ state }: FinaleSlideProps): ReactElement {
  const inviteRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleClosePreview = (): void => {
    if (previewUrl) {
      revokeInviteImageBlobUrl(previewUrl);
    }
    setPreviewUrl(null);
  };

  const handleDownloadInvite = async (): Promise<void> => {
    if (!inviteRef.current || isDownloading) {
      return;
    }
    setIsDownloading(true);
    setDownloadError(null);
    try {
      const result = await downloadElementAsImage({
        element: inviteRef.current,
        fileName: 'lev-birthday-invite.png',
      });
      if (result.kind === 'preview') {
        setPreviewUrl(result.blobUrl);
      }
    } catch {
      setDownloadError('Не удалось сохранить картинку. Попробуй ещё раз.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <SlideLayout title={FINALE_TITLE} showTitle={false} className="slide-card--finale">
      <div className="finale-capture" ref={inviteRef}>
        <h1 className="slide-title finale-capture__title">{FINALE_TITLE}</h1>
        <div className="finale-stack">
          <div className="invite-card invite-card--spawn">
            <div className="invite-showcase">
              <div className="invite-showcase__photo">
                <img
                  src={imagePaths.invite66}
                  alt="Праздник на день рождения"
                  crossOrigin="anonymous"
                  draggable={false}
                />
              </div>
              <aside className="invite-showcase__player" aria-label="Твой герой">
                <p className="invite-showcase__label">Твой герой</p>
                <SkillAvatar state={state} variant="invite" />
              </aside>
            </div>
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
                  <InviteCalendarIcon />
                  <span className="invite-ticket__fact-text invite-ticket__fact-text--date sticker-text sticker-text--md sticker-text--white">
                    07 июля · 17:00
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
                <p className="invite-ticket__signature-combo">
                  <span className="invite-ticket__signature-label">От кого</span>
                  <span className="invite-ticket__signature-body">
                    твой друг{' '}
                    <span className="invite-ticket__signature-highlight">Лев</span>{' '}
                    <strong className="invite-ticket__signature-number">#70</strong>
                  </span>
                </p>
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
      {previewUrl && (
        <div
          className="invite-save-preview"
          role="dialog"
          aria-modal="true"
          aria-label="Сохранение приглашения"
        >
          <button
            type="button"
            className="invite-save-preview__close"
            onClick={handleClosePreview}
            aria-label="Закрыть"
          >
            ✕
          </button>
          <p className="invite-save-preview__hint">
            Нажми и удержи картинку, затем выбери «Сохранить в Фото»
          </p>
          <img
            className="invite-save-preview__image"
            src={previewUrl}
            alt="Приглашение на день рождения Лева"
          />
        </div>
      )}
    </SlideLayout>
  );
}
