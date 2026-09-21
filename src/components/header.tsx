export function Header() {
  return (
    <header class="bg-(--color-bg) mb-2 max-md:mb-1">
      <div class="l-main flex justify-center items-center gap-4 pt-3.5 pb-1">
        <a href="/" class="inline-flex items-center" aria-label="SnowLeaf Home">
          <picture>
            <source srcset="/snowleaf-logo.webp" type="image/webp" />
            <img
              src="/snowleaf-logo.png"
              alt="SnowLeaf"
              width={300}
              height={84}
              class="w-auto h-20 max-md:h-16"
              decoding="async"
            />
          </picture>
        </a>
      </div>
    </header>
  );
}
