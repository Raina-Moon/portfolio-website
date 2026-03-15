const TOKEN_KEY = "troubleshooting-edit-token";
const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

type TroubleshootingToken = {
  exp: number;
  value: string;
};

const encodeToken = (token: TroubleshootingToken) =>
  window.btoa(JSON.stringify(token));

const decodeToken = (token: string): TroubleshootingToken | null => {
  try {
    const parsed = JSON.parse(window.atob(token)) as Partial<TroubleshootingToken>;
    if (typeof parsed.exp !== "number" || typeof parsed.value !== "string") {
      return null;
    }
    return { exp: parsed.exp, value: parsed.value };
  } catch {
    return null;
  }
};

export const issueTroubleshootingToken = (password: string) => {
  const token = encodeToken({
    value: password,
    exp: Date.now() + TOKEN_TTL_MS,
  });

  localStorage.setItem(TOKEN_KEY, token);
};

export const clearTroubleshootingToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const hasValidTroubleshootingToken = (password: string) => {
  const raw = localStorage.getItem(TOKEN_KEY);
  if (!raw) return false;

  const token = decodeToken(raw);
  if (!token) {
    clearTroubleshootingToken();
    return false;
  }

  if (token.exp <= Date.now()) {
    clearTroubleshootingToken();
    return false;
  }

  return token.value === password;
};
