import api from './api';
import { ActivityItem, ApiResponse } from '../types';

export const activityService = {
  getActivities: async (params?: { type?: string; search?: string; unread?: boolean }): Promise<ActivityItem[]> => {
    const res = await api.get<ApiResponse<ActivityItem[]>>('/activities', { params });
    return res.data.data || [];
  },

  getUnreadCount: async (): Promise<number> => {
    try {
      const res = await api.get<ApiResponse<{ count: number }>>('/activities/unread-count');
      return res.data.data?.count || 0;
    } catch {
      return 0;
    }
  },

  markRead: async (id: string): Promise<ActivityItem> => {
    const res = await api.put<ApiResponse<ActivityItem>>(`/activities/${id}/read`);
    return res.data.data!;
  },

  markAllRead: async (): Promise<void> => {
    await api.put('/activities/mark-all-read');
  },

  deleteActivity: async (id: string): Promise<void> => {
    await api.delete(`/activities/${id}`);
  }
};
