type CommentFormProps = {
  blogId: string;
  author?: string;
  siteKey?: string;
  error?: string;
};

export function CommentForm({
  blogId,
  author = '',
  siteKey = '',
  error
}: CommentFormProps) {
  return (
    <section class="comment-form" aria-label="コメント投稿">
      <h2 class="comment-heading">コメントを投稿</h2>
      {error ? <p class="comment-error">{error}</p> : null}
      <form method="post" action={`/blog/${blogId}`} class="comment-form__fields">
        <input type="hidden" name="blogId" value={blogId} />
        <div class="comment-field">
          <label for="comment-author">名前</label>
          <input
            id="comment-author"
            type="text"
            name="author"
            value={author}
            maxlength={50}
            required
            autocomplete="nickname"
          />
        </div>
        <div class="comment-field">
          <label for="comment-content">コメント</label>
          <textarea
            id="comment-content"
            name="content"
            rows={4}
            maxlength={1000}
            required
          />
        </div>
        {siteKey ? (
          <div
            class="cf-turnstile"
            data-sitekey={siteKey}
            data-theme="light"
          />
        ) : null}
        <button type="submit" class="comment-submit">
          投稿する
        </button>
      </form>
    </section>
  );
}
