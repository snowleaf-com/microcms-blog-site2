type ShareButtonsProps = {
  url: string;
  title: string;
};

function IconX() {
  return (
    <svg class="share__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.851L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

/** Facebook の公式に近い "f" ロゴ */
function IconFacebook() {
  return (
    <svg class="share__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.532-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.928-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div class="share">
      <p class="share__label">Share</p>
      <ul class="share__list">
        <li>
          <a
            class="share__link share__link--x"
            href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
            aria-label="Xでシェア"
          >
            <IconX />
          </a>
        </li>
        <li>
          <a
            class="share__link share__link--facebook"
            href={`https://www.facebook.com/share.php?u=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
            aria-label="Facebookでシェア"
          >
            <IconFacebook />
          </a>
        </li>
      </ul>
    </div>
  );
}
