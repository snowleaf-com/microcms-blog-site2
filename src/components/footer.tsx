import type { Tag } from '../types';
import { TagCard } from './tag-card';

type FooterProps = {
  tags: Tag[];
};

export function Footer({ tags }: FooterProps) {
  return (
    <footer class="site-footer mt-10 border-t border-(--color-line) bg-(--color-bg)">
      <div class="l-main py-10 md:py-12 grid gap-10 md:gap-12">
        <section>
          <h3 class="footer-section-title">タグ</h3>
          <div class="flex flex-wrap justify-center gap-2">
            <TagCard name="すべて" href="/" />
            {tags.map((tag) => (
              <TagCard key={tag.id} name={tag.name} href={`/tag/${tag.id}`} />
            ))}
          </div>
        </section>

        <section class="text-center">
          <h3 class="footer-section-title">このサイトについて</h3>
          <p class="m-0 text-(--color-muted) leading-[1.9] text-sm text-pretty">
            SnowLeafは、趣味ブログとして始まりましたが、今はご飯ブログとなっています。今後は他の趣味についても書くスペースを作る予定です。
          </p>
        </section>
      </div>

      <p class="m-0 py-4 text-center text-(--color-muted) text-[13px] border-t border-(--color-line)">
        © 2019– SnowLeaf
      </p>
    </footer>
  );
}
