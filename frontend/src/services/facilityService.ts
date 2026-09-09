import api from './api';
import { FacilityItem, ApiResponse } from '../types';

export const facilityService = {
  getFacilities: async (): Promise<FacilityItem[]> => {
    const res = await api.get<ApiResponse<FacilityItem[]>>('/facilities');
    return res.data.data || [];
  },

  createFacility: async (data: Partial<FacilityItem>): Promise<FacilityItem> => {
    const res = await api.post<ApiResponse<FacilityItem>>('/facilities', data);
    return res.data.data!;
  },

  updateFacility: async (id: string, data: Partial<FacilityItem>): Promise<FacilityItem> => {
    const res = await api.put<ApiResponse<FacilityItem>>(`/facilities/${id}`, data);
    return res.data.data!;
  },

  deleteFacility: async (id: string): Promise<void> => {
    await api.delete(`/facilities/${id}`);
  }
};
