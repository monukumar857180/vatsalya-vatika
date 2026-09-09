import bcrypt from 'bcryptjs';
import { connectDB, isMongoConnected } from '../config/db';
import { User } from '../models/User';
import { Event } from '../models/Event';
import { Gallery } from '../models/Gallery';
import { Facility } from '../models/Facility';
import { Review } from '../models/Review';
import { fallbackStore } from './fallbackStore';

export const seedDatabase = async () => {
  console.log('🌱 Initializing Ashram Seed Data...');

  const passwordHash = await bcrypt.hash('vatsalyavatika', 10);
  const connected = await connectDB();

  if (connected && isMongoConnected) {
    try {
      // Seed User
      // Seed User
      const adminExists = await User.findOne({ email: 'guruji@gmail.com' });
      if (!adminExists) {
        await User.create({
          name: 'Guruji',
          email: 'guruji@gmail.com',
          password: passwordHash,
          role: 'admin'
        });
        console.log('✅ Created default admin user: guruji@gmail.com');
      } else if (adminExists.name !== 'Guruji') {
        adminExists.name = 'Guruji';
        await adminExists.save();
        console.log('✅ Updated admin user name to Guruji');
      }

      // Seed Events
      const eventCount = await Event.countDocuments();
      if (eventCount === 0) {
        await Event.insertMany(fallbackStore.events.map(({ _id, ...rest }) => rest));
        console.log('✅ Seeded default events into MongoDB');
      }

      // Seed Gallery
      const galleryCount = await Gallery.countDocuments();
      if (galleryCount === 0) {
        await Gallery.insertMany(fallbackStore.gallery.map(({ _id, ...rest }) => rest));
        console.log('✅ Seeded default gallery items into MongoDB');
      }

      // Seed Facilities
      const facilityCount = await Facility.countDocuments();
      if (facilityCount === 0) {
        await Facility.insertMany(fallbackStore.facilities.map(({ _id, ...rest }) => rest));
        console.log('✅ Seeded default facilities into MongoDB');
      }

      // Seed Reviews
      const reviewCount = await Review.countDocuments();
      if (reviewCount === 0) {
        await Review.insertMany(fallbackStore.reviews.map(({ _id, ...rest }) => rest));
        console.log('✅ Seeded default reviews into MongoDB');
      }

      console.log('🌱 MongoDB seeding completed successfully!');
    } catch (err: any) {
      console.error('⚠️ Seeding error:', err.message);
    }
  } else {
    fallbackStore.seedDefaults();
    console.log('🌱 Fallback in-memory store initialized with seed defaults!');
  }
};

if (require.main === module) {
  seedDatabase().then(() => process.exit(0));
}
