import { Request, Response } from 'express';
import { SiteSettings } from '../models/SiteSettings';
import { isMongoConnected } from '../config/db';
import { fallbackStore } from '../services/fallbackStore';

// Helper for fallback store
if (!fallbackStore.siteSettings) {
  fallbackStore.siteSettings = {
    heroTitle: 'Welcome to Vatsalya Vatika',
    heroSubtitle: 'A sacred haven for spiritual growth and community welfare',
    aboutText: 'Vatsalya Vatika is dedicated to nurturing...',
    contactEmail: 'info@vatsalyavatika.org',
    contactPhone: '+91 98765 43210',
    contactAddress: 'Haridwar, Uttarakhand, India',
    facebookUrl: 'https://facebook.com',
    youtubeUrl: 'https://youtube.com',
    instagramUrl: 'https://instagram.com',
    showDonors: true
  };
}

export const getSiteSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    if (isMongoConnected) {
      let settings = await SiteSettings.findOne();
      if (!settings) {
        settings = await SiteSettings.create({});
      }
      res.status(200).json({ success: true, data: settings });
    } else {
      res.status(200).json({ success: true, data: fallbackStore.siteSettings });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Failed to fetch settings' });
  }
};

export const updateSiteSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    if (isMongoConnected) {
      let settings = await SiteSettings.findOne();
      if (!settings) {
        settings = new SiteSettings(req.body);
      } else {
        Object.assign(settings, req.body);
      }
      await settings.save();
      res.status(200).json({ success: true, data: settings, message: 'Settings updated successfully' });
    } else {
      fallbackStore.siteSettings = { ...fallbackStore.siteSettings, ...req.body };
      res.status(200).json({ success: true, data: fallbackStore.siteSettings, message: 'Settings updated successfully' });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Failed to update settings' });
  }
};
