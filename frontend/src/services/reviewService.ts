import api from './api';
import { ReviewItem, ApiResponse } from '../types';

export const reviewService = {
  getPublicReviews: async (): Promise<ReviewItem[]> => {
    const res = await api.get<ApiResponse<ReviewItem[]>>('/reviews');
    return res.data.data || [];
  },

  getAllReviews: async (): Promise<ReviewItem[]> => {
    const res = await api.get<ApiResponse<ReviewItem[]>>('/reviews/all');
    return res.data.data || [];
  },

  submitReview: async (data: { name: string; email?: string; rating: number; comment: string }): Promise<ReviewItem> => {
    const res = await api.post<ApiResponse<ReviewItem>>('/reviews', data);
    return res.data.data!;
  },

  toggleApproval: async (id: string): Promise<ReviewItem> => {
    const res = await api.put<ApiResponse<ReviewItem>>(`/reviews/${id}/toggle`);
    return res.data.data!;
  },

  deleteReview: async (id: string): Promise<void> => {
    await api.delete(`/reviews/${id}`);
  }
};
