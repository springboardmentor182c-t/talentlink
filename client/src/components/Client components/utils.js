// simple helpers for localStorage persistence and auth
export const STORAGE_KEYS = {
  CLIENTS: "cd_clients_v1",
  REPORTS: "cd_reports_v1",
  AUTH: "cd_auth_v1"
};

export function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

export function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function isLoggedIn() {
  return !!localStorage.getItem(STORAGE_KEYS.AUTH);
}

export function loginDemo() {
  localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify({ user: "divya" }));
}

export function logout() {
  localStorage.removeItem(STORAGE_KEYS.AUTH);
}
