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

export const seedDatabase = async (force: boolean = false) => {
  if (!force && (hasSeeded || isSeeding)) return { status: 'already_seeded' };
  isSeeding = true;

  const summary: Record<string, number | string> = {};

  try {
    console.log('🌱 Initializing Ashram Seed Data into Database...');
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
        summary['admin'] = 'guruji@gmail.com created';
      } else {
        summary['admin'] = 'exists';
      }

      // 2. Seed Events
      const eventCount = await Event.countDocuments();
      if (eventCount === 0 || force) {
        if (force && eventCount === 0) {
          await Event.insertMany(fallbackStore.events.map(({ _id, ...rest }) => rest));
        } else if (eventCount === 0) {
          await Event.insertMany(fallbackStore.events.map(({ _id, ...rest }) => rest));
        }
        summary['events'] = await Event.countDocuments();
        console.log(`✅ Seeded ${summary['events']} events into MongoDB`);
      } else {
        summary['events'] = eventCount;
      }

      // 3. Seed Gallery
      const galleryCount = await Gallery.countDocuments();
      if (galleryCount === 0) {
        await Gallery.insertMany(fallbackStore.gallery.map(({ _id, ...rest }) => rest));
        summary['gallery'] = await Gallery.countDocuments();
        console.log(`✅ Seeded ${summary['gallery']} gallery images into MongoDB`);
      } else {
        summary['gallery'] = galleryCount;
      }

      // 4. Seed Facilities
      const facilityCount = await Facility.countDocuments();
      if (facilityCount === 0) {
        await Facility.insertMany(fallbackStore.facilities.map(({ _id, ...rest }) => rest));
        summary['facilities'] = await Facility.countDocuments();
        console.log(`✅ Seeded ${summary['facilities']} facilities into MongoDB`);
      } else {
        summary['facilities'] = facilityCount;
      }

      // 5. Seed Reviews
      const reviewCount = await Review.countDocuments();
      if (reviewCount === 0) {
        await Review.insertMany(fallbackStore.reviews.map(({ _id, ...rest }) => rest));
        summary['reviews'] = await Review.countDocuments();
        console.log(`✅ Seeded ${summary['reviews']} reviews into MongoDB`);
      } else {
        summary['reviews'] = reviewCount;
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
        summary['siteSettings'] = 'created';
        console.log('✅ Seeded site settings into MongoDB');
      } else {
        summary['siteSettings'] = 'exists';
      }

      // 7. Seed Student Images
      const studentImageCount = await StudentImage.countDocuments();
      if (studentImageCount === 0 && fallbackStore.studentImages.length > 0) {
        await StudentImage.insertMany(fallbackStore.studentImages.map(({ _id, ...rest }) => rest));
        summary['studentImages'] = await StudentImage.countDocuments();
        console.log(`✅ Seeded ${summary['studentImages']} student images into MongoDB`);
      } else {
        summary['studentImages'] = studentImageCount;
      }

      // 8. Seed Memory Vault
      const vaultCount = await MemoryVault.countDocuments();
      if (vaultCount === 0 && fallbackStore.memoryVaultCards.length > 0) {
        await MemoryVault.insertMany(fallbackStore.memoryVaultCards.map(({ _id, ...rest }) => rest));
        summary['memoryVault'] = await MemoryVault.countDocuments();
        console.log(`✅ Seeded ${summary['memoryVault']} memory vault cards into MongoDB`);
      } else {
        summary['memoryVault'] = vaultCount;
      }

      // 9. Seed Carousel Banner Images
      const carouselCount = await CarouselImage.countDocuments();
      if (carouselCount === 0) {
        const defaultCarousels = [
          {
            title: 'Together in Faith and Tradition',
            description: 'Sacred ceremonies, spiritual values, and daily prayer unifying our students and community.',
            category: 'Tradition',
            image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
            isActive: true,
            order: 0
          },
          {
            title: 'Guiding Light of Knowledge',
            description: 'Nurturing young minds through dedicated mentoring, holistic education, and character building.',
            category: 'Education',
            image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
            isActive: true,
            order: 1
          },
          {
            title: 'Youth, Athletics & Brotherhood',
            description: 'Building vitality, endurance, and teamwork on the sprawling sports fields of the Ashram.',
            category: 'Activities',
            image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
            isActive: true,
            order: 2
          },
          {
            title: 'Serene Sanctuary for Growth',
            description: 'Peaceful natural ambiance fostering meditation, inner clarity, and wholesome living.',
            category: 'Campus',
            image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
            isActive: true,
            order: 3
          }
        ];
        await CarouselImage.insertMany(defaultCarousels);
        summary['carouselImages'] = await CarouselImage.countDocuments();
        console.log(`✅ Seeded ${summary['carouselImages']} carousel banner images into MongoDB`);
      } else {
        summary['carouselImages'] = carouselCount;
      }

      console.log('🌱 MongoDB seeding completed successfully!');
      summary['status'] = 'success';
      summary['database'] = 'MongoDB Atlas';
    } else {
      fallbackStore.seedDefaults();
      summary['status'] = 'fallbackStore_seeded';
      summary['database'] = 'In-Memory Fallback';
      console.log('🌱 Fallback in-memory store initialized with seed defaults!');
    }
    hasSeeded = true;
    return summary;
  } catch (err: any) {
    console.error('⚠️ Seeding error:', err.message);
    summary['error'] = err.message;
    return summary;
  } finally {
    isSeeding = false;
  }
};

if (require.main === module) {
  seedDatabase().then(() => process.exit(0));
}

