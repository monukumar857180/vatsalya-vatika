import api from './api';
import { GalleryItem, ApiResponse } from '../types';

export const galleryService = {
  getGallery: async (): Promise<GalleryItem[]> => {
    const res = await api.get<ApiResponse<GalleryItem[]>>('/gallery');
    return res.data.data || [];
  },

  createGalleryItem: async (data: Partial<GalleryItem>): Promise<GalleryItem> => {
    const res = await api.post<ApiResponse<GalleryItem>>('/gallery', data);
    return res.data.data!;
  },

  updateGalleryItem: async (id: string, data: Partial<GalleryItem>): Promise<GalleryItem> => {
    const res = await api.put<ApiResponse<GalleryItem>>(`/gallery/${id}`, data);
    return res.data.data!;
  },

  deleteGalleryItem: async (id: string): Promise<void> => {
    await api.delete(`/gallery/${id}`);
  }
};
