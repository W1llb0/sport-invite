#!/usr/bin/env python3
"""Slice images/all_avatars.png into public/assets/skins/*.png (RGBA, trimmed)."""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "images" / "all_avatars.png"
OUTPUT_DIR = ROOT / "public" / "assets" / "skins"
COLS = 2
ROWS = 3
PADDING_PX = 12
TOP_PADDING_PX = 4
ROW_TOP_INSET_PX: dict[int, int] = {
    0: 0,
    1: 22,
    2: 14,
}

# col, row in a 2x3 grid (left-to-right, top-to-bottom)
SKIN_LAYOUT: list[tuple[str, int, int]] = [
    ("bald", 0, 0),
    ("light", 1, 0),
    ("brown", 0, 1),
    ("dark", 1, 1),
    ("ears", 0, 2),
    ("ginger", 1, 2),
]


def trim_transparent(
    image: Image.Image,
    padding_px: int,
    top_padding_px: int,
) -> Image.Image:
    alpha = image.split()[3]
    bbox = alpha.getbbox()
    if bbox is None:
        return image
    left, top, right, bottom = bbox
    left = max(0, left - padding_px)
    top = max(0, top - top_padding_px)
    right = min(image.width, right + padding_px)
    bottom = min(image.height, bottom + padding_px)
    return image.crop((left, top, right, bottom))


def slice_skins() -> None:
    source = Image.open(SOURCE).convert("RGBA")
    width, height = source.size
    cell_width = width // COLS
    cell_height = height // ROWS
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    for name, col, row in SKIN_LAYOUT:
        left = col * cell_width
        top = row * cell_height + ROW_TOP_INSET_PX[row]
        cell = source.crop((left, top, left + cell_width, (row + 1) * cell_height))
        trimmed = trim_transparent(cell, PADDING_PX, TOP_PADDING_PX)
        output_path = OUTPUT_DIR / f"{name}.png"
        trimmed.save(output_path, "PNG")
        print(f"{output_path.relative_to(ROOT)} -> {trimmed.size[0]}x{trimmed.size[1]}")


if __name__ == "__main__":
    slice_skins()
