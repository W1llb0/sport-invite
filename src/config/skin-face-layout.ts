import type { Skin } from '../state/invite-types';

export type SkinFaceLayout = {
  sourceWidth: number;
  sourceHeight: number;
  leftEye: { x: number; y: number };
  rightEye: { x: number; y: number };
  eyeRadiusPx: number;
  eyeCenterYOffset?: number;
  /** Positive values shift the rendered head left inside the head box. */
  headOffsetX?: number;
};

/** Eye anchors measured from black pixels in public/assets/skins/*.png. */
export const skinFaceLayouts: Record<Skin, SkinFaceLayout> = {
  bald: {
    sourceWidth: 512,
    sourceHeight: 512,
    leftEye: { x: 205, y: 332 },
    rightEye: { x: 292, y: 332 },
    eyeRadiusPx: 20,
    eyeCenterYOffset: 0.6,
  },
  light: {
    sourceWidth: 512,
    sourceHeight: 512,
    leftEye: { x: 210, y: 333 },
    rightEye: { x: 294, y: 333 },
    eyeRadiusPx: 20,
    eyeCenterYOffset: 0.6,
  },
  brown: {
    sourceWidth: 512,
    sourceHeight: 490,
    leftEye: { x: 212, y: 312 },
    rightEye: { x: 293, y: 312 },
    eyeRadiusPx: 20,
    eyeCenterYOffset: 0.6,
  },
  dark: {
    sourceWidth: 512,
    sourceHeight: 490,
    leftEye: { x: 200, y: 276 },
    rightEye: { x: 310, y: 276 },
    eyeRadiusPx: 20,
    eyeCenterYOffset: 1,
  },
  ears: {
    sourceWidth: 512,
    sourceHeight: 498,
    leftEye: { x: 205, y: 284 },
    rightEye: { x: 298, y: 284 },
    eyeRadiusPx: 20,
    eyeCenterYOffset: 0.8,
  },
  ginger: {
    sourceWidth: 512,
    sourceHeight: 498,
    leftEye: { x: 224, y: 285 },
    rightEye: { x: 316, y: 285 },
    eyeRadiusPx: 20,
    eyeCenterYOffset: 0.8,
    headOffsetX: 0.06,
  },
};

export function getSkinFaceLayout(skin: Skin | null): SkinFaceLayout {
  return skinFaceLayouts[skin ?? 'light'];
}

export function getSkinHeadOffsetPx(
  skin: Skin | null,
  headWidth: number,
): number {
  const layout = getSkinFaceLayout(skin);
  return (layout.headOffsetX ?? 0) * headWidth;
}

export type HeadImageTransform = {
  scale: number;
  offsetX: number;
  offsetY: number;
};

export function getHeadImageTransform(
  layout: SkinFaceLayout,
  headBox: { x: number; y: number; w: number; h: number },
): HeadImageTransform {
  const scale = Math.min(headBox.w / layout.sourceWidth, headBox.h / layout.sourceHeight);
  const renderedWidth = layout.sourceWidth * scale;
  const renderedHeight = layout.sourceHeight * scale;
  const offsetX = headBox.x + (headBox.w - renderedWidth) / 2;
  const offsetY = headBox.y + (headBox.h - renderedHeight);
  return { scale, offsetX, offsetY };
}

export function mapSkinPoint(
  layout: SkinFaceLayout,
  point: { x: number; y: number },
  headBox: { x: number; y: number; w: number; h: number },
): { x: number; y: number } {
  const transform = getHeadImageTransform(layout, headBox);
  return {
    x: transform.offsetX + point.x * transform.scale,
    y: transform.offsetY + point.y * transform.scale,
  };
}
