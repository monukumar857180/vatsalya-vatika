import api from './api';
import { EventItem, ApiResponse } from '../types';
import { fallbackEvents } from './fallbackData';

export const eventService = {
  getEvents: async (): Promise<EventItem[]> => {
    try {
      const res = await api.get<ApiResponse<EventItem[]>>('/events');
      const data = res.data.data;
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
      return fallbackEvents;
    } catch {
      return fallbackEvents;
    }
  },


  getEventById: async (id: string): Promise<EventItem | null> => {
    const res = await api.get<ApiResponse<EventItem>>(`/events/${id}`);
    return res.data.data || null;
  },

  createEvent: async (data: Partial<EventItem>): Promise<EventItem> => {
    const res = await api.post<ApiResponse<EventItem>>('/events', data);
    return res.data.data!;
  },

  updateEvent: async (id: string, data: Partial<EventItem>): Promise<EventItem> => {
    const res = await api.put<ApiResponse<EventItem>>(`/events/${id}`, data);
    return res.data.data!;
  },

  deleteEvent: async (id: string): Promise<void> => {
    await api.delete(`/events/${id}`);
  }
};
