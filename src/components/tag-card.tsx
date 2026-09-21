type TagCardProps = {
  name: string;
  href: string;
};

export function TagCard({ name, href }: TagCardProps) {
  return (
    <a
      href={href}
      class="inline-flex items-center justify-center px-3.5 py-2.5 text-sm tracking-wide leading-none transition-colors rounded-none border border-[#e9e9e9] text-(--color-text) bg-(--color-paper) hover:border-(--color-accent) hover:text-(--color-accent)"
    >
      {name}
    </a>
  );
}
