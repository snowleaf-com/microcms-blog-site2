export function Header() {
  return (
    <header class="bg-[var(--color-bg)]">
      <div class="w-[min(1100px,calc(100%-32px))] mx-auto flex justify-center items-center gap-4 py-3.5">
        <a href="/" class="inline-flex items-center" aria-label="SnowLeaf Home">
          <picture>
            <source srcset="/snowleaf-logo.webp" type="image/webp" />
            <img
              src="/snowleaf-logo.png"
              alt="SnowLeaf"
              width={300}
              height={84}
              class="w-auto h-20 max-md:h-11"
              decoding="async"
            />
          </picture>
        </a>
      </div>
    </header>
  );
}
