export interface AshramCard {
  id: string;
  title: string;
  category: 'Campus' | 'Students' | 'Nature' | 'Events' | 'Activities' | 'Facilities' | 'Memories';
  image: string;
  description: string;
  date?: string;
  cardNumber: number; // 1 to 52
  rotation: number; // Slight degree rotation
  size: 'small' | 'medium' | 'large';
  offsetX: number;
  offsetY: number;
}

const CATEGORIES: Array<AshramCard['category']> = [
  'Campus', 'Students', 'Nature', 'Events', 'Activities', 'Facilities', 'Memories'
];

const DESCRIPTIONS: Record<AshramCard['category'], string[]> = {
  Campus: [
    'A serene view of the main ashram building surrounded by nature.',
    'The peaceful prayer hall during sunrise.',
    'Green pathways designed for quiet contemplation and walks.',
    'A beautiful sunset reflecting on the ashram central courtyard.',
  ],
  Students: [
    'Bright smiles of students ready for morning classes.',
    'A group study session in the main hall.',
    'Students engaged in values and character building classes.',
    'A joyful group photo of the children during a value workshop.',
  ],
  Nature: [
    'Beautiful flower gardens surrounding the campus.',
    'Lush green fields where students enjoy nature study.',
    'Early morning dew on the sacred trees of the ashram.',
    'A quiet corner under the shade of ancient banyan trees.',
  ],
  Events: [
    'Annual day celebrations with cultural dance performances.',
    'Special yoga day event with students showcasing asanas.',
    'Independence day flag hoisting ceremony with children.',
    'Satsang programs filled with spiritual wisdom and songs.',
  ],
  Activities: [
    'Students practicing Judo and self-defense skills.',
    'Art and painting workshop bringing out children’s creativity.',
    'Daily sports and athletic training sessions on the ground.',
    'Creative drama performances by students during festivals.',
  ],
  Facilities: [
    'Well-equipped science and digital technology lab.',
    'A cozy reading corner in the main library.',
    'The dining hall where students enjoy fresh sattvic meals.',
    'Clean, spacious, and hygienic student dormitories.',
  ],
  Memories: [
    'Swami Hariom Das Ji sharing stories with the children.',
    'Receiving the Haryana Child Welfare Council award in 2013.',
    'Alumni students sharing their success stories with juniors.',
    'A sweet memory of children celebrating festivals together.',
  ],
};

const TITLES: Record<AshramCard['category'], string[]> = {
  Campus: ['Serene Courtyard', 'Sacred Prayer Hall', 'Peaceful Pathways', 'Central Sanctuary'],
  Students: ['Future Scholars', 'Collaborative Learning', 'Character Nurturing', 'Joyful Minds'],
  Nature: ['Blossoming Gardens', 'Green Meadows', 'Morning Dew', 'Banyan Tree Shade'],
  Events: ['Annual Celebration', 'Yoga Day Showcase', 'Patriotic Harmony', 'Spiritual Gathering'],
  Activities: ['Self-Defense Class', 'Creative Expressions', 'Sports Fellowship', 'Drama Performance'],
  Facilities: ['Digital Science Lab', 'Quiet Library Corner', 'Sattvic Kitchen', 'Comfortable Dorms'],
  Memories: ['Guruji’s Wisdom Circle', 'Welfare Council Award', 'Inspirational Alumni', 'Festive Joy'],
};

// Seed 52 cards
export const generateAshramCards = (): AshramCard[] => {
  const cards: AshramCard[] = [];
  const totalCards = 52;

  // Unsplash image ids to provide a beautiful, diverse mix of relevant spiritual, learning, play, and nature photos
  const imageIds = [
    'photo-1545205597-3d9d02c29597', // yoga/peaceful
    'photo-1509062522246-3755977927d7', // learning
    'photo-1503676260728-1c00da094a0b', // kids learning
    'photo-1464822759023-fed622ff2c3b', // nature/mountains
    'photo-1544717305-2782549b5136', // kids reading
    'photo-1473448912268-2022ce9509d8', // autumn forest/pathway
    'photo-1516321318423-f06f85e504b3', // computer learning
    'photo-1461896836934-ffe607ba8211', // running/sports
    'photo-1506126613408-eca07ce68773', // meditation
    'photo-1522071820081-009f0129c71c', // group study
    'photo-1511632765486-a01980e01a18', // celebration
    'photo-1547592180-85f173990554', // cooking/dining
    'photo-1518531933037-91b2f5f229cc', // flower green
    'photo-1502082553048-f009c37129b9', // tree park
    'photo-1497633762265-9d179a990aa6', // library books
    'photo-1488521787991-ed7bbaae773c', // smiling kids charity
    'photo-1577896851231-70ef18881754', // teacher with kids
    'photo-1507679799987-c73779587ccf', // corporate/guidance
    'photo-1472214222555-d404758b1c42', // green landscape
    'photo-1513829090314-5d8ec1135248', // temple/heritage architecture
    'photo-1528605248644-14dd04022da1', // eating group
    'photo-1489710437720-ebb67ec84dd2', // joyful kid
    'photo-1542831371-29b0f74f9713', // coding
    'photo-1516627145497-ae6968895b74', // happy children
    'photo-1519751138087-5bf79df62d5b', // plants garden
    'photo-1596464716127-f2a82984de30', // karate class
    'photo-1540224269468-af31c7789d38', // sports ground
    'photo-1501854140801-50d01698950b', // sunset landscape
    'photo-1544367567-0f2fcb009e0b', // yoga pose
    'photo-1552664730-d307ca884978', // work collaboration
    'photo-1517245386807-bb43f82c33c4', // presentation
    'photo-1592595896551-12b371d546d5', // cozy room
    'photo-1473186578172-c141e6798cf4', // vintage book study
    'photo-1476514525535-07fb3b4ae5f1', // travel scenery
    'photo-1517486808906-6ca8b3f04846', // friends sharing
    'photo-1529156069898-49953e39b3ac', // joyful friends
    'photo-1526726576990-5fe7bb6e8a15', // book shelf
    'photo-1501504905252-473c47e087f8', // students writing
    'photo-1498837167922-ddd27525d352', // healthy organic food
    'photo-1444858291040-5837d6a458c1', // green pathway trees
    'photo-1434030216411-0b793f4b4173', // student artwork
    'photo-1505373877841-8d25f7d46678', // robotics class
    'photo-1560518883-ce09059eeffa', // beautiful building house
    'photo-1542601906990-b4d3fb778b09', // eco recycle green
    'photo-1506744038136-46273834b3fb', // river mountain sunset
    'photo-1551847677-ac3dbec9044f', // dental health checkup
    'photo-1495563973589-8178a85de350', // sunshine flowers
    'photo-1523050854-0552f95938c7', // college graduation cap
    'photo-1591154669695-5f2a8d20c089', // school building corridor
    'photo-1582213782179-e0d53f98f2ca', // teamwork hands
    'photo-1571210862729-78a52d3779a2', // child painting
    'photo-1544535830-9df3f56fff6a', // group meditation pose
  ];

  for (let i = 1; i <= totalCards; i++) {
    // Round-robin assign category
    const category = CATEGORIES[(i - 1) % CATEGORIES.length];

    const categoryTitles = TITLES[category];
    const categoryDescs = DESCRIPTIONS[category];

    const titleIdx = (i - 1) % categoryTitles.length;
    const descIdx = (i - 1) % categoryDescs.length;

    const size: AshramCard['size'] = i % 10 === 0 ? 'large' : i % 5 === 0 ? 'small' : 'medium';

    // Dates spread across recent months/years
    const year = 2025 - (i % 2);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[i % 12];
    const day = 1 + (i * 7) % 28;

    // Pull from pre-selected high-quality Unsplash source
    const imgId = imageIds[(i - 1) % imageIds.length];
    const image = `https://images.unsplash.com/${imgId}?auto=format&fit=crop&w=800&q=80`;

    // Deterministic stacked deck offsets
    const offsetX = Math.sin(i * 1.3) * 35; // Spread horizontally +/- 35px
    const offsetY = Math.cos(i * 1.7) * 25; // Spread vertically +/- 25px
    const rotation = (i % 2 === 0 ? 1 : -1) * (2 + (i % 6) * 3); // Rotation +/- 17 degrees

    cards.push({
      id: `card-${i}`,
      title: `${categoryTitles[titleIdx]} #${Math.ceil(i / CATEGORIES.length)}`,
      category,
      image,
      description: categoryDescs[descIdx],
      date: `${month} ${day}, ${year}`,
      cardNumber: i,
      rotation,
      size,
      offsetX,
      offsetY,
    });
  }

  return cards;
};
