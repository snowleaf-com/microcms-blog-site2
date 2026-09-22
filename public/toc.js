(() => {
  const accordion = document.querySelector('[data-toc-accordion]');

  const links = Array.from(document.querySelectorAll('[data-toc-link]'));
  const ids = [
    ...new Set(
      links
        .map((link) => link.getAttribute('data-toc-link'))
        .filter((id) => Boolean(id))
    )
  ];

  function setActive(id) {
    links.forEach((link) => {
      const isActive = link.getAttribute('data-toc-link') === id;
      link.classList.toggle('is-active', isActive);
    });
  }

  // --- Accordion Open / Close ---
  if (accordion) {
    const panel = accordion.querySelector('[data-toc-panel]');
    const toggle = accordion.querySelector('[data-toc-toggle]');
    let open = false;

    function setOpen(next) {
      open = next;
      if (!panel || !toggle) return;
      if (open) {
        panel.style.height = `${panel.scrollHeight}px`;
        toggle.textContent = 'Close';
      } else {
        panel.style.height = `${panel.scrollHeight}px`;
        // force reflow then collapse
        panel.offsetHeight;
        panel.style.height = '0px';
        toggle.textContent = 'Open';
      }
    }

    toggle?.addEventListener('click', () => setOpen(!open));

    accordion.querySelectorAll('[data-toc-link]').forEach((link) => {
      link.addEventListener('click', () => {
        if (open) setOpen(false);
      });
    });

    window.addEventListener(
      'resize',
      () => {
        if (open && panel) {
          panel.style.height = `${panel.scrollHeight}px`;
        }
      },
      { passive: true }
    );
  }

  if (ids.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible[0]?.target?.id) {
        setActive(visible[0].target.id);
      }
    },
    {
      rootMargin: '-20% 0px -65% 0px',
      threshold: [0.1, 0.4, 0.8]
    }
  );

  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
})();
