// ── Admin authentication helpers ─────────────────────────────
// Token is the ADMIN_PASSWORD stored in localStorage after login.

const TOKEN_KEY = "skarpa_admin_token";

export function getAdminToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

/** Wrapper around fetch that injects the Authorization header. */
export async function adminFetch(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  const token = getAdminToken();
  const headers = new Headers(options.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return fetch(url, { ...options, headers });
}
