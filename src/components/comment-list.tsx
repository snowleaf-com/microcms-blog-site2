import type { Comment } from '../lib/comment';
import { formatDateTime } from '../lib/date';

type CommentListProps = {
  comments: Comment[];
};

export function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return null;
  }

  return (
    <section class="comment-list" aria-label="コメント一覧">
      <h2 class="comment-heading">コメント（{comments.length}）</h2>
      <ul class="comment-items">
        {comments.map((comment) => (
          <li key={comment.id} class="comment-item">
            <div class="comment-meta">
              <span class="comment-author">{comment.author}</span>
              <time class="comment-date" datetime={comment.created_at}>
                {formatDateTime(comment.created_at)}
              </time>
            </div>
            <p class="comment-body">{comment.content}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
