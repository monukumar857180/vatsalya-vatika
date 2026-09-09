import bcrypt from 'bcryptjs';
import { connectDB, isMongoConnected } from '../config/db';
import { User } from '../models/User';
import { Event } from '../models/Event';
import { Gallery } from '../models/Gallery';
import { Facility } from '../models/Facility';
import { Review } from '../models/Review';
import { SiteSettings } from '../models/SiteSettings';
import { MemoryVault } from '../models/MemoryVault';
import StudentImage from '../models/StudentImage';
import CarouselImage from '../models/CarouselImage';
import { fallbackStore } from './fallbackStore';

let isSeeding = false;
let hasSeeded = false;

export const seedDatabase = async () => {
  if (hasSeeded || isSeeding) return;
  isSeeding = true;

  try {
    console.log('🌱 Initializing Ashram Seed Data...');
    const connected = await connectDB();

    if (connected && isMongoConnected) {
      const passwordHash = await bcrypt.hash('vatsalyavatika', 10);

      // 1. Seed Default Admin User
      const adminExists = await User.findOne({ email: 'guruji@gmail.com' });
      if (!adminExists) {
        await User.create({
          name: 'Guruji',
          email: 'guruji@gmail.com',
          password: passwordHash,
          role: 'admin'
        });
        console.log('✅ Created default admin user: guruji@gmail.com');
      }

      // 2. Seed Events
      const eventCount = await Event.countDocuments();
      if (eventCount === 0) {
        await Event.insertMany(fallbackStore.events.map(({ _id, ...rest }) => rest));
        console.log('✅ Seeded default events into MongoDB');
      }

      // 3. Seed Gallery
      const galleryCount = await Gallery.countDocuments();
      if (galleryCount === 0) {
        await Gallery.insertMany(fallbackStore.gallery.map(({ _id, ...rest }) => rest));
        console.log('✅ Seeded default gallery items into MongoDB');
      }

      // 4. Seed Facilities
      const facilityCount = await Facility.countDocuments();
      if (facilityCount === 0) {
        await Facility.insertMany(fallbackStore.facilities.map(({ _id, ...rest }) => rest));
        console.log('✅ Seeded default facilities into MongoDB');
      }

      // 5. Seed Reviews
      const reviewCount = await Review.countDocuments();
      if (reviewCount === 0) {
        await Review.insertMany(fallbackStore.reviews.map(({ _id, ...rest }) => rest));
        console.log('✅ Seeded default reviews into MongoDB');
      }

      // 6. Seed Site Settings
      const settingsCount = await SiteSettings.countDocuments();
      if (settingsCount === 0) {
        await SiteSettings.create({
          heroTitle: 'Welcome to Vatsalya Vatika',
          heroSubtitle: 'A sacred haven where 200+ students receive education, shelter, values, and love.',
          aboutText: 'Vatsalya Vatika Ashram provides free education, nutritious food, healthcare, and values to underprivileged children.',
          contactEmail: 'info@vatsalyavatika.org',
          contactPhone: '+91 98765 43210',
          contactAddress: 'Vatsalya Vatika Ashram, Sacred Valley, India',
          facebookUrl: 'https://facebook.com',
          youtubeUrl: 'https://youtube.com',
          instagramUrl: 'https://instagram.com',
          showDonors: true
        });
        console.log('✅ Seeded site settings into MongoDB');
      }

      // 7. Seed Student Images
      const studentImageCount = await StudentImage.countDocuments();
      if (studentImageCount === 0 && fallbackStore.studentImages.length > 0) {
        await StudentImage.insertMany(fallbackStore.studentImages.map(({ _id, ...rest }) => rest));
        console.log('✅ Seeded student images into MongoDB');
      }

      // 8. Seed Memory Vault
      const vaultCount = await MemoryVault.countDocuments();
      if (vaultCount === 0 && fallbackStore.memoryVaultCards.length > 0) {
        await MemoryVault.insertMany(fallbackStore.memoryVaultCards.map(({ _id, ...rest }) => rest));
        console.log('✅ Seeded memory vault cards into MongoDB');
      }

      // 9. Seed Carousel Images (from gallery if empty)
      const carouselCount = await CarouselImage.countDocuments();
      if (carouselCount === 0) {
        const defaultCarousels = fallbackStore.gallery.slice(0, 4).map((item, idx) => ({
          image: item.image,
          title: item.title,
          description: item.description,
          category: item.category,
          isActive: true,
          order: idx
        }));
        await CarouselImage.insertMany(defaultCarousels);
        console.log('✅ Seeded carousel banner images into MongoDB');
      }

      console.log('🌱 MongoDB seeding completed successfully!');
    } else {
      fallbackStore.seedDefaults();
      console.log('🌱 Fallback in-memory store initialized with seed defaults!');
    }
    hasSeeded = true;
  } catch (err: any) {
    console.error('⚠️ Seeding error:', err.message);
  } finally {
    isSeeding = false;
  }
};

if (require.main === module) {
  seedDatabase().then(() => process.exit(0));
}

