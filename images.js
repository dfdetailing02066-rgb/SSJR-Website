/* =========================================================================
   South Shore Junk Removal - images.js
   Tiny helper (mirrors the reference site's images.js) that gracefully
   handles broken/missing images by hiding the element and its <picture>
   wrapper so layouts never show a broken-image icon.
   ========================================================================= */
function handleImgError(img) {
  try {
    var pic = img.closest ? img.closest("picture") : null;
    var target = pic || img;
    target.style.display = "none";
    var holder = target.parentElement;
    if (holder) holder.classList.add("img-failed");
  } catch (e) {
    img.style.display = "none";
  }
}
