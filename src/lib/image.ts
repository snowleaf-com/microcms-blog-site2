type ImageOptions = {
  width?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'png' | 'jpg';
};

/**
 * microCMS 画像 URL にリサイズ・形式変換パラメータを付与する
 */
export function microCmsImageUrl(
  url: string,
  { width, quality = 75, format = 'webp' }: ImageOptions = {}
) {
  const imageUrl = new URL(url);

  if (width) {
    imageUrl.searchParams.set('w', String(width));
  }
  imageUrl.searchParams.set('fm', format);
  imageUrl.searchParams.set('q', String(quality));

  return imageUrl.toString();
}

export function microCmsSrcSet(
  url: string,
  widths: number[],
  options?: Omit<ImageOptions, 'width'>
) {
  return widths
    .map((width) => `${microCmsImageUrl(url, { ...options, width })} ${width}w`)
    .join(', ');
}
