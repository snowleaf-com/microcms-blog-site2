(() => {
  function markLoaded(img) {
    img.classList.add('is-loaded');
    img.closest('.media-frame')?.classList.add('is-loaded');
  }

  function bind(img) {
    if (!(img instanceof HTMLImageElement)) return;

    if (img.complete && img.naturalWidth > 0) {
      markLoaded(img);
      return;
    }

    img.addEventListener('load', () => markLoaded(img), { once: true });
    // 失敗時もスケルトンを残さない
    img.addEventListener('error', () => markLoaded(img), { once: true });
  }

  document.querySelectorAll('.media-frame img').forEach(bind);
})();
