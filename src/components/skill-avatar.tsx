import type { InviteState, Skill } from '../state/invite-types';
import { buildSkillAvatarStyle, getSkillClassName } from '../config/avatar-styles';

type SkillAvatarProps = {
  state: InviteState;
};

type AvatarFigureProps = {
  headImage: string;
  jerseyColor: string;
  teamLogo: string | null;
  number: string | null;
  skill: Skill;
};

const stroke = '#1a1a1a';
const skin = '#FFCF00';

function AvatarFigure({
  headImage,
  jerseyColor,
  teamLogo,
  number,
  skill,
}: AvatarFigureProps) {
  const isFootball = skill === 'ball';
  const hipColor = isFootball ? '#237841' : jerseyColor;
  const legColor = isFootball ? '#fff' : '#1a1a1a';
  return (
    <svg viewBox="0 0 160 210" className="skill-avatar__figure" aria-hidden="true">
      <image href={headImage} x="46" y="0" width="68" height="78" preserveAspectRatio="xMidYMax meet" />
      <rect x="68" y="74" width="24" height="12" fill={skin} stroke={stroke} strokeWidth="2" />
      <polygon
        points="48,84 112,84 118,142 42,142"
        fill={jerseyColor}
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <rect x="22" y="84" width="18" height="44" rx="3" fill={skin} stroke={stroke} strokeWidth="2" />
      <rect x="120" y="84" width="18" height="44" rx="3" fill={skin} stroke={stroke} strokeWidth="2" />
      <circle cx="31" cy="130" r="8" fill={skin} stroke={stroke} strokeWidth="2" />
      <circle cx="129" cy="130" r="8" fill={skin} stroke={stroke} strokeWidth="2" />
      {skill === 'chess' && (
        <polygon points="76,88 84,88 84,96 76,96" fill="#fff" stroke={stroke} strokeWidth="1" />
      )}
      {skill === 'books' && (
        <rect x="50" y="88" width="60" height="8" fill="#fff" stroke={stroke} strokeWidth="1" />
      )}
      {skill === 'stick' && (
        <>
          <rect x="46" y="86" width="68" height="4" fill="#fff" opacity="0.35" />
          <rect x="46" y="94" width="68" height="4" fill="#fff" opacity="0.35" />
        </>
      )}
      {teamLogo && (
        <>
          <circle cx="80" cy="104" r="16" fill="#fff" stroke={stroke} strokeWidth="2" />
          <image href={teamLogo} x="66" y="90" width="28" height="28" preserveAspectRatio="xMidYMid meet" />
        </>
      )}
      {number && (
        <text
          x="80"
          y={teamLogo ? '132' : '120'}
          textAnchor="middle"
          fontSize="22"
          fontWeight="700"
          fill="#fff"
          stroke={stroke}
          strokeWidth="0.5"
        >
          {number}
        </text>
      )}
      <rect x="42" y="142" width="76" height="14" rx="2" fill={hipColor} stroke={stroke} strokeWidth="2" />
      <rect x="46" y="154" width="26" height="32" rx="2" fill={legColor} stroke={stroke} strokeWidth="2" />
      <rect x="88" y="154" width="26" height="32" rx="2" fill={legColor} stroke={stroke} strokeWidth="2" />
    </svg>
  );
}

export function SkillAvatar({ state }: SkillAvatarProps) {
  const skill: Skill = state.skill ?? 'ball';
  const style = buildSkillAvatarStyle(state);
  return (
    <div className={`avatar-card ${getSkillClassName(skill)}`}>
      <div className="avatar-card__figure">
        <AvatarFigure
          skill={skill}
          headImage={style.headImage}
          jerseyColor={style.jerseyColor}
          teamLogo={style.teamLogo}
          number={style.jerseyNumber}
        />
      </div>
      <p className="avatar-card__role">{style.roleLabel}</p>
    </div>
  );
}
