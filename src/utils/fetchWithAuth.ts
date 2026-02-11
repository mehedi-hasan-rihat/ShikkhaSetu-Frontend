const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  
  // Try localStorage first
  const localToken = localStorage.getItem('auth_token');
  if (localToken) return localToken;
  
  // Fallback to cookie
  const cookies = document.cookie.split(';');
  const sessionCookie = cookies.find(c => c.trim().startsWith('better-auth.session_token='));
  return sessionCookie ? sessionCookie.split('=')[1] : null;
}

export const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();
  
  console.log('fetchWithAuth - endpoint:', endpoint, 'token:', token ? token.substring(0, 10) + '...' : 'null');
  
  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
};
