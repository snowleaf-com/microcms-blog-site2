(() => {
  const tocRoot = document.getElementById('article-toc');
  if (!tocRoot) return;

  const links = Array.from(
    tocRoot.querySelectorAll('[data-toc-link]')
  );

  const ids = links
    .map((link) => link.getAttribute('data-toc-link'))
    .filter((id) => Boolean(id));

  function getArticleTop() {
    const article = document.querySelector('.article-layout .article');
    if (!article) return null;
    return article.getBoundingClientRect().top;
  }

  function updateTop() {
    const top = getArticleTop();
    if (top == null) return;
    tocRoot.style.top = `max(1.5rem, ${top}px)`;
  }

  function setActive(id) {
    links.forEach((link) => {
      const isActive = link.getAttribute('data-toc-link') === id;
      link.classList.toggle('text-[var(--color-accent)]', isActive);
      link.classList.toggle('border-[var(--color-accent)]', isActive);
      link.classList.toggle('font-semibold', isActive);
      if (!isActive) {
        link.classList.add('border-transparent');
      } else {
        link.classList.remove('border-transparent');
      }
    });
  }

  updateTop();
  requestAnimationFrame(updateTop);
  window.addEventListener('resize', updateTop, { passive: true });
  window.addEventListener('scroll', updateTop, { passive: true });

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
