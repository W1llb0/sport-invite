import type { ReactElement } from 'react';
import type { InviteState, Skill, Skin } from '../state/invite-types';
import { buildSkillAvatarStyle, getSkillClassName } from '../config/avatar-styles';
import { getSkinFaceLayout, mapSkinPoint } from '../config/skin-face-layout';

type SkillAvatarProps = {
  state: InviteState;
};

type AvatarFigureProps = {
  headImage: string;
  jerseyColor: string;
  teamLogo: string | null;
  number: string | null;
  skill: Skill;
  skin: Skin | null;
};

const stroke = '#1a1a1a';
const skinColor = '#FFCF00';
const headBox = { x: 38, y: 8, w: 84, h: 58 };
const neckTop = 62;
const neckHeight = 8;

function Glasses({ skin }: { skin: Skin | null }): ReactElement {
  const layout = getSkinFaceLayout(skin);
  const leftEye = mapSkinPoint(layout, layout.leftEye, headBox);
  const rightEye = mapSkinPoint(layout, layout.rightEye, headBox);
  const yOffset = layout.eyeCenterYOffset ?? 0;
  const leftLensY = leftEye.y + yOffset;
  const rightLensY = rightEye.y + yOffset;
  const eyeDistance = rightEye.x - leftEye.x;
  const scale = Math.min(headBox.w / layout.sourceWidth, headBox.h / layout.sourceHeight);
  const lensRadius = Math.min(layout.eyeRadiusPx * scale * 1.48 + 1.6, (eyeDistance - 1.6) / 2);
  const frameStroke = 2.1;
  const bridgeY = (leftLensY + rightLensY) / 2 - lensRadius * 0.62;
  const bridgeLeftX = leftEye.x + lensRadius * 0.52;
  const bridgeRightX = rightEye.x - lensRadius * 0.52;
  return (
    <g stroke={stroke} strokeLinecap="round" strokeLinejoin="round" fill="none">
      <line
        x1={leftEye.x - lensRadius}
        y1={leftLensY}
        x2={leftEye.x - lensRadius - 7}
        y2={leftLensY - 1}
        strokeWidth={1.8}
      />
      <line
        x1={rightEye.x + lensRadius}
        y1={rightLensY}
        x2={rightEye.x + lensRadius + 7}
        y2={rightLensY - 1}
        strokeWidth={1.8}
      />
      {bridgeRightX > bridgeLeftX && (
        <line x1={bridgeLeftX} y1={bridgeY} x2={bridgeRightX} y2={bridgeY} strokeWidth={frameStroke} />
      )}
      <circle cx={leftEye.x} cy={leftLensY} r={lensRadius} strokeWidth={frameStroke} />
      <circle cx={rightEye.x} cy={rightLensY} r={lensRadius} strokeWidth={frameStroke} />
    </g>
  );
}

function DefaultArms({ torsoTop }: { torsoTop: number }): ReactElement {
  const handY = torsoTop + 50;
  return (
    <g>
      <rect x="22" y={torsoTop} width="18" height="40" rx="3" fill={skinColor} stroke={stroke} strokeWidth="2" />
      <rect x="120" y={torsoTop} width="18" height="40" rx="3" fill={skinColor} stroke={stroke} strokeWidth="2" />
      <circle cx="31" cy={handY} r="7" fill={skinColor} stroke={stroke} strokeWidth="2" />
      <circle cx="129" cy={handY} r="7" fill={skinColor} stroke={stroke} strokeWidth="2" />
    </g>
  );
}

const hockeyStickGeometry = {
  shaftX: 131,
  shaftJoinY: 148,
  bladeLeft: 127,
  bladeRight: 154,
  bladeTop: 161,
  bladeBottom: 171,
} as const;

function HockeyStickBlade(): ReactElement {
  const { shaftX, shaftJoinY, bladeLeft, bladeRight, bladeTop, bladeBottom } = hockeyStickGeometry;
  return (
    <path
      d={`M ${shaftX - 3} ${shaftJoinY}
          L ${shaftX + 2} ${shaftJoinY}
          L ${shaftX + 2} ${bladeTop}
          L ${bladeRight} ${bladeTop}
          L ${bladeRight} ${bladeBottom}
          L ${bladeLeft} ${bladeBottom}
          L ${bladeLeft} ${bladeTop}
          L ${shaftX - 3} ${bladeTop} Z`}
      fill="#111"
      stroke={stroke}
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  );
}

function HockeyStickShaft({
  handX,
  handY,
}: {
  handX: number;
  handY: number;
}): ReactElement {
  const { shaftX, shaftJoinY } = hockeyStickGeometry;
  return (
    <g>
      <line
        x1={handX}
        y1={handY}
        x2={shaftX}
        y2={shaftJoinY - 2}
        stroke="#B8860B"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <line
        x1={handX}
        y1={handY}
        x2={shaftX}
        y2={shaftJoinY - 2}
        stroke="#F0D890"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.55"
      />
      <circle cx={handX} cy={handY} r="5.5" fill={skinColor} stroke={stroke} strokeWidth="2" />
    </g>
  );
}

function HockeyHelmet({ skin }: { skin: Skin | null }): ReactElement {
  const sideInset = skin === 'ears' ? 10 : 13;
  const left = headBox.x + sideInset;
  const right = headBox.x + headBox.w - sideInset;
  const width = right - left;
  const centerX = headBox.x + headBox.w / 2;
  const browY = headBox.y + 23;
  const cageTop = browY + 2;
  const cageBottom = headBox.y + headBox.h - 8;
  const shellColor = '#252525';
  const domeRx = width / 2 - 3;
  const domeRy = 18;
  const cageInset = 5;
  const barCount = 3;
  return (
    <g>
      <path
        d={`M ${left + 4} ${browY}
            A ${domeRx} ${domeRy} 0 0 1 ${right - 4} ${browY}
            Q ${centerX} ${browY + 5}, ${left + 4} ${browY} Z`}
        fill={shellColor}
        stroke={stroke}
        strokeWidth="2"
      />
      <rect
        x={left + cageInset}
        y={cageTop}
        width={width - cageInset * 2}
        height={cageBottom - cageTop}
        rx="5"
        fill="none"
        stroke={stroke}
        strokeWidth="2"
      />
      {Array.from({ length: barCount }, (_, index) => {
        const barX = left + cageInset + 6 + (index * (width - cageInset * 2 - 12)) / (barCount - 1);
        return (
          <line
            key={`helmet-v-${barX}`}
            x1={barX}
            y1={cageTop + 3}
            x2={barX}
            y2={cageBottom - 3}
            stroke={stroke}
            strokeWidth="1.5"
          />
        );
      })}
      {Array.from({ length: barCount }, (_, index) => {
        const barY = cageTop + 5 + (index * (cageBottom - cageTop - 10)) / (barCount - 1);
        return (
          <line
            key={`helmet-h-${barY}`}
            x1={left + cageInset + 2}
            y1={barY}
            x2={right - cageInset - 2}
            y2={barY}
            stroke={stroke}
            strokeWidth="1.4"
          />
        );
      })}
    </g>
  );
}

function HockeyArms({ torsoTop }: { torsoTop: number }): ReactElement {
  const freeHandY = torsoTop + 44;
  const stickHandY = torsoTop + 32;
  const stickHandX = 116;
  return (
    <g>
      <rect
        x="44"
        y={torsoTop + 2}
        width="12"
        height={freeHandY - torsoTop - 4}
        rx="3"
        fill={skinColor}
        stroke={stroke}
        strokeWidth="2"
      />
      <circle cx="50" cy={freeHandY} r="6" fill={skinColor} stroke={stroke} strokeWidth="2" />
      <rect
        x="104"
        y={torsoTop + 4}
        width="12"
        height={stickHandY - torsoTop}
        rx="3"
        fill={skinColor}
        stroke={stroke}
        strokeWidth="2"
      />
      <HockeyStickShaft handX={stickHandX} handY={stickHandY} />
    </g>
  );
}

function FootballBall(): ReactElement {
  return (
    <g>
      <circle cx="122" cy="186" r="9" fill="#fff" stroke={stroke} strokeWidth="2" />
      <path d="M 122 177 L 122 195 M 113 186 L 131 186" stroke={stroke} strokeWidth="1.2" />
    </g>
  );
}

function SmartTie({ color, torsoTop }: { color: string; torsoTop: number }): ReactElement {
  const knotTop = torsoTop + 10;
  const tieTop = knotTop + 10;
  const tieBottom = tieTop + 26;
  return (
    <g>
      <polygon points={`80,${knotTop} 76,${tieTop} 84,${tieTop}`} fill="#fff" stroke={stroke} strokeWidth="1.2" />
      <polygon points={`80,${tieTop} 76,${tieBottom} 84,${tieBottom}`} fill={color} stroke={stroke} strokeWidth="1.2" />
    </g>
  );
}

function BookProp(): ReactElement {
  return (
    <g>
      <rect x="62" y="112" width="36" height="26" rx="2" fill="#1565C0" stroke={stroke} strokeWidth="2" />
      <rect x="66" y="116" width="28" height="3" fill="#fff" opacity="0.75" />
      <rect x="66" y="122" width="20" height="2" fill="#fff" opacity="0.45" />
    </g>
  );
}

function ChessBoardProp(): ReactElement {
  const boardX = 62;
  const boardY = 110;
  const boardSize = 36;
  const cellSize = boardSize / 8;
  const lightSquare = '#F0D9B5';
  const darkSquare = '#B58863';
  const squares: ReactElement[] = [];
  for (let row = 0; row < 8; row += 1) {
    for (let col = 0; col < 8; col += 1) {
      const isLight = (row + col) % 2 === 0;
      squares.push(
        <rect
          key={`${row}-${col}`}
          x={boardX + col * cellSize}
          y={boardY + row * cellSize}
          width={cellSize}
          height={cellSize}
          fill={isLight ? lightSquare : darkSquare}
        />,
      );
    }
  }
  return (
    <g>
      <rect
        x={boardX - 1}
        y={boardY - 1}
        width={boardSize + 2}
        height={boardSize + 2}
        fill="#fff"
        stroke={stroke}
        strokeWidth="2"
      />
      {squares}
    </g>
  );
}

function TeamBadge({
  teamLogo,
  number,
}: {
  teamLogo: string;
  number: string | null;
}): ReactElement {
  return (
    <g>
      <circle cx="80" cy="94" r="13" fill="#fff" stroke={stroke} strokeWidth="2" />
      <image href={teamLogo} x="69" y="83" width="22" height="22" preserveAspectRatio="xMidYMid meet" />
      {number && (
        <text
          x="80"
          y="124"
          textAnchor="middle"
          fontSize="18"
          fontWeight="700"
          fill="#fff"
          stroke={stroke}
          strokeWidth="0.6"
        >
          {number}
        </text>
      )}
    </g>
  );
}

function AvatarFigure({
  headImage,
  jerseyColor,
  teamLogo,
  number,
  skill,
  skin,
}: AvatarFigureProps) {
  const isFootball = skill === 'ball';
  const isHockey = skill === 'stick';
  const isSmart = skill === 'chess' || skill === 'books';
  const hipColor = isFootball ? '#237841' : '#1a1a1a';
  const legColor = isFootball ? '#fff' : '#1a1a1a';
  const torsoTop = neckTop + neckHeight;
  const torsoPoints = isHockey
    ? `52,${torsoTop} 108,${torsoTop} 114,136 46,136`
    : `48,${torsoTop} 112,${torsoTop} 118,136 42,136`;
  return (
    <svg viewBox="0 0 160 210" className="skill-avatar__figure" aria-hidden="true">
      <g className="skill-avatar__figure-body">
      {isHockey && <HockeyStickBlade />}
      <rect x="46" y="150" width="26" height="34" rx="2" fill={legColor} stroke={stroke} strokeWidth="2" />
      <rect x="88" y="150" width="26" height="34" rx="2" fill={legColor} stroke={stroke} strokeWidth="2" />
      {isHockey && (
        <>
          <rect x="46" y="153" width="26" height="5" fill="#fff" stroke={stroke} strokeWidth="1" />
          <rect x="88" y="153" width="26" height="5" fill="#fff" stroke={stroke} strokeWidth="1" />
        </>
      )}
      <rect x="42" y="138" width="76" height="14" rx="2" fill={hipColor} stroke={stroke} strokeWidth="2" />
      {isFootball && (
        <>
          <rect x="46" y="150" width="26" height="7" fill={jerseyColor} stroke={stroke} strokeWidth="1.5" />
          <rect x="88" y="150" width="26" height="7" fill={jerseyColor} stroke={stroke} strokeWidth="1.5" />
        </>
      )}
      <polygon
        points={torsoPoints}
        fill={jerseyColor}
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {isHockey && (
        <>
          <rect x="50" y={torsoTop + 2} width="60" height="4" fill="#fff" opacity="0.35" />
          <rect x="50" y={torsoTop + 10} width="60" height="4" fill="#fff" opacity="0.35" />
        </>
      )}
      {isFootball && (
        <>
          <rect x="46" y={torsoTop + 4} width="68" height="9" fill="#fff" opacity="0.28" />
          <rect x="46" y={torsoTop + 28} width="68" height="9" fill="#fff" opacity="0.22" />
        </>
      )}
      {isSmart && (
        <>
          <rect x="52" y={torsoTop + 2} width="56" height="7" fill="#fff" stroke={stroke} strokeWidth="1" />
          <SmartTie color={skill === 'chess' ? '#E30613' : '#FF8F00'} torsoTop={torsoTop} />
        </>
      )}
      {teamLogo && !isSmart && <TeamBadge teamLogo={teamLogo} number={number} />}
      {!teamLogo && number && !isSmart && (
        <text
          x="80"
          y="112"
          textAnchor="middle"
          fontSize="20"
          fontWeight="700"
          fill="#fff"
          stroke={stroke}
          strokeWidth="0.5"
        >
          {number}
        </text>
      )}
      {isHockey ? (
        <HockeyArms torsoTop={torsoTop} />
      ) : (
        <DefaultArms torsoTop={torsoTop} />
      )}
      <rect x="72" y={neckTop - 3} width="16" height={neckHeight + 4} fill={skinColor} stroke={stroke} strokeWidth="2" />
      {!isHockey && (
        <image
          href={headImage}
          x={headBox.x}
          y={headBox.y}
          width={headBox.w}
          height={headBox.h}
          preserveAspectRatio="xMidYMax meet"
        />
      )}
      {skill === 'books' && <BookProp />}
      {skill === 'chess' && <ChessBoardProp />}
      {isFootball && <FootballBall />}
      </g>
      {isHockey && (
        <g className="skill-avatar__helmet-layer">
          <image
            href={headImage}
            x={headBox.x}
            y={headBox.y}
            width={headBox.w}
            height={headBox.h}
            preserveAspectRatio="xMidYMax meet"
          />
          <HockeyHelmet skin={skin} />
        </g>
      )}
      {isSmart && (
        <g className="skill-avatar__glasses-layer">
          <Glasses skin={skin} />
        </g>
      )}
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
          skin={state.skin}
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
