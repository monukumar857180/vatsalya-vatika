import api from './api';
import { StudentImage, ApiResponse } from '../types';
import { fallbackStudentImages } from './fallbackData';

export const studentImageService = {
  getAll: async (): Promise<StudentImage[]> => {
    try {
      const res = await api.get<ApiResponse<StudentImage[]>>('/student-images');
      const data = res.data.data;
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
      return fallbackStudentImages;
    } catch {
      return fallbackStudentImages;
    }
  },


  create: async (data: { title: string; image: string; description: string }): Promise<StudentImage> => {
    const res = await api.post<ApiResponse<StudentImage>>('/student-images', data);
    return res.data.data!;
  },

  update: async (id: string, data: { title: string; image: string; description: string }): Promise<StudentImage> => {
    const res = await api.put<ApiResponse<StudentImage>>(`/student-images/${id}`, data);
    return res.data.data!;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/student-images/${id}`);
  }
};
