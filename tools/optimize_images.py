#!/usr/bin/env python3
"""
Simple image optimizer: generates resized JPEG and WebP variants for images in assets/images.
Usage:
  pip install pillow
  python3 tools/optimize_images.py

Produces files like `photo1-480.jpg`, `photo1-1024.jpg`, and `photo1-480.webp`.
Gallery photos (photo1–photo4) are cropped to 4:3 from the top so heads stay visible,
then upscaled for the gallery slots used in index.html.
"""
import re
from PIL import Image
from pathlib import Path

SRC = Path(__file__).resolve().parents[1] / 'assets' / 'images'
OUT_WIDTHS = [480, 1024, 2048]
JPEG_QUALITY = 80
WEBP_QUALITY = 80
GALLERY_PHOTOS = {'photo1', 'photo2', 'photo3', 'photo4'}
GALLERY_ASPECT = 4 / 3
GALLERY_MASTER_WIDTH = 2048
VARIANT_RE = re.compile(r'-\d+$')

if not SRC.exists():
    print("No images folder found at:", SRC)
    raise SystemExit(1)


def top_align_crop_to_aspect(im, aspect):
    width, height = im.size
    current = width / height
    if current > aspect:
        new_width = int(height * aspect)
        left = (width - new_width) // 2
        return im.crop((left, 0, left + new_width, height))
    if current < aspect:
        new_height = int(width / aspect)
        return im.crop((0, 0, width, new_height))
    return im


def normalize_gallery_photo(im):
    cropped = top_align_crop_to_aspect(im, GALLERY_ASPECT)
    target_height = int(GALLERY_MASTER_WIDTH / GALLERY_ASPECT)
    if cropped.width != GALLERY_MASTER_WIDTH or cropped.height != target_height:
        return cropped.resize((GALLERY_MASTER_WIDTH, target_height), Image.LANCZOS)
    return cropped


def save_variants(im, basename, force=False):
    for w in OUT_WIDTHS:
        if im.width <= w:
            resized = im
        else:
            ratio = w / im.width
            h = int(im.height * ratio)
            resized = im.resize((w, h), Image.LANCZOS)

        out_jpg = SRC / f"{basename}-{w}.jpg"
        out_webp = SRC / f"{basename}-{w}.webp"
        if force or not out_jpg.exists():
            resized.save(out_jpg, format='JPEG', quality=JPEG_QUALITY, optimize=True)
            print('Saved', out_jpg.name)
        if force or not out_webp.exists():
            resized.save(out_webp, format='WEBP', quality=WEBP_QUALITY, method=6)
            print('Saved', out_webp.name)


images = [
    p for p in SRC.glob('*')
    if p.suffix.lower() in ('.jpg', '.jpeg', '.png') and not VARIANT_RE.search(p.stem)
]
if not images:
    print('No JPG/PNG images found to optimize in', SRC)
    raise SystemExit(0)

seen_gallery = set()
for img_path in sorted(images):
    basename = img_path.stem
    if basename in GALLERY_PHOTOS:
        if basename in seen_gallery:
            continue
        seen_gallery.add(basename)

    try:
        with Image.open(img_path) as im:
            im = im.convert('RGB')
            is_gallery = basename in GALLERY_PHOTOS

            if is_gallery:
                im = normalize_gallery_photo(im)
                master_path = SRC / f"{basename}.jpg"
                im.save(master_path, format='JPEG', quality=JPEG_QUALITY, optimize=True)
                print('Saved', master_path.name, f'({im.width}x{im.height})')
                if img_path != master_path and img_path.exists():
                    img_path.unlink()
                    print('Removed', img_path.name)
                save_variants(im, basename, force=True)
                continue

            save_variants(im, basename, force=False)
    except Exception as e:
        print('Error processing', img_path.name, e)

print('Done')
