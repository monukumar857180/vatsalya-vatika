import { EventItem, GalleryItem, FacilityItem, StudentImage, CarouselImage, MemoryVaultCard, ReviewItem, SiteSettingsData } from '../types';

export const fallbackEvents: EventItem[] = [
  {
    _id: 'evt-1',
    title: 'Annual Value & Cultural Day',
    description: 'A vibrant celebration featuring traditional music, drama presentations, and inspirational lectures by respected scholars.',
    image: '/IMG_2026.jpeg',
    date: 'October 24, 2026',
    category: 'Cultural Programs',
    location: 'Vatsalya Vatika Central Hall',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'evt-2',
    title: 'Inter-Ashram Youth Sports Championship',
    description: 'Students participate in athletics, kabaddi, yoga showcases, and team games promoting physical fitness and brotherhood.',
    image: '/study.jpeg',
    date: 'November 12, 2026',
    category: 'Sports Activities',
    location: 'Ashram Sports Complex & Grounds',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'evt-3',
    title: 'Digital Literacy & Science Exhibition',
    description: 'Students demonstrate interactive computer projects, scientific models, and innovative solutions designed in our lab.',
    image: '/om1.png',
    date: 'December 05, 2026',
    category: 'Educational Events',
    location: 'Computer & Science Block',
    createdAt: new Date().toISOString()
  }
];

export const fallbackGallery: GalleryItem[] = [
  {
    _id: 'gal-1',
    title: 'Morning Spiritual Assembly & Values',
    image: '/om1.png',
    category: 'Activities',
    description: 'Students gather for morning prayers, meditation, and chanting.',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'gal-2',
    title: 'Ashram Students in Classroom Learning',
    image: '/IMG_2026.jpeg',
    category: 'Students',
    description: 'Dedicated educators guiding 200+ residential students in daily classes.',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'gal-3',
    title: 'Focused Study & Knowledge Sharing',
    image: '/study.jpeg',
    category: 'Ashram',
    description: 'Self-study sessions, group discussions, and conceptual learning.',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'gal-4',
    title: 'Guruji Guiding Ashram Youth',
    image: '/guruji.jpeg',
    category: 'Events',
    description: 'Spiritual discourse, life values, and mentorship for youth character.',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'gal-5',
    title: 'Vatsalya Vatika Students Unity',
    image: '/om1.png',
    category: 'Ashram',
    description: 'Lush greenery and sacred spaces fostering calm and brotherhood.',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'gal-6',
    title: 'Dedicated Group Study & Fellowship',
    image: '/study.jpeg',
    category: 'Activities',
    description: 'Students learning together with dedication and joy.',
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
    image: '/IMG_2026.jpeg',
    description: 'Formal schooling support, interactive digital science labs, language literacy, homework assistance, and conceptual clarity.',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'default-2',
    title: '⚽ Activities',
    image: '/om1.png',
    description: 'Daily outdoor sports tournaments, athletics, yoga sessions, classical music, drama, and artistic creative workshops.',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'default-3',
    title: '🌱 Personal Growth',
    image: '/study.jpeg',
    description: 'Value-based life lessons, emotional care, leadership qualities, environmental responsibility, and spiritual mindfulness.',
    createdAt: new Date().toISOString()
  }
];

export const fallbackCarouselImages: CarouselImage[] = [
  {
    _id: 'car-1',
    image: '/om1.png',
    title: 'Together in Faith and Tradition',
    description: 'Sacred ceremonies, spiritual values, and daily prayer unifying our students and community.',
    category: 'Tradition',
    isActive: true,
    order: 0,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'car-2',
    image: '/IMG_2026.jpeg',
    title: 'Guiding Light of Knowledge',
    description: 'Nurturing young minds through dedicated mentoring, holistic education, and character building.',
    category: 'Education',
    isActive: true,
    order: 1,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'car-3',
    image: '/study.jpeg',
    title: 'Youth, Athletics & Brotherhood',
    description: 'Building vitality, endurance, and teamwork on the sprawling sports fields of the Ashram.',
    category: 'Activities',
    isActive: true,
    order: 2,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'car-4',
    image: '/guruji.jpeg',
    title: 'Serene Sanctuary for Growth',
    description: "Guruji's wisdom and compassion guides every student on their path of knowledge and values.",
    category: 'Campus',
    isActive: true,
    order: 3,
    createdAt: new Date().toISOString()
  }
];

export const fallbackMemoryVaultCards: MemoryVaultCard[] = [
  {
    _id: 'mv-seed-1',
    title: 'Serene Ashram Morning',
    image: '/om1.png',
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
    image: '/IMG_2026.jpeg',
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
    title: 'Study & Growth',
    image: '/study.jpeg',
    description: 'Students learning together with dedication and joy.',
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
