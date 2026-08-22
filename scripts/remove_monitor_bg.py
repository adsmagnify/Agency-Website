"""Bake a clean cutout of video_monitor.mp4.

Removes outer white (+ AA fringe / floor contact shadows), replaces with
pure green for reliable WebGL chroma key. Subject RGB is left unchanged.
"""
from __future__ import annotations

from pathlib import Path

import cv2
import imageio.v3 as iio
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "video_monitor.mp4"
DST_MP4 = ROOT / "public" / "video_monitor_keyed.mp4"
PREVIEW = ROOT / "public" / "_keyed_preview.png"

KEY_BGR = (0, 255, 0)


def cutout_mask(bgr: np.ndarray) -> np.ndarray:
    """True where background should be removed."""
    h, w = bgr.shape[:2]
    mean = bgr.mean(axis=2)
    chroma = bgr.max(axis=2).astype(np.int16) - bgr.min(axis=2).astype(np.int16)
    ys = np.arange(h)[:, None]
    k = np.ones((3, 3), np.uint8)

    # 1) Flood-fill near-pure white from the frame border only
    near = (mean >= 249) & (chroma <= 6)
    flood = np.zeros((h, w), np.uint8)
    flood[near] = 255
    ff = np.zeros((h + 2, w + 2), np.uint8)
    img = flood.copy()
    step = 2
    for x in range(0, w, step):
        if img[0, x] == 255:
            cv2.floodFill(img, ff, (x, 0), 128)
        if img[h - 1, x] == 255:
            cv2.floodFill(img, ff, (x, h - 1), 128)
    for y in range(0, h, step):
        if img[y, 0] == 255:
            cv2.floodFill(img, ff, (0, y), 128)
        if img[y, w - 1] == 255:
            cv2.floodFill(img, ff, (w - 1, y), 128)
    bg = img == 128

    # 2) Grow into near-white (not into beige subject ~mean 210)
    soft = (mean >= 246) & (chroma <= 10)
    grow = bg.astype(np.uint8) * 255
    for _ in range(18):
        dil = cv2.dilate(grow, k, iterations=1)
        grow = np.where(soft, dil, grow)
    bg = grow > 0

    # 3) Floor contact shadows only (lower frame) — avoid eating bright beige body
    floor = ys > int(h * 0.70)
    shadow = (mean >= 190) & (mean < 246) & (chroma <= 14) & floor
    grow = bg.astype(np.uint8) * 255
    for _ in range(40):
        dil = cv2.dilate(grow, k, iterations=1)
        grow = np.where(shadow | soft, dil, grow)
    bg = grow > 0

    # 4) Chew bright AA halo on the silhouette
    subject = (~bg).astype(np.uint8)
    dist = cv2.distanceTransform(subject, cv2.DIST_L2, 5)
    fringe = (dist > 0) & (dist <= 2.8) & (mean >= 232)
    # Extra chew under pedestal / bottom rim
    bottom_fringe = (dist > 0) & (dist <= 4.0) & (mean >= 175) & (ys > int(h * 0.82))
    bg = bg | fringe | bottom_fringe

    # 5) Slight silhouette erode to kill remaining white rim (no interior soft-grow holes)
    subject = (~bg).astype(np.uint8) * 255
    subject = cv2.erode(subject, k, iterations=2)
    subject = cv2.morphologyEx(
        subject, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8), iterations=2
    )
    return subject == 0


def process_frame(bgr: np.ndarray) -> np.ndarray:
    bg = cutout_mask(bgr)
    keyed = bgr.copy()
    keyed[bg] = KEY_BGR
    return keyed


def main() -> None:
    cap = cv2.VideoCapture(str(SRC))
    if not cap.isOpened():
        raise SystemExit(f"Cannot open {SRC}")

    fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
    total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT) or 0)
    print(f"Processing {SRC.name}: {total} frames @ {fps:.2f} fps")

    frames: list[np.ndarray] = []
    idx = 0
    while True:
        ok, bgr = cap.read()
        if not ok:
            break
        keyed = process_frame(bgr)
        frames.append(cv2.cvtColor(keyed, cv2.COLOR_BGR2RGB))
        if idx == 40:
            cv2.imwrite(str(PREVIEW), keyed)
            print("wrote preview", PREVIEW)
        idx += 1
        if idx % 60 == 0:
            print(f"  {idx}/{total}")

    cap.release()
    if not frames:
        raise SystemExit("No frames")

    print(f"Encoding keyed MP4 -> {DST_MP4.name}")
    iio.imwrite(
        DST_MP4,
        frames,
        fps=fps,
        codec="libx264",
        pixelformat="yuv420p",
        output_params=["-crf", "17", "-preset", "medium"],
    )
    print("Done", DST_MP4, DST_MP4.stat().st_size)


if __name__ == "__main__":
    main()
