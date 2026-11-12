"""Rebuild mascot-body/head/hand.png from mascot-assistant.png (1024x1024 art).

Cuts follow the drawing: the head separates under the chin, the hand at the wrist.
Each moving part overlaps the body by a few pixels around its pivot so rotation
never opens a gap.
"""
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

root = Path(__file__).resolve().parents[1] / "public"
arr = np.array(Image.open(root / "mascot-assistant.png").convert("RGBA"))
h, w = arr.shape[:2]

# Background removal also cleared enclosed white details (eye whites, highlights, shirt
# buttons). Anything transparent but fully enclosed by the figure is artwork: make it opaque.
solid = arr[:, :, 3] > 128
enclosed = ndimage.binary_fill_holes(solid) & ~solid
arr[ndimage.binary_dilation(enclosed, iterations=1) & ndimage.binary_fill_holes(solid), 3] = 255
Image.fromarray(arr).save(root / "mascot-assistant.png")
ys, xs = np.mgrid[0:h, 0:w]

HEAD_CUT_Y = 652
HEAD_OVERLAP_Y = 630
HAND_MAX_X = 305
HAND_TOP_Y = 560
HAND_CUT_Y = 778
HAND_OVERLAP_Y = 752

hand = (ys >= HAND_TOP_Y) & (ys < HAND_CUT_Y) & (xs <= HAND_MAX_X)
head = (ys < HEAD_CUT_Y) & ~hand

body_drop = (head & (ys < HEAD_OVERLAP_Y)) | (hand & (ys < HAND_OVERLAP_Y))


def layer(mask: np.ndarray) -> Image.Image:
    out = np.zeros_like(arr)
    out[mask] = arr[mask]
    return Image.fromarray(out)


# Eyes: irises become their own layer (clipped to the eye openings) so they can follow the cursor.
EYE_CENTERS = {"left": (440, 440), "right": (636, 430)}
EYE_SEARCH_R = 58

rgb = arr[:, :, :3].astype(int)
lum = rgb.mean(axis=2)
spread = rgb.max(axis=2) - rgb.min(axis=2)
light = (lum > 185) & (spread < 50)
brown = (rgb[:, :, 0] > rgb[:, :, 2] + 8) & (lum < 170)

openings = np.zeros((h, w), bool)
irises = np.zeros((h, w), bool)
head_arr = np.zeros_like(arr)
head_arr[head] = arr[head]

for name, (cx, cy) in EYE_CENTERS.items():
    near = np.hypot(xs - cx, ys - cy) < EYE_SEARCH_R
    labels, _ = ndimage.label(brown & near)
    iris_blob = ndimage.binary_fill_holes(labels == labels[cy, cx])
    labels, _ = ndimage.label(ndimage.binary_fill_holes((light & near) | iris_blob))
    opening = labels == labels[cy, cx]

    labels, _ = ndimage.label(opening & ~light)
    iris = ndimage.binary_fill_holes(labels == labels[cy, cx])
    disk = ndimage.binary_dilation(iris, iterations=2) & opening

    bys, bxs = np.where(disk)
    icx, icy = bxs.mean(), bys.mean()
    radius = (bxs.max() - bxs.min()) / 2

    sclera = arr[opening & light & ~disk, :3]
    fill = np.median(sclera, axis=0).astype(np.uint8)
    head_arr[disk, :3] = fill
    head_arr[disk, 3] = 255

    openings |= opening
    irises |= disk
    print(f"{name} eye: iris center ({icx:.0f}, {icy:.0f}) r={radius:.0f}, sclera fill {fill.tolist()}")

layer(~body_drop).save(root / "mascot-body.png")
Image.fromarray(head_arr).save(root / "mascot-head.png")
layer(hand).save(root / "mascot-hand.png")
layer(irises).save(root / "mascot-irises.png")

mask = ndimage.gaussian_filter(openings.astype(float), 0.7)
mask_img = np.zeros((h, w, 4), np.uint8)
mask_img[:, :, 3] = np.clip(mask * 255, 0, 255).astype(np.uint8)
Image.fromarray(mask_img).save(root / "mascot-eye-mask.png")

print("Wrote mascot-body/head/hand/irises.png and mascot-eye-mask.png")
