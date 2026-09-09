import api from './api';
import { EventItem, ApiResponse } from '../types';

export const eventService = {
  getEvents: async (): Promise<EventItem[]> => {
    const res = await api.get<ApiResponse<EventItem[]>>('/events');
    return res.data.data || [];
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
