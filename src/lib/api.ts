export interface SignupPayload {
  email?: string;
  source: string;
  plan_intent: 'explorer' | 'pro' | 'institutional' | 'waitlist';
  utm?: Record<string, string>;
}

export const signup = async (payload: SignupPayload) => {
  const utm = new URLSearchParams(window.location.search);
  const utmParams: Record<string, string> = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(p => {
    const val = utm.get(p);
    if (val) utmParams[p] = val;
  });

  const response = await fetch('/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...payload,
      utm: { ...utmParams, ...payload.utm },
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
