export function getAssetPath(relativePath: string): string {
  const base = import.meta.env.BASE_URL;
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const normalizedPath = relativePath.startsWith('/')
    ? relativePath.slice(1)
    : relativePath;
  return `${normalizedBase}${normalizedPath}`;
}

export const imagePaths = {
  footballPhoto: getAssetPath('images/11.jpg'),
  friendPhoto: getAssetPath('images/22.jpg'),
  hockeyPhoto: getAssetPath('images/33.jpg'),
  diplomaPhoto: getAssetPath('images/44.jpg'),
  party55: getAssetPath('images/55.jpg'),
  invite66: getAssetPath('images/66.jpg'),
} as const;

export const skillPhotoPaths = {
  stick: imagePaths.hockeyPhoto,
  ball: imagePaths.footballPhoto,
  chess: imagePaths.diplomaPhoto,
  books: imagePaths.diplomaPhoto,
} as const;

export const skinOptions = [
  { id: 'bald' as const, label: 'Лысый', image: getAssetPath('assets/skins/bald.png') },
  { id: 'light' as const, label: 'Светлый', image: getAssetPath('assets/skins/light.png') },
  { id: 'dark' as const, label: 'Тёмный', image: getAssetPath('assets/skins/dark.png') },
  { id: 'brown' as const, label: 'Каштанчик', image: getAssetPath('assets/skins/brown.png') },
  { id: 'ears' as const, label: 'С ушами', image: getAssetPath('assets/skins/ears.png') },
  { id: 'ginger' as const, label: 'Рыжий', image: getAssetPath('assets/skins/ginger.png') },
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

export const teamImages = {
  lada: getAssetPath('assets/teams/lada.png'),
  dynamo: getAssetPath('assets/teams/dynamo.svg'),
  ska: getAssetPath('assets/teams/ska.svg'),
  akm: getAssetPath('assets/teams/akm.png'),
  real: getAssetPath('assets/teams/real.svg'),
  spartak: getAssetPath('assets/teams/spartak.png'),
  akron: getAssetPath('assets/teams/akron.svg'),
  barcelona: getAssetPath('assets/teams/barcelona.svg'),
  zenit: getAssetPath('assets/teams/zenit.svg'),
} as const;

export function getTeamImage(team: keyof typeof teamImages): string {
  return teamImages[team];
}

export const hockeyTeamOptions = [
  { id: 'lada' as const, label: 'Лада', image: teamImages.lada },
  { id: 'dynamo' as const, label: 'Динамо', image: teamImages.dynamo },
  { id: 'ska' as const, label: 'СКА', image: teamImages.ska },
  { id: 'akm' as const, label: 'АКМ', image: teamImages.akm },
];

export const footballTeamOptions = [
  { id: 'real' as const, label: 'Реал', image: teamImages.real },
  { id: 'spartak' as const, label: 'Спартак', image: teamImages.spartak },
  { id: 'akron' as const, label: 'Акрон', image: teamImages.akron },
  { id: 'barcelona' as const, label: 'Барселона', image: teamImages.barcelona },
  { id: 'zenit' as const, label: 'Зенит', image: teamImages.zenit },
];

export const moodOptions = [
  { id: 'fun' as const, label: 'Веселье', emoji: '🎉' },
  { id: 'sad' as const, label: 'Грустный', emoji: '😢' },
  { id: 'poop' as const, label: 'Какашка', emoji: '💩' },
  { id: 'clown' as const, label: 'Клоун', emoji: '🤡' },
];

export const inviteText =
  'Приглашение на День Рождение, которое состоится 07 июля в 17-00, по адресу: Тольятти, ЛАДА-Ресорт';
