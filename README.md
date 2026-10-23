# AVi Books

## Uploading images

Upload JPG, JPEG or PNG photographs, or artwork PDFs to `assets/uploads/` (subfolders are allowed), using GitHub **Add file → Upload files**. The workflow **Optimize AVi images to WebP** creates lightweight pictures under `images/optimized/` automatically after the upload is committed to `main`. Original uploads are not altered.

Example: `assets/uploads/about/portrait.jpg` -> `images/optimized/about/portrait.webp`.

**PDFs:** only the FIRST page is converted to a WebP image, for cover artwork / posters. Do NOT upload entire books, paid e-books, confidential documents, or unpublished manuscripts to this public repository.

The website must explicitly use the generated `.webp` path in HTML to display a new image; conversion does not automatically choose which gallery position it belongs in. Existing images remain until updated.

Generated images are resized to fit within 1800 × 1800 pixels, with lossy WebP quality 79 (alpha/transparency is retained where possible). Check final quality before publishing.

If the action fails with a GitHub permissions error, check repository Settings → Actions → General → Workflow permissions (read/write permissions may be required by repository policy). No tokens should be pasted into code.

Shop checkout is not active yet. Do not place paid PDFs or Stripe secrets in the repository.
