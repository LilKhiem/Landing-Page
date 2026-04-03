export interface SignupPayload {
  email?: string;
  source: string;
  plan_intent?: string;
  market?: string;
  utm?: Record<string, string>;
}

export const signup = async (payload: SignupPayload) => {
  const utm = new URLSearchParams(window.location.search);
  const utmParams: Record<string, string> = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(p => {
    const val = utm.get(p);
    if (val) utmParams[p] = val;
  });

  const messageParts = [];
  if (payload.market) messageParts.push(`Market: ${payload.market}`);
  const combinedUtm = { ...utmParams, ...payload.utm };
  if (Object.keys(combinedUtm).length > 0) messageParts.push(`UTM: ${JSON.stringify(combinedUtm)}`);

  const apiBase = (import.meta as any).env.VITE_ADMIN_URL || 'http://localhost:8000';
  
  const formNameMap: Record<string, string> = {
    'modal': 'Waitlist',
    'hero': 'Early Access',
    'footer_waitlist': 'Waitlist',
  };
  const formName = formNameMap[payload.source] || payload.source;

  const response = await fetch(`${apiBase}/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({
      email: payload.email,
      source: `NEXUS IDE ${formName}`,
      message: messageParts.length > 0 ? messageParts.join(' | ') : null,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to sign up');
  }

  return response.json();
};

export const getMe = async () => {
  const response = await fetch('/api/me');
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  return response.json();
};
