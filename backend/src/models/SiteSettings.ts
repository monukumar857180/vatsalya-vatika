import mongoose, { Schema, Document } from 'mongoose';

export interface ISiteSettings extends Document {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  facebookUrl: string;
  youtubeUrl: string;
  instagramUrl: string;
  showDonors: boolean;
  updatedAt: Date;
}

const SiteSettingsSchema: Schema = new Schema(
  {
    heroTitle: { type: String, default: 'Welcome to Vatsalya Vatika' },
    heroSubtitle: { type: String, default: 'A sacred haven for spiritual growth and community welfare' },
    aboutText: { type: String, default: 'Vatsalya Vatika is dedicated to nurturing...' },
    contactEmail: { type: String, default: 'info@vatsalyavatika.org' },
    contactPhone: { type: String, default: '+91 98765 43210' },
    contactAddress: { type: String, default: 'Haridwar, Uttarakhand, India' },
    facebookUrl: { type: String, default: 'https://facebook.com' },
    youtubeUrl: { type: String, default: 'https://youtube.com' },
    instagramUrl: { type: String, default: 'https://instagram.com' },
    showDonors: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const SiteSettings = mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);
