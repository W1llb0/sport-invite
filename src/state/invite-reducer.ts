import type { InviteAction, InviteState } from './invite-types';
import { TOTAL_SLIDES } from './invite-types';

export const initialInviteState: InviteState = {
  currentSlide: 1,
  showLaterScreen: false,
  nickname: '',
  skin: null,
  food: null,
  footballHero: null,
  hockeyHero: null,
  skill: null,
  team: null,
  jerseyNumber: null,
  photoAnswer: null,
  mood: null,
  joinAnswer: null,
};

export function inviteReducer(
  state: InviteState,
  action: InviteAction,
): InviteState {
  switch (action.type) {
    case 'SET_NICKNAME':
      return { ...state, nickname: action.payload };
    case 'SET_SKIN':
      return { ...state, skin: action.payload };
    case 'SET_FOOD':
      return { ...state, food: action.payload };
    case 'SET_FOOTBALL_HERO':
      return { ...state, footballHero: action.payload };
    case 'SET_HOCKEY_HERO':
      return { ...state, hockeyHero: action.payload };
    case 'SET_SKILL':
      return { ...state, skill: action.payload };
    case 'SET_TEAM':
      return { ...state, team: action.payload };
    case 'SET_JERSEY_NUMBER':
      return { ...state, jerseyNumber: action.payload };
    case 'SET_PHOTO_ANSWER':
      return { ...state, photoAnswer: action.payload };
    case 'SET_MOOD':
      return { ...state, mood: action.payload };
    case 'SET_JOIN_ANSWER':
      return { ...state, joinAnswer: action.payload };
    case 'NEXT_SLIDE':
      return {
        ...state,
        currentSlide: Math.min(state.currentSlide + 1, TOTAL_SLIDES),
      };
    case 'SET_SHOW_LATER':
      return { ...state, showLaterScreen: action.payload };
    case 'RESET':
      return initialInviteState;
    default:
      return state;
  }
}
