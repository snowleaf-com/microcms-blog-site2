(() => {
  const openBtn = document.querySelector('[data-nav-open]');
  const closeBtn = document.querySelector('[data-nav-close]');
  const drawer = document.querySelector('[data-nav-drawer]');
  const backdrop = document.querySelector('[data-nav-backdrop]');

  if (!openBtn || !drawer || !backdrop) return;

  function setOpen(next) {
    const open = Boolean(next);
    drawer.hidden = !open;
    backdrop.hidden = !open;
    openBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.classList.toggle('is-nav-open', open);
  }

  openBtn.addEventListener('click', () => setOpen(true));
  closeBtn?.addEventListener('click', () => setOpen(false));
  backdrop.addEventListener('click', () => setOpen(false));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });

  document.querySelectorAll('.site-nav__link.is-preview').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
    });
  });
})();
