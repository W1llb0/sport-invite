#!/usr/bin/env python3
from pathlib import Path
from typing import List, Optional, Tuple

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
HEAD_BOX = {"x": 38, "y": 8, "w": 84, "h": 58}


def detect_eyes(path: Path) -> Optional[Tuple[float, float, float, float]]:
    image = Image.open(path).convert("RGBA")
    width, height = image.size
    pixels = image.load()
    candidates: List[Tuple[float, float, float]] = []
    radius = max(4, int(min(width, height) * 0.018))
    for center_y in range(int(height * 0.34), int(height * 0.50)):
        for center_x in range(int(width * 0.22), int(width * 0.78)):
            dark_count = 0
            sample_count = 0
            for y in range(center_y - radius, center_y + radius + 1):
                for x in range(center_x - radius, center_x + radius + 1):
                    if (x - center_x) ** 2 + (y - center_y) ** 2 > radius ** 2:
                        continue
                    sample_count += 1
                    red, green, blue, alpha = pixels[x, y]
                    if alpha < 60:
                        continue
                    if red + green + blue < 95:
                        dark_count += 1
            if sample_count == 0:
                continue
            score = dark_count / sample_count
            if score > 0.42:
                candidates.append((center_x, center_y, score))
    if not candidates:
        return None
    candidates.sort(key=lambda item: item[2], reverse=True)
    left_eye = None
    right_eye = None
    for candidate in candidates:
        if candidate[0] < width * 0.5:
            if left_eye is None or candidate[2] > left_eye[2]:
                left_eye = candidate
        elif right_eye is None or candidate[2] > right_eye[2]:
            right_eye = candidate
    if left_eye is None or right_eye is None:
        return None
    eye_y = (left_eye[1] + right_eye[1]) / 2
    eye_radius = radius * 1.15
    return left_eye[0], right_eye[0], eye_y, eye_radius


def main() -> None:
    for name in ["bald", "light", "brown", "dark", "ears", "ginger"]:
        path = ROOT / "public/assets/skins" / f"{name}.png"
        image = Image.open(path)
        width, height = image.size
        result = detect_eyes(path)
        if result is None:
            print(f"{name}: FAILED")
            continue
        left_x, right_x, eye_y, eye_radius = result
        scale = min(HEAD_BOX["w"] / width, HEAD_BOX["h"] / height)
        offset_x = HEAD_BOX["x"] + (HEAD_BOX["w"] - width * scale) / 2
        offset_y = HEAD_BOX["y"] + (HEAD_BOX["h"] - height * scale)
        svg_left_y = offset_y + eye_y * scale
        print(
            f"{name}: {width}x{height} "
            f"left=({left_x:.1f}, {eye_y:.1f}) right=({right_x:.1f}, {eye_y:.1f}) "
            f"radius={eye_radius:.1f} svg_y={svg_left_y:.1f}"
        )


if __name__ == "__main__":
    main()
