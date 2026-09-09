import { EventItem, GalleryItem, FacilityItem, StudentImage, CarouselImage, MemoryVaultCard, ReviewItem, SiteSettingsData } from '../types';

export const fallbackEvents: EventItem[] = [
  {
    _id: 'evt-1',
    title: 'Annual Value & Cultural Day',
    description: 'A vibrant celebration featuring traditional music, drama presentations, and inspirational lectures by respected scholars.',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    date: 'October 24, 2026',
    category: 'Cultural Programs',
    location: 'Vatsalya Vatika Central Hall',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'evt-2',
    title: 'Inter-Ashram Youth Sports Championship',
    description: 'Students participate in athletics, kabaddi, yoga showcases, and team games promoting physical fitness and brotherhood.',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
    date: 'November 12, 2026',
    category: 'Sports Activities',
    location: 'Ashram Sports Complex & Grounds',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'evt-3',
    title: 'Digital Literacy & Science Exhibition',
    description: 'Students demonstrate interactive computer projects, scientific models, and innovative solutions designed in our lab.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    date: 'December 05, 2026',
    category: 'Educational Events',
    location: 'Computer & Science Block',
    createdAt: new Date().toISOString()
  }
];

export const fallbackGallery: GalleryItem[] = [
  {
    _id: 'gal-1',
    title: 'Morning Yoga and Meditation',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    category: 'Activities',
    description: 'Students begin their day with serene yoga and mindfulness exercises.',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'gal-2',
    title: 'Interactive Classroom Learning',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    category: 'Students',
    description: 'Dedicated educators guiding 200+ students in foundational subjects.',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'gal-3',
    title: 'Computer Science & Technology Lab',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    category: 'Ashram',
    description: 'Modern computer facilities empowering students with modern skills.',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'gal-4',
    title: 'Annual Cultural Festival',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80',
    category: 'Events',
    description: 'Students celebrating cultural heritage with musical performances.',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'gal-5',
    title: 'Peaceful Ashram Campus Environment',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80',
    category: 'Ashram',
    description: 'Lush greenery and sacred spaces fostering calm and reflection.',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'gal-6',
    title: 'Nutritious Meal Fellowship',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80',
    category: 'Activities',
    description: 'Wholesome sattvic meals served fresh daily to all residential students.',
    createdAt: new Date().toISOString()
  }
];

export const fallbackFacilities: FacilityItem[] = [
  {
    _id: 'fac-1',
    title: 'Education',
    description: 'Comprehensive academic learning covering sciences, humanities, languages, and moral ethics.',
    icon: 'BookOpen',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'fac-2',
    title: 'Accommodation',
    description: 'Safe, hygienic, and comfortable residential dormitories with study tables and personal storage.',
    icon: 'Home',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'fac-3',
    title: 'Nutritious Food',
    description: 'Freshly prepared vegetarian meals daily ensuring complete health and physical vitality.',
    icon: 'Utensils',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'fac-4',
    title: 'Healthcare',
    description: '24/7 medical check-ups, emergency care, first-aid, and visiting medical specialist doctors.',
    icon: 'HeartPulse',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'fac-5',
    title: 'Computer Education',
    description: 'Well-equipped computer lab with high-speed internet and digital skill training programs.',
    icon: 'Laptop',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'fac-6',
    title: 'Sports & Athletics',
    description: 'Expansive sports arena for cricket, football, volleyball, athletics, and traditional games.',
    icon: 'Trophy',
    createdAt: new Date().toISOString()
  }
];

export const fallbackStudentImages: StudentImage[] = [
  {
    _id: 'default-1',
    title: '📚 Education',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    description: 'Formal schooling support, interactive digital science labs, language literacy, homework assistance, and conceptual clarity.',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'default-2',
    title: '⚽ Activities',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    description: 'Daily outdoor sports tournaments, athletics, yoga sessions, classical music, drama, and artistic creative workshops.',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'default-3',
    title: '🌱 Personal Growth',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    description: 'Value-based life lessons, emotional care, leadership qualities, environmental responsibility, and spiritual mindfulness.',
    createdAt: new Date().toISOString()
  }
];

export const fallbackCarouselImages: CarouselImage[] = fallbackGallery.slice(0, 4).map((item, idx) => ({
  _id: `car-${idx + 1}`,
  image: item.image,
  title: item.title,
  description: item.description,
  category: item.category,
  isActive: true,
  order: idx,
  createdAt: new Date().toISOString()
}));

export const fallbackMemoryVaultCards: MemoryVaultCard[] = [
  {
    _id: 'mv-seed-1',
    title: 'Serene Courtyard',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    description: 'A peaceful view of the ashram campus at sunrise.',
    category: 'Campus',
    cardNumber: 1,
    rotation: -3,
    offsetX: 10,
    offsetY: -5,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'mv-seed-2',
    title: 'Future Scholars',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    description: 'Bright smiles of students ready for morning classes.',
    category: 'Students',
    cardNumber: 2,
    rotation: 4,
    offsetX: -15,
    offsetY: 8,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'mv-seed-3',
    title: 'Sports Fellowship',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    description: 'Students enjoying team sports on the ashram ground.',
    category: 'Activities',
    cardNumber: 3,
    rotation: -2,
    offsetX: 5,
    offsetY: 12,
    createdAt: new Date().toISOString()
  }
];

export const fallbackReviews: ReviewItem[] = [
  {
    _id: 'rev-1',
    name: 'Aarav Patel',
    email: 'aarav.patel@example.com',
    rating: 5,
    comment: 'Vatsalya Vatika is doing incredible work! The facilities and care provided to the children are truly inspiring.',
    approved: true,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'rev-2',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    rating: 5,
    comment: 'Visited the ashram last week. The environment is very peaceful and the students are so well-mannered. Keep up the good work.',
    approved: true,
    createdAt: new Date().toISOString()
  }
];

export const fallbackSiteSettings: SiteSettingsData = {
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
};
