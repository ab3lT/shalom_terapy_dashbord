import create from 'zustand';
import jwtDecode from 'jwt-decode';

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  role: null,
  isAuthenticated: false,

  login: ({ token, authority }) => {
    let decoded;
    try {
      decoded = jwtDecode(token); // Optional, in case you want `sub`, `exp`, etc.
    } catch (e) {
      return console.error('Invalid token');
    }

    set({
      token,
      user: decoded,
      role: authority,
      isAuthenticated: true,
    });

    localStorage.setItem('authToken', token);
    localStorage.setItem('role', authority);
  },

  logout: () => {
    set({ token: null, user: null, role: null, isAuthenticated: false });
    localStorage.removeItem('authToken');
    localStorage.removeItem('authority');
  },

  loadUserFromStorage: () => {
    const token = localStorage.getItem('authToken');
    const authority = localStorage.getItem('authority');

    if (token && authority) {
      try {
        const decoded = jwtDecode(token);
        set({ token, user: decoded, authority, isAuthenticated: true });
      } catch (e) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('authority');
      }
    }
  },
}));
