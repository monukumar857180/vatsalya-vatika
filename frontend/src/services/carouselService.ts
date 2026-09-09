import api from './api';
import { CarouselImage, ApiResponse } from '../types';

export const carouselService = {
  // Public & Admin: Get all images
  getImages: async (): Promise<CarouselImage[]> => {
    const res = await api.get<ApiResponse<CarouselImage[]>>('/carousel');
    return res.data.data || [];
  },

  // Admin: Add new image
  addImage: async (data: Partial<CarouselImage>): Promise<CarouselImage> => {
    const res = await api.post<ApiResponse<CarouselImage>>('/carousel', data);
    return res.data.data!;
  },

  // Admin: Update image
  updateImage: async (id: string, data: Partial<CarouselImage>): Promise<CarouselImage> => {
    const res = await api.put<ApiResponse<CarouselImage>>(`/carousel/${id}`, data);
    return res.data.data!;
  },

  // Admin: Delete image
  deleteImage: async (id: string): Promise<void> => {
    await api.delete(`/carousel/${id}`);
  },

  // Admin: Reorder images
  reorderImages: async (orderedIds: string[]): Promise<CarouselImage[]> => {
    const res = await api.put<ApiResponse<CarouselImage[]>>('/carousel/reorder', { orderedIds });
    return res.data.data || [];
  }
};
