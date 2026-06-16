// HNOSS API Client
const API_BASE_URL = 'http://127.0.0.1:3002/api';

// Storage helpers
const storage = {
  getToken: () => localStorage.getItem('hnoSS_token'),
  setToken: (token: string) => localStorage.setItem('hnoSS_token', token),
  removeToken: () => localStorage.removeItem('hnoSS_token'),
  getUser: () => {
    const user = localStorage.getItem('hnoSS_user');
    return user ? JSON.parse(user) : null;
  },
  setUser: (user: any) => localStorage.setItem('hnoSS_user', JSON.stringify(user)),
  removeUser: () => localStorage.removeItem('hnoSS_user'),
};

// API request helper
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = storage.getToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers as Record<string, string>,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || `API error: ${response.status}`);
  }

  return data;
}

// Auth API
export const authAPI = {
  // Register new user
  register: async (data: {
    invitationCode: string;
    email: string;
    password: string;
    fullName: string;
    organization?: string;
    position?: string;
    country?: string;
    mfaEnabled?: boolean;
    passkeyEnabled?: boolean;
  }) => {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    if (response.token) {
      storage.setToken(response.token);
      storage.setUser(response.user);
    }
    
    return response;
  },

  // Login
  login: async (data: { email: string; password: string; memberId?: string }) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    if (response.requiresMFA) {
      return { requiresMFA: true, tempToken: response.tempToken };
    }
    
    if (response.token) {
      storage.setToken(response.token);
      storage.setUser(response.user);
    }
    
    return response;
  },

  // Verify MFA
  verifyMFA: async (data: { tempToken: string; code: string }) => {
    const response = await apiRequest('/auth/mfa/verify', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    if (response.token) {
      storage.setToken(response.token);
      storage.setUser(response.user);
    }
    
    return response;
  },

  // Get current user
  me: async () => {
    return apiRequest('/auth/me');
  },

  // Logout
  logout: async () => {
    try {
      await apiRequest('/auth/logout', { method: 'POST' });
    } finally {
      storage.removeToken();
      storage.removeUser();
    }
  },

  // Check if authenticated
  isAuthenticated: () => !!storage.getToken(),
  
  // Get stored user
  getUser: () => storage.getUser(),
  
  // Get token
  getToken: () => storage.getToken(),
};

// Admin API (requires high trust level)
export const adminAPI = {
  // Create invitation
  createInvitation: async (data: {
    email?: string;
    organization?: string;
    trustLevel?: number;
    maxUses?: number;
  }) => {
    return apiRequest('/admin/invitations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Get audit logs
  getAuditLogs: async () => {
    return apiRequest('/audit/logs');
  },
};

// Health check
export const healthAPI = {
  check: async () => {
    return apiRequest('/health');
  },
};

// Event emitter for auth state changes
type AuthListener = (isAuthenticated: boolean, user: any) => void;
const listeners: AuthListener[] = [];

export const authEvents = {
  subscribe: (listener: AuthListener) => {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) listeners.splice(index, 1);
    };
  },
  emit: (isAuthenticated: boolean, user: any) => {
    listeners.forEach(listener => listener(isAuthenticated, user));
  },
};

export { storage };
