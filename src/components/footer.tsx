import type { Tag } from '../types';
import { TagCard } from './tag-card';

type FooterProps = {
  tags: Tag[];
};

export function Footer({ tags }: FooterProps) {
  return (
    <footer class="mt-10">
      <div class="w-[min(1100px,calc(100%-32px))] mx-auto py-4">
        <div class="grid grid-cols-1 gap-3.5">
          <section class="border border-[var(--color-line)] bg-[var(--color-paper)] p-3.5">
            <h3 class="m-0 mb-2.5 text-xs tracking-wide uppercase text-[#818181]">
              Tags
            </h3>
            <div class="flex flex-wrap gap-2">
              <TagCard name="All" href="/" />
              {tags.map((tag) => (
                <TagCard key={tag.id} name={tag.name} href={`/tag/${tag.id}`} />
              ))}
            </div>
          </section>
          <section class="border border-[var(--color-line)] bg-[var(--color-paper)] p-3.5">
            <h3 class="m-0 mb-2.5 text-xs tracking-wide uppercase text-[#818181]">
              About
            </h3>
            <p class="m-0 text-[#363636] leading-[1.8] text-sm">
              &quot;SnowLeaf&quot; は 管理人の趣味ブログです。
            </p>
          </section>
          <p class="m-0 pt-1 text-center text-[#4c4c4c] text-[13px]">
            © 2019- SnowLeaf
          </p>
        </div>
      </div>
    </footer>
  );
}
