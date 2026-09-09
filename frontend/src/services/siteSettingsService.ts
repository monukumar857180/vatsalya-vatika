import api from './api';
import { SiteSettingsData } from '../types';
import { fallbackSiteSettings } from './fallbackData';

export const siteSettingsService = {
  getSettings: async (): Promise<SiteSettingsData> => {
    try {
      const res = await api.get('/settings');
      return res.data?.data || fallbackSiteSettings;
    } catch {
      return fallbackSiteSettings;
    }
  },
  
  updateSettings: async (data: Partial<SiteSettingsData>): Promise<SiteSettingsData> => {
    const res = await api.put('/settings', data);
    return res.data.data;
  }
};

