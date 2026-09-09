import api from './api';
import { UserAdmin, ApiResponse } from '../types';

export const authService = {
  login: async (email: string, password: string): Promise<{ token: string; user: UserAdmin }> => {
    const res = await api.post<ApiResponse<never>>('/auth/login', { email, password });
    if (res.data.success && res.data.token && res.data.user) {
      localStorage.setItem('vatsalya_admin_token', res.data.token);
      localStorage.setItem('vatsalya_admin_user', JSON.stringify(res.data.user));
      return { token: res.data.token, user: res.data.user };
    }
    throw new Error(res.data.message || 'Authentication failed');
  },

  logout: () => {
    localStorage.removeItem('vatsalya_admin_token');
    localStorage.removeItem('vatsalya_admin_user');
  },

  getCurrentUser: (): UserAdmin | null => {
    const userStr = localStorage.getItem('vatsalya_admin_user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('vatsalya_admin_token');
  },

  register: async (name: string, email: string, password: string, phone?: string): Promise<{ success: boolean; message: string }> => {
    const res = await api.post<ApiResponse<never>>('/auth/register', { name, email, password, phone });
    if (res.data.success) {
      return { success: true, message: res.data.message || 'Registration successful.' };
    }
    throw new Error(res.data.message || 'Registration failed');
  },

  getRegisteredUsers: async (): Promise<UserAdmin[]> => {
    const res = await api.get<ApiResponse<UserAdmin[]>>('/auth/users');
    if (res.data.success && res.data.data) {
      return res.data.data;
    }
    throw new Error(res.data.message || 'Failed to retrieve users');
  }
};
