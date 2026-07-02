export type Skin = 'bald' | 'light' | 'dark' | 'brown' | 'ears' | 'ginger';

export type Food = 'pizza' | 'burger';

export type FootballHero = 'messi' | 'ronaldo';

export type HockeyHero = 'ovechkin' | 'radulov';

export type Skill = 'stick' | 'ball' | 'chess' | 'books';

export type Team =
  | 'lada'
  | 'dynamo'
  | 'ska'
  | 'akm'
  | 'real'
  | 'spartak'
  | 'akron'
  | 'barcelona'
  | 'zenit';

export type PhotoAnswer = 'friend' | 'unknown';

export type Mood = 'fun' | 'sad' | 'poop' | 'clown';

export type JoinAnswer = 'yes' | 'skuf';

export const TOTAL_SLIDES = 14;

export type InviteState = {
  currentSlide: number;
  showLaterScreen: boolean;
  nickname: string;
  skin: Skin | null;
  food: Food | null;
  footballHero: FootballHero | null;
  hockeyHero: HockeyHero | null;
  skill: Skill | null;
  team: Team | null;
  jerseyNumber: number | null;
  photoAnswer: PhotoAnswer | null;
  mood: Mood | null;
  joinAnswer: JoinAnswer | null;
};

export type InviteAction =
  | { type: 'SET_NICKNAME'; payload: string }
  | { type: 'SET_SKIN'; payload: Skin }
  | { type: 'SET_FOOD'; payload: Food }
  | { type: 'SET_FOOTBALL_HERO'; payload: FootballHero }
  | { type: 'SET_HOCKEY_HERO'; payload: HockeyHero }
  | { type: 'SET_SKILL'; payload: Skill }
  | { type: 'SET_TEAM'; payload: Team }
  | { type: 'SET_JERSEY_NUMBER'; payload: number | null }
  | { type: 'SET_PHOTO_ANSWER'; payload: PhotoAnswer }
  | { type: 'SET_MOOD'; payload: Mood }
  | { type: 'SET_JOIN_ANSWER'; payload: JoinAnswer }
  | { type: 'NEXT_SLIDE' }
  | { type: 'SET_SHOW_LATER'; payload: boolean }
  | { type: 'RESET' };
