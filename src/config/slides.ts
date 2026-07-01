export function getAssetPath(relativePath: string): string {
  const base = import.meta.env.BASE_URL;
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const normalizedPath = relativePath.startsWith('/')
    ? relativePath.slice(1)
    : relativePath;
  return `${normalizedBase}${normalizedPath}`;
}

export const imagePaths = {
  photo11: getAssetPath('images/11.jpg'),
  hockey22: getAssetPath('images/22.jpg'),
  hockey33: getAssetPath('images/33.jpg'),
  books44: getAssetPath('images/44.jpg'),
  party55: getAssetPath('images/55.jpg'),
  invite66: getAssetPath('images/66.jpg'),
} as const;

export const skinOptions = [
  { id: 'bald' as const, label: 'Лысый', image: getAssetPath('assets/skins/bald.svg') },
  { id: 'light' as const, label: 'Светлый', image: getAssetPath('assets/skins/light.svg') },
  { id: 'dark' as const, label: 'Тёмный', image: getAssetPath('assets/skins/dark.svg') },
  { id: 'brown' as const, label: 'Каштанчик', image: getAssetPath('assets/skins/brown.svg') },
  { id: 'ears' as const, label: 'С ушами', image: getAssetPath('assets/skins/ears.svg') },
];

export const foodOptions = [
  { id: 'pizza' as const, label: 'Пицца', image: getAssetPath('assets/food/pizza.svg') },
  { id: 'burger' as const, label: 'Бургер', image: getAssetPath('assets/food/burger.svg') },
];

export const footballHeroOptions = [
  { id: 'messi' as const, label: 'Месси', image: getAssetPath('assets/heroes/messi.svg') },
  { id: 'ronaldo' as const, label: 'Роналду', image: getAssetPath('assets/heroes/ronaldo.svg') },
];

export const hockeyHeroOptions = [
  { id: 'ovechkin' as const, label: 'Овечкин', image: getAssetPath('assets/heroes/ovechkin.svg') },
  { id: 'radulov' as const, label: 'Радулов', image: getAssetPath('assets/heroes/radulov.svg') },
];

export const skillOptions = [
  { id: 'stick' as const, label: 'Клюшка', image: getAssetPath('assets/skills/stick.svg') },
  { id: 'ball' as const, label: 'Мяч', image: getAssetPath('assets/skills/ball.svg') },
  { id: 'chess' as const, label: 'Шахматы', image: getAssetPath('assets/skills/chess.svg') },
  { id: 'books' as const, label: 'Книжки', image: getAssetPath('assets/skills/books.svg') },
];

export const hockeyTeamOptions = [
  { id: 'lada' as const, label: 'Лада', image: getAssetPath('assets/teams/lada.svg') },
  { id: 'dynamo' as const, label: 'Динамо', image: getAssetPath('assets/teams/dynamo.svg') },
  { id: 'ska' as const, label: 'СКА', image: getAssetPath('assets/teams/ska.svg') },
  { id: 'akm' as const, label: 'АКМ', image: getAssetPath('assets/teams/akm.svg') },
];

export const footballTeamOptions = [
  { id: 'real' as const, label: 'Реал', image: getAssetPath('assets/teams/real.svg') },
  { id: 'spartak' as const, label: 'Спартак', image: getAssetPath('assets/teams/spartak.svg') },
  { id: 'akron' as const, label: 'Акрон', image: getAssetPath('assets/teams/akron.svg') },
  { id: 'barcelona' as const, label: 'Барселона', image: getAssetPath('assets/teams/barcelona.svg') },
  { id: 'other' as const, label: 'Другое', image: getAssetPath('assets/teams/other.svg') },
];

export const moodOptions = [
  { id: 'fun' as const, label: 'Веселье', emoji: '🎉' },
  { id: 'sad' as const, label: 'Грустный', emoji: '😢' },
  { id: 'poop' as const, label: 'Какашка', emoji: '💩' },
  { id: 'clown' as const, label: 'Клоун', emoji: '🤡' },
];

export const inviteText =
  'Приглашение на День Рождение, которое состоится 07 июля в 15-00, по адресу: Тольятти, ЛАДА-Ресорт';
