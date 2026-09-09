import { api } from './api';

export interface DonationSettings {
  _id?: string;
  bankAccountName: string;
  bankAccountNumber: string;
  ifscCode: string;
  bankName: string;
  branch: string;
  upiId: string;
  qrCodeImage: string;
}

export const donationSettingsService = {
  getSettings: async (): Promise<DonationSettings> => {
    const response = await api.get('/donation-settings');
    return response.data.data;
  },

  updateSettings: async (settings: Partial<DonationSettings>): Promise<DonationSettings> => {
    const response = await api.put('/donation-settings', settings);
    return response.data.data;
  }
};
