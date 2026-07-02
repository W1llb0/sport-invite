import type { Dispatch, ReactElement } from 'react';
import { SlideLayout } from '../components/slide-layout';
import { ChoiceButtons } from '../components/choice-buttons';
import { EmojiPicker } from '../components/emoji-picker';
import { AvatarPreview } from '../components/avatar-preview';
import { FinaleSlide } from '../components/finale-slide';
import {
  footballHeroOptions,
  footballTeamOptions,
  foodOptions,
  hockeyHeroOptions,
  hockeyTeamOptions,
  imagePaths,
  skillOptions,
  skinOptions,
} from '../config/slides';
import type { InviteAction, InviteState } from '../state/invite-types';

type SlidesRendererProps = {
  state: InviteState;
  dispatch: Dispatch<InviteAction>;
};

type SlidePhotoProps = {
  src: string;
  alt: string;
};

function SlidePhoto({ src, alt }: SlidePhotoProps): ReactElement {
  return (
    <div className="slide-image-wrap">
      <img className="slide-image slide-image--hero" src={src} alt={alt} />
    </div>
  );
}

export function SlidesRenderer({ state, dispatch }: SlidesRendererProps) {
  const goNext = (): void => {
    dispatch({ type: 'NEXT_SLIDE' });
  };

  switch (state.currentSlide) {
    case 1:
      return (
        <SlideLayout title="Готов сыграть со мной в игру?">
          <ChoiceButtons
            options={[
              { id: 'yes', label: 'Да!' },
              { id: 'later', label: 'В другой раз' },
            ]}
            onSelect={(id) => {
              if (id === 'later') {
                dispatch({ type: 'SET_SHOW_LATER', payload: true });
                return;
              }
              goNext();
            }}
            variant="green"
          />
        </SlideLayout>
      );

    case 2:
      return (
        <SlideLayout title="Введи свой никнейм">
          <input
            className="lego-input"
            type="text"
            placeholder="Твоё имя"
            value={state.nickname}
            maxLength={20}
            onChange={(event) =>
              dispatch({ type: 'SET_NICKNAME', payload: event.target.value })
            }
          />
          <div className="actions-row">
            <button
              type="button"
              className="lego-button lego-button--green"
              disabled={state.nickname.trim().length === 0}
              onClick={goNext}
            >
              Далее
            </button>
          </div>
        </SlideLayout>
      );

    case 3:
      return (
        <SlideLayout title="Выбери себе скин">
          <div className="choice-grid choice-grid--6">
            {skinOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                className="image-choice"
                onClick={() => {
                  dispatch({ type: 'SET_SKIN', payload: option.id });
                  goNext();
                }}
              >
                <img src={option.image} alt={option.label} />
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </SlideLayout>
      );

    case 4:
      return (
        <SlideLayout title="Выбери что круче">
          <div className="choice-grid choice-grid--2">
            {foodOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                className="image-choice image-choice--large"
                onClick={() => {
                  dispatch({ type: 'SET_FOOD', payload: option.id });
                  goNext();
                }}
              >
                <img src={option.image} alt={option.label} />
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </SlideLayout>
      );

    case 5:
      return (
        <SlideLayout title="Кто круче?">
          <div className="choice-grid choice-grid--2">
            {footballHeroOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                className="image-choice image-choice--large"
                onClick={() => {
                  dispatch({ type: 'SET_FOOTBALL_HERO', payload: option.id });
                  goNext();
                }}
              >
                <img src={option.image} alt={option.label} />
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </SlideLayout>
      );

    case 6:
      return (
        <SlideLayout title="А тут кто круче?">
          <div className="choice-grid choice-grid--2">
            {hockeyHeroOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                className="image-choice image-choice--large"
                onClick={() => {
                  dispatch({ type: 'SET_HOCKEY_HERO', payload: option.id });
                  goNext();
                }}
              >
                <img src={option.image} alt={option.label} />
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </SlideLayout>
      );

    case 7:
      return (
        <SlideLayout title="Какие скилы у тебя есть?">
          <div className="choice-grid choice-grid--4">
            {skillOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                className="image-choice"
                onClick={() => {
                  dispatch({ type: 'SET_SKILL', payload: option.id });
                  goNext();
                }}
              >
                <img src={option.image} alt={option.label} />
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </SlideLayout>
      );

    case 8: {
      const skill = state.skill ?? 'ball';
      if (skill === 'stick') {
        return (
          <SlideLayout title="Выбери хоккейную команду">
            <SlidePhoto src={imagePaths.hockeyPhoto} alt="Хоккейная команда" />
            <div className="choice-grid choice-grid--4">
              {hockeyTeamOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className="image-choice image-choice--team"
                  onClick={() => {
                    dispatch({ type: 'SET_TEAM', payload: option.id });
                    goNext();
                  }}
                >
                  <img src={option.image} alt={option.label} />
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </SlideLayout>
        );
      }
      if (skill === 'ball') {
        return (
          <SlideLayout title="Выбери футбольный клуб">
            <SlidePhoto src={imagePaths.footballPhoto} alt="Футбольная команда" />
            <div className="choice-grid choice-grid--3">
              {footballTeamOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className="image-choice image-choice--team"
                  onClick={() => {
                    dispatch({ type: 'SET_TEAM', payload: option.id });
                    goNext();
                  }}
                >
                  <img src={option.image} alt={option.label} />
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </SlideLayout>
        );
      }
      return (
        <SlideLayout
          title="Ты на фото с дипломом!"
          subtitle="Круто, правда?"
        >
          <SlidePhoto src={imagePaths.diplomaPhoto} alt="Фото с дипломом" />
          <div className="actions-row">
            <button
              type="button"
              className="lego-button lego-button--green"
              onClick={goNext}
            >
              Далее
            </button>
          </div>
        </SlideLayout>
      );
    }

    case 9: {
      const jerseyError =
        state.jerseyNumber !== null &&
        (state.jerseyNumber < 1 || state.jerseyNumber > 99)
          ? 'Номер должен быть от 1 до 99'
          : null;
      const canProceed =
        state.jerseyNumber !== null &&
        state.jerseyNumber >= 1 &&
        state.jerseyNumber <= 99;
      return (
        <SlideLayout title="Выбери себе номер">
          <input
            className="lego-input"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="1–99"
            value={state.jerseyNumber ?? ''}
            onChange={(event) => {
              const raw = event.target.value.replace(/\D/g, '');
              if (raw === '') {
                dispatch({ type: 'SET_JERSEY_NUMBER', payload: null });
                return;
              }
              dispatch({
                type: 'SET_JERSEY_NUMBER',
                payload: parseInt(raw, 10),
              });
            }}
          />
          {jerseyError && (
            <p className="input-error" role="alert">
              {jerseyError}
            </p>
          )}
          <div className="actions-row">
            <button
              type="button"
              className="lego-button lego-button--green"
              disabled={!canProceed}
              onClick={goNext}
            >
              Далее
            </button>
          </div>
        </SlideLayout>
      );
    }

    case 10:
      return (
        <SlideLayout title="Ты знаешь кто на фото?">
          <SlidePhoto src={imagePaths.friendPhoto} alt="Друг на фото" />
          <ChoiceButtons
            options={[
              { id: 'friend', label: 'Мой друг' },
              { id: 'unknown', label: 'Пу-пу-пу' },
            ]}
            onSelect={(id) => {
              dispatch({
                type: 'SET_PHOTO_ANSWER',
                payload: id as 'friend' | 'unknown',
              });
              goNext();
            }}
          />
        </SlideLayout>
      );

    case 11:
      return (
        <SlideLayout title="Знаешь что он задумал?">
          <SlidePhoto src={imagePaths.party55} alt="Весёлая компания" />
          <EmojiPicker
            onSelect={(mood) => {
              dispatch({ type: 'SET_MOOD', payload: mood });
              goNext();
            }}
          />
        </SlideLayout>
      );

    case 12:
      return (
        <SlideLayout
          title="Он планирует веселиться и тусоваться"
          subtitle="Ты с нами?"
        >
          <SlidePhoto src={imagePaths.invite66} alt="Приглашение на день рождения" />
          <ChoiceButtons
            options={[
              { id: 'yes', label: 'Да' },
              { id: 'skuf', label: 'Я скуф' },
            ]}
            onSelect={(id) => {
              dispatch({
                type: 'SET_JOIN_ANSWER',
                payload: id as 'yes' | 'skuf',
              });
              goNext();
            }}
            variant="green"
          />
        </SlideLayout>
      );

    case 13:
      return (
        <SlideLayout
          title={`Ты отлично справился, ${state.nickname}!`}
          className="slide-card--celebrate"
        >
          <AvatarPreview state={state} />
          <div className="actions-row">
            <button
              type="button"
              className="lego-button lego-button--green lego-button--pulse"
              onClick={goNext}
            >
              Открыть приглашение
            </button>
          </div>
        </SlideLayout>
      );

    case 14:
      return <FinaleSlide />;

    default:
      return null;
  }
}
