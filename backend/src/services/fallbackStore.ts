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

    this.gallery = [
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

    // Seed sample Memory Vault cards
    const mvImages = [
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80',
    ];
    const mvCategories: StoreMemoryVault['category'][] = ['Campus', 'Students', 'Activities', 'Nature', 'Events', 'Facilities'];
    const mvTitles = ['Serene Courtyard', 'Future Scholars', 'Sports Fellowship', 'Morning Dew', 'Annual Celebration', 'Digital Science Lab'];
    const mvDescs = [
      'A peaceful view of the ashram campus at sunrise.',
      'Bright smiles of students ready for morning classes.',
      'Students enjoying team sports on the ashram ground.',
      'Lush greenery and sacred trees of the ashram campus.',
      'Annual day celebrations with cultural performances.',
      'Well-equipped science and digital technology lab.',
    ];
    this.memoryVaultCards = mvImages.map((img, i) => ({
      _id: `mv-seed-${i + 1}`,
      title: mvTitles[i],
      image: img,
      description: mvDescs[i],
      category: mvCategories[i],
      cardNumber: i + 1,
      rotation: (i % 2 === 0 ? 1 : -1) * (2 + (i % 6) * 2.5),
      offsetX: Math.sin((i + 1) * 1.3) * 30,
      offsetY: Math.cos((i + 1) * 1.7) * 20,
      createdAt: new Date().toISOString(),
    }));

    this.studentImages = [
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
  }
}

export const fallbackStore = new FallbackStore();
