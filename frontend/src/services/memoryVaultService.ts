import api from './api';
import { MemoryVaultCard, ApiResponse } from '../types';

export const memoryVaultService = {
  getCards: async (): Promise<MemoryVaultCard[]> => {
    const res = await api.get<ApiResponse<MemoryVaultCard[]>>('/memory-vault');
    return res.data.data || [];
  },

  getCardById: async (id: string): Promise<MemoryVaultCard> => {
    const res = await api.get<ApiResponse<MemoryVaultCard>>(`/memory-vault/${id}`);
    return res.data.data!;
  },

  createCard: async (data: { title: string; image: string; description?: string; category: string }): Promise<MemoryVaultCard> => {
    const res = await api.post<ApiResponse<MemoryVaultCard>>('/memory-vault', data);
    return res.data.data!;
  },

  updateCard: async (id: string, data: { title?: string; image?: string; description?: string; category?: string }): Promise<MemoryVaultCard> => {
    const res = await api.put<ApiResponse<MemoryVaultCard>>(`/memory-vault/${id}`, data);
    return res.data.data!;
  },

  deleteCard: async (id: string): Promise<void> => {
    await api.delete(`/memory-vault/${id}`);
  },
};
