type TagCardProps = {
  name: string;
  href: string;
};

export function TagCard({ name, href }: TagCardProps) {
  return (
    <a
      href={href}
      class="inline-flex items-center justify-center border border-[var(--color-line)] px-3.5 py-1.5 text-sm font-medium text-[var(--color-text)] bg-[var(--color-paper)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] rounded-none"
    >
      {name}
    </a>
  );
}
