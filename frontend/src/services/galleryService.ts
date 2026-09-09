import api from './api';
import { GalleryItem, ApiResponse } from '../types';
import { fallbackGallery } from './fallbackData';

export const galleryService = {
  getGallery: async (): Promise<GalleryItem[]> => {
    try {
      const res = await api.get<ApiResponse<GalleryItem[]>>('/gallery');
      const data = res.data.data;
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
      return fallbackGallery;
    } catch {
      return fallbackGallery;
    }
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
