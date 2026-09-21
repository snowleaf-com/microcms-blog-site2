const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export async function verifyTurnstile(
  token: string,
  secretKey: string
): Promise<boolean> {
  if (!secretKey) {
    return false;
  }
  if (!token) {
    return false;
  }

  const res = await fetch(VERIFY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: secretKey,
      response: token
    })
  });

  const data = (await res.json()) as { success?: boolean };
  return Boolean(data.success);
}
