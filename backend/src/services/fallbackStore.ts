export interface StoreEvent {
  _id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
  location: string;
  focalPoint?: { x: number; y: number };
  createdAt: string;
}

export interface StoreGallery {
  _id: string;
  title: string;
  image: string;
  category: 'Students' | 'Events' | 'Ashram' | 'Activities';
  description?: string;
  focalPoint?: { x: number; y: number };
  createdAt: string;
}

export interface StoreFacility {
  _id: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
  createdAt: string;
}

export interface StoreContact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
}

export interface StoreContribution {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  amount: number;
  purpose: string;
  paymentStatus: 'completed' | 'pending' | 'failed';
  paymentRef?: string;
  createdAt: string;
}

export interface StoreUser {
  _id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'user';
  phone?: string;
  createdAt: string;
}

export interface StoreReview {
  _id: string;
  name: string;
  email?: string;
  rating: number;
  comment: string;
  approved: boolean;
  createdAt: string;
}

export interface StoreActivity {
  _id: string;
  type: string;
  title: string;
  description: string;
  metadata?: Record<string, any>;
  isRead: boolean;
  createdAt: string;
}

export interface StoreMemoryVault {
  _id: string;
  title: string;
  image: string;
  description?: string;
  category: 'Campus' | 'Students' | 'Nature' | 'Events' | 'Activities' | 'Facilities' | 'Memories';
  cardNumber: number;
  rotation: number;
  offsetX: number;
  offsetY: number;
  createdAt: string;
}

export interface StoreStudentImage {
  _id: string;
  title: string;
  image: string;
  description: string;
  createdAt: string;
}

export interface StoreSiteSettings {
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
}

class FallbackStore {
  users: StoreUser[] = [];
  events: StoreEvent[] = [];
  gallery: StoreGallery[] = [];
  facilities: StoreFacility[] = [];
  contacts: StoreContact[] = [];
  contributions: StoreContribution[] = [];
  reviews: StoreReview[] = [];
  activities: StoreActivity[] = [];
  siteSettings: StoreSiteSettings | null = null;
  memoryVaultCards: StoreMemoryVault[] = [];
  studentImages: StoreStudentImage[] = [];

  constructor() {
    this.seedDefaults();
  }

  seedDefaults() {
    this.users = [
      {
        _id: 'user-admin-1',
        name: 'Guruji',
        email: 'guruji@gmail.com',
        passwordHash: '$2a$10$LSjIrBEnMxlJ2phXc37nZO365qKaZBLCiMUQyWOBgWgI2ZE3QLZ/u',
        role: 'admin',
        createdAt: new Date().toISOString()
      }
    ];

    this.events = [
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

    this.gallery = [
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

    this.facilities = [
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
      },
      {
        _id: 'fac-7',
        title: 'Arts & Culture',
        description: 'Creative workshops for classical music, painting, pottery, drama, and cultural arts.',
        icon: 'Palette',
        createdAt: new Date().toISOString()
      },
      {
        _id: 'fac-8',
        title: 'Yoga & Meditation',
        description: 'Daily morning pranayama, meditation sessions, and physical yoga for mental clarity.',
        icon: 'Sparkles',
        createdAt: new Date().toISOString()
      },
      {
        _id: 'fac-9',
        title: 'Ashram Library',
        description: 'Quiet reading hall stocked with thousands of literature, spiritual, and educational books.',
        icon: 'Library',
        createdAt: new Date().toISOString()
      },
      {
        _id: 'fac-10',
        title: 'Guidance & Mentorship',
        description: 'One-on-one spiritual and life guidance by Guruji and experienced mentors.',
        icon: 'UserCheck',
        createdAt: new Date().toISOString()
      }
    ];

    this.contacts = [
      {
        _id: 'cnt-1',
        name: 'Rajesh Sharma',
        email: 'rajesh.sharma@example.com',
        phone: '+91 98765 43210',
        message: 'Namaste. I would like to visit Vatsalya Vatika next Sunday with my family to offer volunteer services in education.',
        status: 'new',
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
      }
    ];

    this.contributions = [];

    this.reviews = [
      {
        _id: 'rev-1',
        name: 'Aarav Patel',
        email: 'aarav.patel@example.com',
        rating: 5,
        comment: 'Vatsalya Vatika is doing incredible work! The facilities and care provided to the children are truly inspiring.',
        approved: true,
        createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
      },
      {
        _id: 'rev-2',
        name: 'Priya Sharma',
        email: 'priya.sharma@example.com',
        rating: 4,
        comment: 'Visited the ashram last week. The environment is very peaceful and the students are so well-mannered. Keep up the good work.',
        approved: true,
        createdAt: new Date(Date.now() - 3600000 * 120).toISOString()
      }
    ];

    // Seed sample Memory Vault cards using real ashram photos
    this.memoryVaultCards = [
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
      },
      {
        _id: 'mv-seed-4',
        title: 'Guruji\'s Guidance',
        image: '/guruji.jpeg',
        description: 'Spiritual wisdom and mentorship shaping young lives.',
        category: 'Events',
        cardNumber: 4,
        rotation: 3,
        offsetX: -8,
        offsetY: -10,
        createdAt: new Date().toISOString()
      }
    ];

    this.studentImages = [
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
  }
}

export const fallbackStore = new FallbackStore();
