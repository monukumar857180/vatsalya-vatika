import api from './api';
import { SiteSettingsData } from '../types';

export const siteSettingsService = {
  getSettings: async (): Promise<SiteSettingsData> => {
    const res = await api.get('/settings');
    return res.data.data;
  },
  
  updateSettings: async (data: Partial<SiteSettingsData>): Promise<SiteSettingsData> => {
    const res = await api.put('/settings', data);
    return res.data.data;
  }
};
