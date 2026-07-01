import type { InviteState, Skill, Team } from '../state/invite-types';
import { getAssetPath } from './slides';

export type SkillAvatarStyle = {
  headImage: string;
  roleLabel: string;
  jerseyColor: string;
  teamLogo: string | null;
  jerseyNumber: string | null;
};

const teamColors: Record<Team, string> = {
  lada: '#E30613',
  dynamo: '#0033A0',
  ska: '#0039A6',
  akm: '#FFD100',
  real: '#FEBE10',
  spartak: '#E30613',
  akron: '#006633',
  barcelona: '#A50044',
  other: '#888888',
};

const roleLabels: Record<Skill, string> = {
  stick: 'Хоккеист',
  ball: 'Футболист',
  chess: 'Шахматист',
  books: 'Книголюб',
};

export function getSkillBackground(skill: Skill | null): string | null {
  if (skill === 'stick') {
    return getAssetPath('images/33.jpg');
  }
  if (skill === 'ball') {
    return getAssetPath('images/22.jpg');
  }
  if (skill === 'chess' || skill === 'books') {
    return getAssetPath('images/44.jpg');
  }
  return null;
}

export function buildSkillAvatarStyle(state: InviteState): SkillAvatarStyle {
  const skill: Skill = state.skill ?? 'ball';
  const team: Team = state.team ?? 'ska';
  return {
    headImage: getAssetPath(`assets/skins/${state.skin ?? 'light'}.svg`),
    roleLabel: roleLabels[skill],
    jerseyColor: teamColors[team],
    teamLogo: state.team ? getAssetPath(`assets/teams/${state.team}.svg`) : null,
    jerseyNumber: state.jerseyNumber !== null ? String(state.jerseyNumber) : null,
  };
}

export function getSkillClassName(skill: Skill | null): string {
  const value = skill ?? 'ball';
  return `avatar-card--${value}`;
}
