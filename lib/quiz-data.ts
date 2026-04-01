export interface QuizQuestion {
  id: string
  question: string
  description: string
  options: { value: string; label: string; description: string; image: string }[]
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'curl_pattern',
    question: 'What is your curl pattern?',
    description: 'Look at your hair in its natural state without any products.',
    options: [
      {
        value: '1',
        label: 'Straight (Type 1)',
        description: 'Hair lies flat from root to tip with no visible curl.',
        image: '/straight(type1).jpg',
      },
      {
        value: '2',
        label: 'Wavy (Type 2)',
        description: 'Hair has a slight S-shape or loose waves.',
        image: '/wavy(type2).jpg',
      },
      {
        value: '3',
        label: 'Curly (Type 3)',
        description: 'Hair forms defined spiral curls or ringlets.',
        image: '/curly(type3).jpg',
      },
      {
        value: '4',
        label: 'Coily (Type 4)',
        description: 'Hair forms tight coils, zigzag patterns, or kinks.',
        image: '/coily(type4).jpg',
      },
    ],
  },
  {
    id: 'curl_subtype',
    question: 'How would you describe your curl tightness?',
    description: 'Think about the size of your curl or wave pattern.',
    options: [
      {
        value: 'N',
        label: 'Bone straight (no curl)',
        description: 'Hair lies completely flat with no wave, curl, or coil pattern.',
        image: '/BoneStraight.jpg',
      },
      {
        value: 'A',
        label: 'Loose / Large',
        description: 'Loose waves, big bouncy curls, or soft coils.',
        image: '/loose-large.jpg',
      },
      {
        value: 'B',
        label: 'Medium / Defined',
        description: 'Medium waves, springy curls, or defined coils.',
        image: '/mediumDefined.jpg',
      },
      {
        value: 'C',
        label: 'Tight / Small',
        description: 'Tight waves, corkscrew curls, or tight coils/kinks.',
        image: '/tightSmall.jpg',
      },
    ],
  },
  {
    id: 'porosity',
    question: 'How does your hair absorb water?',
    description:
      'Spray some water on a strand of clean, product-free hair and observe.',
    options: [
      {
        value: 'low',
        label: 'Low Porosity',
        description:
          'Water beads up on hair and takes a long time to absorb. Hair dries slowly.',
        image: '/lowPorosity.jpg',
      },
      {
        value: 'medium',
        label: 'Medium Porosity',
        description:
          'Water absorbs within a few minutes. Hair holds styles well.',
        image: '/mediumPorosity.jpg',
      },
      {
        value: 'high',
        label: 'High Porosity',
        description:
          'Water absorbs instantly but hair dries quickly and gets frizzy.',
        image: '/highPorosity.jpg',
      },
    ],
  },
  {
    id: 'scalp_condition',
    question: 'How would you describe your scalp condition?',
    description: 'Think about your scalp a day or two after washing.',
    options: [
      {
        value: 'oily',
        label: 'Oily',
        description: 'Scalp gets greasy quickly, often within a day.',
        image: '/oilyhair.jpg',
      },
      {
        value: 'balanced',
        label: 'Balanced',
        description: 'Scalp feels comfortable for 2-3 days after washing.',
        image: '/balanced.jpg',
      },
      {
        value: 'dry',
        label: 'Dry',
        description: 'Scalp often feels tight, flaky, or itchy.',
        image: '/dryhair.jpg',
      },
      {
        value: 'sensitive',
        label: 'Sensitive',
        description:
          'Scalp reacts easily to products, prone to irritation or redness.',
        image: '/sensitve.jpg',
      },
    ],
  },
  {
    id: 'thickness',
    question: 'What is the thickness of individual hair strands?',
    description:
      'Take a single strand and roll it between your fingers gently.',
    options: [
      {
        value: 'fine',
        label: 'Fine',
        description: 'You can barely feel the strand between your fingers.',
        image: '/thickness-fine.svg',
      },
      {
        value: 'medium',
        label: 'Medium',
        description: 'You can feel the strand but it feels smooth.',
        image: '/thickness-medium.svg',
      },
      {
        value: 'coarse',
        label: 'Coarse',
        description: 'The strand feels thick and textured.',
        image: '/thickness-coarse.svg',
      },
    ],
  },
  {
    id: 'density',
    question: 'How dense is your hair?',
    description: 'Look at your scalp in a mirror under natural light.',
    options: [
      {
        value: 'low',
        label: 'Low Density',
        description: 'You can easily see your scalp through your hair.',
        image: '/lowdensity.jpg',
      },
      {
        value: 'medium',
        label: 'Medium Density',
        description: 'You can see some scalp if you look closely.',
        image: '/mediumdensity.jpg',
      },
      {
        value: 'high',
        label: 'High Density',
        description:
          'It is very hard to see your scalp through your hair.',
        image: '/highdensity.jpg',
      },
    ],
  },
  {
    id: 'goals',
    question: 'What is your primary hair goal?',
    description: 'Pick the one that matters most to you right now.',
    options: [
      {
        value: 'growth',
        label: 'Hair Growth',
        description:
          'I want to grow my hair longer and prevent breakage.',
        image: '/hairgrowth.jpg',
      },
      {
        value: 'moisture',
        label: 'Moisture & Hydration',
        description: 'My hair feels dry and needs more hydration.',
        image: '/moisturehydration.jpg',
      },
      {
        value: 'definition',
        label: 'Curl Definition',
        description: 'I want my curls to be more defined and less frizzy.',
        image: '/curldefinition.jpg',
      },
      {
        value: 'repair',
        label: 'Damage Repair',
        description:
          'My hair is damaged from heat, color, or chemical treatments.',
        image: '/damagedrepair.jpg',
      },
      {
        value: 'volume',
        label: 'Volume & Fullness',
        description:
          'My hair is flat and I want more body and volume.',
        image: '/volumefulllness.jpg',
      },
    ],
  },
]

export interface HairProfile {
  hairType: string
  porosity: string
  scalpCondition: string
  thickness: string
  density: string
  goal: string
}

export interface Product {
  id: string
  name: string
  brand: string
  category: string
  description: string
  price: string
  image: string
}

export interface RoutineStep {
  id: string
  step: number
  name: string
  description: string
  frequency: string
  icon: string
}

export function getHairType(
  curlPattern: string,
  curlSubtype: string
): string {
  const typeMap: Record<string, string> = {
    '1': 'Straight',
    '2': 'Wavy',
    '3': 'Curly',
    '4': 'Coily',
  }
  const baseType = typeMap[curlPattern] || 'Unknown'
  if (curlSubtype === 'N') {
    return `${curlPattern} - ${baseType} (bone straight)`
  }
  return `${curlPattern}${curlSubtype} - ${baseType}`
}

export function getRoutineSteps(profile: HairProfile): RoutineStep[] {
  const steps: RoutineStep[] = [
    {
      id: 'cleanse',
      step: 1,
      name: 'Cleanse',
      description:
        profile.scalpCondition === 'oily'
          ? 'Use a clarifying shampoo 2-3 times per week to remove excess oil.'
          : profile.scalpCondition === 'dry'
            ? 'Use a gentle, sulfate-free shampoo to cleanse without stripping moisture.'
            : 'Use a mild, pH-balanced shampoo to maintain your healthy scalp.',
      frequency:
        profile.scalpCondition === 'oily' ? 'Every other day' : '2-3x per week',
      icon: 'droplets',
    },
    {
      id: 'condition',
      step: 2,
      name: 'Condition',
      description:
        profile.porosity === 'high'
          ? 'Use a protein-rich deep conditioner to strengthen and repair porous strands.'
          : profile.porosity === 'low'
            ? 'Use a lightweight, water-based conditioner with heat to help penetrate cuticles.'
            : 'Apply a balanced conditioner focusing on mid-lengths to ends.',
      frequency: 'Every wash day',
      icon: 'heart',
    },
    {
      id: 'moisturize',
      step: 3,
      name: 'Moisturize',
      description:
        profile.goal === 'moisture'
          ? 'Use the LOC/LCO method: apply a liquid, oil, then cream to lock in hydration.'
          : 'Apply a leave-in conditioner or moisturizing cream to damp hair.',
      frequency: 'Daily or as needed',
      icon: 'sparkles',
    },
    {
      id: 'style',
      step: 4,
      name: 'Style',
      description:
        profile.goal === 'definition'
          ? 'Apply a curl-defining gel or mousse, then diffuse or air-dry for defined curls.'
          : profile.goal === 'volume'
            ? 'Use a volumizing mousse and blow-dry with a round brush at the roots.'
            : 'Choose a protective style or gentle method to minimize manipulation.',
      frequency: 'As desired',
      icon: 'wind',
    },
  ]
  return steps
}

export function getRecommendedProducts(profile: HairProfile): Product[] {
  const products: Product[] = []

  // Shampoo recommendation
  if (profile.scalpCondition === 'oily') {
    products.push({
      id: 'shampoo-1',
      name: 'Purifying Scalp Cleanser',
      brand: 'CurlBalance',
      category: 'Shampoo',
      description: 'A gentle clarifying shampoo that removes buildup without over-stripping natural oils.',
      price: '$18',
      image: '/images/product-shampoo.jpg',
    })
  } else {
    products.push({
      id: 'shampoo-2',
      name: 'Hydra-Silk Cleanser',
      brand: 'Mane Ritual',
      category: 'Shampoo',
      description: 'Sulfate-free, moisture-rich formula that gently cleanses while preserving hydration.',
      price: '$22',
      image: '/images/product-shampoo.jpg',
    })
  }

  // Conditioner recommendation
  if (profile.porosity === 'high') {
    products.push({
      id: 'conditioner-1',
      name: 'Protein Repair Mask',
      brand: 'Strand Science',
      category: 'Deep Conditioner',
      description: 'Strengthening treatment with keratin and amino acids to restore damaged, porous hair.',
      price: '$28',
      image: '/images/product-conditioner.jpg',
    })
  } else {
    products.push({
      id: 'conditioner-2',
      name: 'Velvet Moisture Mask',
      brand: 'Botaniq',
      category: 'Conditioner',
      description: 'A lightweight yet deeply hydrating conditioner with shea butter and aloe vera.',
      price: '$24',
      image: '/images/product-conditioner.jpg',
    })
  }

  // Leave-in / Moisturizer
  products.push({
    id: 'leave-in-1',
    name: 'Cloud Cream Leave-In',
    brand: 'Curl Haus',
    category: 'Leave-In Conditioner',
    description: 'A weightless cream that detangles, moisturizes, and protects against heat and humidity.',
    price: '$20',
    image: '/images/product-leavein.jpg',
  })

  // Styling product based on goal
  if (profile.goal === 'definition') {
    products.push({
      id: 'style-1',
      name: 'Define & Shine Gel',
      brand: 'Coil Co.',
      category: 'Styling Gel',
      description: 'Strong-hold gel that defines curls and coils with zero crunch or flaking.',
      price: '$16',
      image: '/images/product-styling.jpg',
    })
  } else if (profile.goal === 'volume') {
    products.push({
      id: 'style-2',
      name: 'Root Lift Mousse',
      brand: 'AirWave',
      category: 'Styling Mousse',
      description: 'Volumizing mousse that provides lift and body without weighing hair down.',
      price: '$19',
      image: '/images/product-styling.jpg',
    })
  } else {
    products.push({
      id: 'style-3',
      name: 'Seal & Protect Oil',
      brand: 'Golden Root',
      category: 'Hair Oil',
      description: 'A lightweight blend of argan and jojoba oils that seals moisture and adds shine.',
      price: '$26',
      image: '/images/product-styling.jpg',
    })
  }

  return products
}
