export interface LawnMower {
  id: string;
  name: string;
  brand: string;
  model: string;
  type: 'push' | 'self-propelled' | 'riding' | 'zero-turn' | 'commercial';
  usage: 'residential' | 'commercial' | 'both';
  landSize: 'under-acre' | '1-acre' | '2-acres' | 'more-than-2-acres' | 'all';
  price: number;
  originalPrice?: number;
  inStock: boolean;
  stockCount: number;
  cuttingWidth: string;
  engineSize: string;
  fuelType: 'gas' | 'electric' | 'battery';
  features: string[];
  description: string;
  imageUrl?: string;
  specifications: {
    weight: string;
    deckMaterial: string;
    transmission?: string;
    turningRadius?: string;
    warranty: string;
  };
}

export const lawnMowers: LawnMower[] = [
  // RESIDENTIAL - UNDER AN ACRE
  {
    id: 'res-push-001',
    name: 'EcoMow Push Mower 20"',
    brand: 'Wright Motors',
    model: 'WM-P20E',
    type: 'push',
    usage: 'residential',
    landSize: 'under-acre',
    price: 299.99,
    originalPrice: 349.99,
    inStock: true,
    stockCount: 15,
    cuttingWidth: '20"',
    engineSize: '140cc',
    fuelType: 'gas',
    features: [
      'Easy pull start',
      '3-in-1 cutting (mulch, bag, side discharge)',
      'Height adjustment lever',
      'Lightweight design'
    ],
    description: 'Perfect for small lawns under an acre. Easy to maneuver and maintain.',
    specifications: {
      weight: '65 lbs',
      deckMaterial: 'Steel',
      warranty: '2 years'
    }
  },
  {
    id: 'res-battery-001',
    name: 'PowerLite Battery Mower',
    brand: 'Wright Motors',
    model: 'WM-B21L',
    type: 'self-propelled',
    usage: 'residential',
    landSize: 'under-acre',
    price: 449.99,
    inStock: true,
    stockCount: 8,
    cuttingWidth: '21"',
    engineSize: '40V Battery',
    fuelType: 'battery',
    features: [
      'Zero emissions',
      'Quiet operation',
      'Push-button start',
      '60-minute runtime',
      'LED headlights'
    ],
    description: 'Eco-friendly battery-powered mower perfect for suburban lawns.',
    specifications: {
      weight: '55 lbs',
      deckMaterial: 'Composite',
      warranty: '3 years'
    }
  },

  // RESIDENTIAL - 1 ACRE
  {
    id: 'res-self-001',
    name: 'ProCut Self-Propelled 22"',
    brand: 'Wright Motors',
    model: 'WM-SP22',
    type: 'self-propelled',
    usage: 'residential',
    landSize: '1-acre',
    price: 649.99,
    inStock: true,
    stockCount: 12,
    cuttingWidth: '22"',
    engineSize: '190cc',
    fuelType: 'gas',
    features: [
      'Variable speed drive',
      'Electric start',
      'Large rear wheels',
      'Washout port',
      'Folding handle'
    ],
    description: 'Self-propelled power for medium-sized lawns up to 1 acre.',
    specifications: {
      weight: '85 lbs',
      deckMaterial: 'Steel',
      warranty: '2 years'
    }
  },
  {
    id: 'res-riding-001',
    name: 'YardMaster Riding Mower',
    brand: 'Wright Motors',
    model: 'WM-R42',
    type: 'riding',
    usage: 'residential',
    landSize: '1-acre',
    price: 1899.99,
    inStock: true,
    stockCount: 5,
    cuttingWidth: '42"',
    engineSize: '420cc',
    fuelType: 'gas',
    features: [
      'Comfortable seat',
      'Side-by-side foot pedals',
      '6-speed transmission',
      'Cup holder',
      'LED headlights'
    ],
    description: 'Comfortable riding mower ideal for 1-acre properties.',
    specifications: {
      weight: '420 lbs',
      deckMaterial: 'Reinforced Steel',
      transmission: '6-speed manual',
      warranty: '2 years'
    }
  },

  // RESIDENTIAL - 2 ACRES
  {
    id: 'res-riding-002',
    name: 'Estate Pro Riding Mower',
    brand: 'Wright Motors',
    model: 'WM-R46E',
    type: 'riding',
    usage: 'residential',
    landSize: '2-acres',
    price: 2499.99,
    inStock: true,
    stockCount: 4,
    cuttingWidth: '46"',
    engineSize: '540cc',
    fuelType: 'gas',
    features: [
      'Hydrostatic transmission',
      'Cruise control',
      'High-back seat',
      'Deck wash system',
      'Hour meter'
    ],
    description: 'Premium riding mower designed for larger residential properties.',
    specifications: {
      weight: '550 lbs',
      deckMaterial: 'Fabricated Steel',
      transmission: 'Hydrostatic',
      warranty: '3 years'
    }
  },

  // RESIDENTIAL/COMMERCIAL - MORE THAN 2 ACRES
  {
    id: 'res-zero-001',
    name: 'ZeroTurn Elite 54"',
    brand: 'Wright Motors',
    model: 'WM-ZT54',
    type: 'zero-turn',
    usage: 'both',
    landSize: 'more-than-2-acres',
    price: 3299.99,
    inStock: true,
    stockCount: 3,
    cuttingWidth: '54"',
    engineSize: '725cc',
    fuelType: 'gas',
    features: [
      'Zero-turn radius',
      'Dual hydrostatic drives',
      'Adjustable seat',
      'Anti-scalp wheels',
      'Hour meter'
    ],
    description: 'Professional-grade zero-turn mower for large properties and light commercial use.',
    specifications: {
      weight: '650 lbs',
      deckMaterial: 'Fabricated Steel',
      transmission: 'Dual Hydrostatic',
      turningRadius: '0"',
      warranty: '3 years'
    }
  },

  // COMMERCIAL
  {
    id: 'com-walk-001',
    name: 'Commercial Walk-Behind 36"',
    brand: 'Wright Motors',
    model: 'WM-CW36',
    type: 'self-propelled',
    usage: 'commercial',
    landSize: 'all',
    price: 2899.99,
    inStock: true,
    stockCount: 6,
    cuttingWidth: '36"',
    engineSize: '420cc',
    fuelType: 'gas',
    features: [
      'Commercial-grade engine',
      'Dual hydro drives',
      'Floating deck',
      'Pistol grip controls',
      'Heavy-duty frame'
    ],
    description: 'Professional walk-behind mower built for commercial landscaping.',
    specifications: {
      weight: '285 lbs',
      deckMaterial: 'Fabricated Steel',
      transmission: 'Dual Hydrostatic',
      warranty: '2 years commercial'
    }
  },
  {
    id: 'com-zero-001',
    name: 'Commercial ZeroTurn 60"',
    brand: 'Wright Motors',
    model: 'WM-CZ60',
    type: 'zero-turn',
    usage: 'commercial',
    landSize: 'more-than-2-acres',
    price: 5499.99,
    inStock: true,
    stockCount: 2,
    cuttingWidth: '60"',
    engineSize: '850cc',
    fuelType: 'gas',
    features: [
      'Commercial hydraulics',
      'Suspension seat',
      'Heavy-duty spindles',
      'Large fuel tank',
      'Hour meter with service reminders'
    ],
    description: 'Heavy-duty commercial zero-turn mower for professional landscapers.',
    specifications: {
      weight: '950 lbs',
      deckMaterial: '7-gauge Steel',
      transmission: 'Commercial Hydrostatic',
      turningRadius: '0"',
      warranty: '2 years commercial'
    }
  },
  {
    id: 'com-zero-002',
    name: 'Commercial ZeroTurn 72"',
    brand: 'Wright Motors',
    model: 'WM-CZ72X',
    type: 'zero-turn',
    usage: 'commercial',
    landSize: 'more-than-2-acres',
    price: 7299.99,
    inStock: false,
    stockCount: 0,
    cuttingWidth: '72"',
    engineSize: '999cc',
    fuelType: 'gas',
    features: [
      'Maximum productivity',
      'Air-ride suspension seat',
      'Fuel gauge',
      'Commercial hydraulic pumps',
      'LED light kit'
    ],
    description: 'Top-of-the-line commercial mower for maximum efficiency and productivity.',
    specifications: {
      weight: '1150 lbs',
      deckMaterial: '7-gauge Fabricated Steel',
      transmission: 'Heavy-duty Hydrostatic',
      turningRadius: '0"',
      warranty: '3 years commercial'
    }
  },

  // ELECTRIC OPTIONS
  {
    id: 'res-electric-001',
    name: 'EcoRide Electric Mower',
    brand: 'Wright Motors',
    model: 'WM-E42',
    type: 'riding',
    usage: 'residential',
    landSize: '1-acre',
    price: 3499.99,
    inStock: true,
    stockCount: 3,
    cuttingWidth: '42"',
    engineSize: '48V Electric',
    fuelType: 'electric',
    features: [
      'Zero emissions',
      'Whisper quiet',
      'No maintenance required',
      '2-hour runtime',
      'Fast charging'
    ],
    description: 'Revolutionary electric riding mower with zero emissions and minimal noise.',
    specifications: {
      weight: '380 lbs',
      deckMaterial: 'Steel',
      transmission: 'Variable Speed',
      warranty: '4 years'
    }
  },

  // BUDGET OPTIONS
  {
    id: 'res-budget-001',
    name: 'BasicCut Push Mower',
    brand: 'Wright Motors',
    model: 'WM-B18',
    type: 'push',
    usage: 'residential',
    landSize: 'under-acre',
    price: 199.99,
    inStock: true,
    stockCount: 20,
    cuttingWidth: '18"',
    engineSize: '125cc',
    fuelType: 'gas',
    features: [
      'Simple operation',
      'Lightweight',
      'Side discharge',
      'Easy storage'
    ],
    description: 'Budget-friendly option for small lawns and first-time buyers.',
    specifications: {
      weight: '45 lbs',
      deckMaterial: 'Steel',
      warranty: '1 year'
    }
  }
];

export const getMowersByUsageAndSize = (usage: string, landSize: string): LawnMower[] => {
  return lawnMowers.filter(mower => {
    const usageMatch = mower.usage === usage || mower.usage === 'both';
    const sizeMatch = mower.landSize === landSize || mower.landSize === 'all';
    return usageMatch && sizeMatch;
  });
};

export const getAllMowers = (): LawnMower[] => {
  return lawnMowers;
};

export const getMowerById = (id: string): LawnMower | undefined => {
  return lawnMowers.find(mower => mower.id === id);
};

export const getMowersByType = (type: LawnMower['type']): LawnMower[] => {
  return lawnMowers.filter(mower => mower.type === type);
};

export const getMowersInStock = (): LawnMower[] => {
  return lawnMowers.filter(mower => mower.inStock);
};
