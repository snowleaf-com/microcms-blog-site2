type TagCardProps = {
  name: string;
  href: string;
};

export function TagCard({ name, href }: TagCardProps) {
  return (
    <a href={href} class="sl-chip">
      {name}
    </a>
  );
}
