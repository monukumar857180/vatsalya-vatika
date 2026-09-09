import api from './api';
import { ContributionRecord, ApiResponse } from '../types';

export const contributionService = {
  submitContribution: async (data: {
    name: string;
    email: string;
    phone?: string;
    amount: number;
    purpose: string;
    paymentRef?: string;
  }): Promise<ApiResponse<ContributionRecord>> => {
    const res = await api.post<ApiResponse<ContributionRecord>>('/contributions', data);
    return res.data;
  },

  getContributions: async (): Promise<ContributionRecord[]> => {
    const res = await api.get<ApiResponse<ContributionRecord[]>>('/contributions');
    return res.data.data || [];
  }
};
