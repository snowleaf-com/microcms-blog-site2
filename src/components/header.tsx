type NavItem = {
  label: string;
  href: string;
  /** まだルート未実装のプレビュー用 */
  preview?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { label: '飯ログ', href: '/' },
  { label: '趣味ログ', href: '/hobby', preview: true },
  { label: '制作物', href: '/works', preview: true },
  { label: 'About', href: '/about', preview: true }
];

type HeaderProps = {
  pathname?: string;
};

function isActive(pathname: string, href: string) {
  if (href === '/') {
    return (
      pathname === '/' ||
      pathname.startsWith('/page-') ||
      pathname.startsWith('/blog/') ||
      pathname.startsWith('/tag/')
    );
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLinks({
  pathname,
  className
}: {
  pathname: string;
  className?: string;
}) {
  return (
    <ul class={`site-nav__list ${className ?? ''}`.trim()}>
      {NAV_ITEMS.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <li key={item.href}>
            <a
              href={item.preview ? '#nav-preview' : item.href}
              class={`site-nav__link${active ? ' is-active' : ''}${item.preview ? ' is-disabled' : ''}`}
              aria-current={active ? 'page' : undefined}
              {...(item.preview
                ? {
                    'aria-disabled': 'true',
                    tabindex: '-1',
                    title: '準備中'
                  }
                : {})}
            >
              {item.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function Header({ pathname = '/' }: HeaderProps) {
  return (
    <header class="site-header bg-(--color-bg) mb-2 max-md:mb-1">
      <div class="l-main site-header__bar">
        <a href="/" class="site-header__logo" aria-label="SnowLeaf Home">
          <picture>
            <source srcset="/snowleaf-logo.webp" type="image/webp" />
            <img
              src="/snowleaf-logo.png"
              alt="SnowLeaf"
              width={300}
              height={84}
              class="site-header__logo-img"
              decoding="async"
            />
          </picture>
        </a>

        <nav class="site-nav site-nav--desktop" aria-label="メインメニュー">
          <NavLinks pathname={pathname} />
        </nav>

        <button
          type="button"
          class="site-nav__burger"
          data-nav-toggle
          aria-expanded="false"
          aria-controls="site-nav-drawer"
          aria-label="メニューを開く"
        >
          <span class="site-nav__burger-lines" aria-hidden="true" />
        </button>
      </div>

      <div
        class="site-nav__backdrop"
        data-nav-backdrop
        aria-hidden="true"
      />
      <div
        id="site-nav-drawer"
        class="site-nav__drawer"
        data-nav-drawer
        aria-hidden="true"
      >
        <nav aria-label="メインメニュー">
          <NavLinks pathname={pathname} className="site-nav__list--drawer" />
        </nav>
      </div>
    </header>
  );
}
