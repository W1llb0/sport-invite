import { useReducer } from 'react';
import { BackgroundMusic } from '../components/background-music';
import { FinaleConfetti } from '../components/finale-confetti';
import { GameBackground } from '../components/game-background';
import { ProgressBar } from '../components/progress-bar';
import { SlidesRenderer } from '../slides/slides-renderer';
import { initialInviteState, inviteReducer } from '../state/invite-reducer';
import { TOTAL_SLIDES } from '../state/invite-types';
import '../styles/globals.css';

export function App() {
  const [state, dispatch] = useReducer(inviteReducer, initialInviteState);
  const isFinale = state.currentSlide === TOTAL_SLIDES;

  if (state.showLaterScreen) {
    return (
      <div className="app-shell app-shell--game">
        <GameBackground />
        <BackgroundMusic />
        <div className="slide-stage">
          <div className="slide-card later-screen">
            <h1 className="slide-title">Приходи позже!</h1>
            <p className="slide-subtitle">
              Мы будем ждать тебя на дне рождения 🎂
            </p>
            <div className="actions-row">
              <button
                type="button"
                className="lego-button lego-button--green"
                onClick={() =>
                  dispatch({ type: 'SET_SHOW_LATER', payload: false })
                }
              >
                Всё-таки поиграть!
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`app-shell app-shell--game${isFinale ? ' app-shell--finale' : ''}`}>
      <GameBackground />
      {isFinale && <FinaleConfetti />}
      <BackgroundMusic />
      <ProgressBar currentSlide={state.currentSlide} />
      <div key={state.currentSlide} className="slide-stage">
        <SlidesRenderer state={state} dispatch={dispatch} />
      </div>
    </div>
  );
}
