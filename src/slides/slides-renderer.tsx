import type { Dispatch } from 'react';
import { SlideLayout } from '../components/slide-layout';
import { ChoiceButtons } from '../components/choice-buttons';
import { EmojiPicker } from '../components/emoji-picker';
import { AvatarPreview } from '../components/avatar-preview';
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
import { getSkillBackground } from '../config/avatar-styles';
import type { InviteAction, InviteState } from '../state/invite-types';

type SlidesRendererProps = {
  state: InviteState;
  dispatch: Dispatch<InviteAction>;
};

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
          <div className="choice-grid choice-grid--5">
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
        <SlideLayout
          title="Какие скилы у тебя есть?"
          backgroundImage={getSkillBackground(state.skill)}
        >
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

    case 8:
      return (
        <SlideLayout title="Давай выберем твою команду">
          <div className="team-section">
            <p className="team-section-title">Хоккей</p>
            <div className="choice-grid choice-grid--4">
              {hockeyTeamOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className="image-choice"
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
          </div>
          <div className="team-section">
            <p className="team-section-title">Футбол</p>
            <div className="choice-grid choice-grid--3">
              {footballTeamOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className="image-choice"
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
          </div>
        </SlideLayout>
      );

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
          <div className="slide-image-wrap">
            <img
              className="slide-image slide-image--hero"
              src={imagePaths.photo11}
              alt="Друг на фото"
            />
          </div>
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
          <div className="slide-image-wrap">
            <img
              className="slide-image"
              src={imagePaths.party55}
              alt="Весёлая компания"
            />
          </div>
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
          <div className="slide-image-wrap">
            <img
              className="slide-image"
              src={imagePaths.hockey22}
              alt="LEGO парк"
            />
          </div>
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
        <SlideLayout title={`Ты отлично справился, ${state.nickname}!`}>
          <AvatarPreview state={state} />
          <div className="actions-row">
            <button
              type="button"
              className="lego-button lego-button--green"
              onClick={goNext}
            >
              Открыть приглашение
            </button>
          </div>
        </SlideLayout>
      );

    case 14:
      return (
        <SlideLayout title="Ура! Ты приглашён!">
          <div className="invite-card">
            <img src={imagePaths.invite66} alt="Приглашение Lev birthday" />
          </div>
          <div className="invite-banner">
            <p className="invite-banner__label">Приглашение</p>
            <p className="invite-banner__title">День Рождения</p>
            <div className="invite-banner__details">
              <span className="invite-banner__date">07 июля · 15:00</span>
              <span className="invite-banner__place">Тольятти, ЛАДА-Ресорт</span>
            </div>
          </div>
        </SlideLayout>
      );

    default:
      return null;
  }
}
