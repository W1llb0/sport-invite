import type { ReactElement } from 'react';

export function GameBackground(): ReactElement {
  return (
    <div className="game-bg" aria-hidden="true">
      <span className="game-bg__brick game-bg__brick--1" />
      <span className="game-bg__brick game-bg__brick--2" />
      <span className="game-bg__brick game-bg__brick--3" />
      <span className="game-bg__brick game-bg__brick--4" />
      <span className="game-bg__brick game-bg__brick--5" />
      <span className="game-bg__star game-bg__star--1" />
      <span className="game-bg__star game-bg__star--2" />
      <span className="game-bg__star game-bg__star--3" />
    </div>
  );
}
