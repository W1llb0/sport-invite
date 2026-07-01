import { useReducer } from 'react';
import { ProgressBar } from '../components/progress-bar';
import { SlidesRenderer } from '../slides/slides-renderer';
import { initialInviteState, inviteReducer } from '../state/invite-reducer';
import '../styles/globals.css';

export function App() {
  const [state, dispatch] = useReducer(inviteReducer, initialInviteState);

  if (state.showLaterScreen) {
    return (
      <div className="app-shell">
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
    );
  }

  return (
    <div className="app-shell">
      <ProgressBar currentSlide={state.currentSlide} />
      <SlidesRenderer state={state} dispatch={dispatch} />
    </div>
  );
}
