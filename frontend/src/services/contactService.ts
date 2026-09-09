import api from './api';
import { ContactMessage, ApiResponse } from '../types';

export const contactService = {
  submitContact: async (data: { name: string; email: string; phone?: string; message: string }): Promise<ApiResponse<ContactMessage>> => {
    const res = await api.post<ApiResponse<ContactMessage>>('/contact', data);
    return res.data;
  },

  getContacts: async (): Promise<ContactMessage[]> => {
    const res = await api.get<ApiResponse<ContactMessage[]>>('/contact');
    return res.data.data || [];
  },

  updateStatus: async (id: string, status: 'new' | 'read' | 'replied'): Promise<ContactMessage> => {
    const res = await api.put<ApiResponse<ContactMessage>>(`/contact/${id}`, { status });
    return res.data.data!;
  },

  deleteContact: async (id: string): Promise<void> => {
    await api.delete(`/contact/${id}`);
  }
};
