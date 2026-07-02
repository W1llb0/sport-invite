import { useEffect, useRef, useState, type ReactElement } from 'react';
import { ChiptunePlayer } from '../lib/chiptune-player';

/**
 * Background chiptune with a LEGO-style mute toggle.
 * Audio starts after the first user interaction (browser autoplay policy).
 */
export function BackgroundMusic(): ReactElement {
  const playerRef = useRef<ChiptunePlayer | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  useEffect(() => {
    const player = new ChiptunePlayer();
    playerRef.current = player;
    const startMusic = async (): Promise<void> => {
      await player.resume();
      player.start();
      setHasStarted(true);
    };
    const handleFirstInteraction = (event: PointerEvent): void => {
      const target = event.target;
      if (target instanceof Element && target.closest('.background-music-toggle')) {
        return;
      }
      void startMusic();
      window.removeEventListener('pointerdown', handleFirstInteraction);
    };
    window.addEventListener('pointerdown', handleFirstInteraction);
    return () => {
      window.removeEventListener('pointerdown', handleFirstInteraction);
      player.stop();
      playerRef.current = null;
    };
  }, []);

  const handleToggle = async (): Promise<void> => {
    const player = playerRef.current;
    if (player === null) {
      return;
    }
    await player.resume();
    if (!hasStarted) {
      player.start();
      setHasStarted(true);
      setIsMuted(false);
      player.setMuted(false);
      return;
    }
    const nextMuted = !isMuted;
    player.setMuted(nextMuted);
    setIsMuted(nextMuted);
  };

  return (
    <button
      type="button"
      className="background-music-toggle"
      aria-label={isMuted || !hasStarted ? 'Включить музыку' : 'Выключить музыку'}
      aria-pressed={hasStarted && !isMuted}
      onClick={() => {
        void handleToggle();
      }}
    >
      {isMuted || !hasStarted ? '♪' : '♫'}
    </button>
  );
}
