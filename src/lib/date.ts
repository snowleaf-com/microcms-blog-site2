export function formatDate(input?: string) {
  if (!input) {
    return '';
  }

  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(input));
}

export function formatDateTime(input?: string) {
  if (!input) {
    return '';
  }

  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(input));
}
