#!/usr/bin/env python3
"""Convert publicly uploadable artwork to small WebP images.

Input:  assets/uploads/**/*.{jpg,jpeg,png,pdf}
Output: images/optimized/**/*.webp
PDF:   first page only, intended for artwork/cover previews, NOT ebooks.
"""
from pathlib import Path
from PIL import Image, ImageOps
import fitz
import io

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets" / "uploads"
DEST = ROOT / "images" / "optimized"
FORMATS = {".jpg", ".jpeg", ".png", ".pdf"}
MAX_SIZE = 1800
QUALITY = 79

def convert(path: Path) -> None:
    relative = path.relative_to(SOURCE).with_suffix(".webp")
    output = DEST / relative
    output.parent.mkdir(parents=True, exist_ok=True)
    if path.suffix.lower() == ".pdf":
        with fitz.open(path) as doc:
            if not doc.page_count:
                return
            page = doc.load_page(0)
            matrix = fitz.Matrix(2, 2)
            pix = page.get_pixmap(matrix=matrix, alpha=False)
            image = Image.open(io.BytesIO(pix.tobytes("png")))
    else:
        image = Image.open(path)
    with image:
        image = ImageOps.exif_transpose(image)
        image.thumbnail((MAX_SIZE, MAX_SIZE), Image.Resampling.LANCZOS)
        if image.mode not in ("RGB", "RGBA"):
            image = image.convert("RGBA" if "A" in image.getbands() else "RGB")
        image.save(output, "WEBP", quality=QUALITY, method=6)
    print(f"{path.relative_to(ROOT)} -> {output.relative_to(ROOT)} ({output.stat().st_size} bytes)")

def main() -> None:
    if not SOURCE.exists():
        print("No uploads folder yet.")
        return
    for path in sorted(SOURCE.rglob("*")):
        if path.is_file() and path.suffix.lower() in FORMATS:
            convert(path)

if __name__ == "__main__":
    main()
