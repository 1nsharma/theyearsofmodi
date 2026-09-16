export interface Chapter {
  id: number;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  icon: string;
  color: string;
}

export const chapters: Chapter[] = [
  {
    id: 0,
    year: "2014",
    title: "A New Dawn",
    subtitle: "16th Prime Minister of India",
    description: "On May 26, 2014, Narendra Modi took the oath as the 16th Prime Minister of India, marking the beginning of a transformative era. With a decisive mandate of 282 seats, the largest for a single party in three decades.",
    details: [
      "Largest single-party majority in 30 years",
      "Sabka Saath, Sabka Vikas — Development for All",
      "Make in India initiative launched",
    ],
    icon: "🏛️",
    color: "#FF9933",
  },
  {
    id: 1,
    year: "2014–2015",
    title: "Foundation of Reform",
    subtitle: "Structural Economic Transformation",
    description: "The first year saw the launch of flagship programs that would reshape India's economic and social landscape — from financial inclusion to sanitation revolution.",
    details: [
      "Pradhan Mantri Jan Dhan Yojana — 15 crore bank accounts opened",
      "Swachh Bharat Mission — sanitation for 100 million households",
      "Digital India programme announced",
      "FDI limits relaxed across sectors",
    ],
    icon: "🏗️",
    color: "#FF9933",
  },
  {
    id: 2,
    year: "2016",
    title: "Bold Decisions",
    subtitle: "Demonetization & Surgical Strikes",
    description: "A year of unprecedented moves — the surgical strikes across the Line of Control demonstrated military resolve, while demonetization reshaped the cash economy.",
    details: [
      "Surgical strikes on terrorist launch pads in PoK",
      "Demonetization of ₹500 and ₹1000 notes",
      "UPI launched — digital payments revolution begins",
      "GST Bill passed in Parliament",
    ],
    icon: "⚡",
    color: "#FFFFFF",
  },
  {
    id: 3,
    year: "2017",
    title: "One Nation, One Tax",
    subtitle: "GST & Global Diplomacy",
    description: "The Goods and Services Tax unified India's fragmented tax structure into a single market. India's global standing grew through strategic partnerships.",
    details: [
      "GST implemented — largest tax reform since independence",
      "India becomes a key player in global climate agreements",
      "BIMSTEC summit strengthens neighborhood ties",
      "Startup India ecosystem flourishes",
    ],
    icon: "📊",
    color: "#138808",
  },
  {
    id: 4,
    year: "2018",
    title: "Rising Global Voice",
    subtitle: "Strategic Autonomy in Action",
    description: "India's voice grew louder on the world stage. From the Wuhan summit to the historic Modi-Xi meetings, India balanced strategic relationships with conviction.",
    details: [
      "Ayushman Bharat — world's largest health insurance scheme",
      "Statue of Unity — world's tallest statue inaugurated",
      "INR 1.5 lakh crore infrastructure push",
      "India enters top 100 in Ease of Doing Business",
    ],
    icon: "🌍",
    color: "#FF9933",
  },
  {
    id: 5,
    year: "2019",
    title: "Decisive Mandate",
    subtitle: "Article 370 & Second Term",
    description: "A resounding victory with an even larger mandate. The abrogation of Article 370 fulfilled a decades-old promise, while the Kartarpur Corridor opened doors of peace.",
    details: [
      "Historic mandate — 303 seats, largest ever for BJP",
      "Article 370 abrogated — full integration of J&K",
      "Kartarpur Corridor opened for pilgrims",
      "Chandrayaan-2 launched — moon mission begins",
    ],
    icon: "🎯",
    color: "#FFFFFF",
  },
  {
    id: 6,
    year: "2020",
    title: "Crisis & Resilience",
    subtitle: "Navigating the Pandemic",
    description: "The world faced its greatest challenge in a century. India's response included the world's largest lockdown, massive relief packages, and a pivot to self-reliance.",
    details: [
      "Atmanirbhar Bharat — Self-Reliant India movement",
      "INR 20 lakh crore economic stimulus package",
      "Vande Bharat Mission — world's largest evacuation",
      "PLI schemes launched for manufacturing boost",
    ],
    icon: "🛡️",
    color: "#138808",
  },
  {
    id: 7,
    year: "2021",
    title: "Vaccine Maitri",
    subtitle: "India as the World's Pharmacy",
    description: "India became the world's vaccine supplier, extending Vaccine Maitri to over 150 nations. The farm laws debate and their eventual repeal showed democratic responsiveness.",
    details: [
      "World's largest vaccination drive — 200 crore+ doses",
      "Vaccine Maitri — supplies to 150+ countries",
      "Farm laws repealed after democratic deliberation",
      "G20 presidency preparations begin",
    ],
    icon: "💉",
    color: "#FF9933",
  },
  {
    id: 8,
    year: "2022",
    title: "Azadi Ka Amrit Mahotsav",
    subtitle: "75 Years of Independence",
    description: "India celebrated 75 years of independence with a vision for Amrit Kaal — the 25-year journey toward Viksit Bharat. The Har Ghar Tiranga campaign united the nation.",
    details: [
      "Har Ghar Tiranga — 20 crore+ homes with national flag",
      "India becomes 5th largest economy globally",
      "Semiconductor mission launched",
      "100+ districts covered under Aspirational Districts",
    ],
    icon: "🇮🇳",
    color: "#FFFFFF",
  },
  {
    id: 9,
    year: "2023",
    title: "Vishwaguru",
    subtitle: "G20 Presidency & Chandrayaan-3",
    description: "India held the G20 presidency with grace and conviction, welcoming the African Union. Chandrayaan-3's historic moon landing made India the first nation at the lunar south pole.",
    details: [
      "G20 New Delhi Declaration — historic consensus",
      "Chandrayaan-3 lands on Moon's south pole",
      "African Union inducted into G20",
      "Aditya-L1 launched to study the Sun",
    ],
    icon: "🌙",
    color: "#FF9933",
  },
  {
    id: 10,
    year: "2024",
    title: "Third Term",
    subtitle: "Viksit Bharat 2047",
    description: "Securing a historic third consecutive term, the vision for a developed India by 2047 — the centenary of independence — became the defining national mission.",
    details: [
      "NDA wins third consecutive term",
      "Vision: Viksit Bharat by 2047",
      "Women's Reservation Bill enacted",
      "India's digital public infrastructure goes global",
    ],
    icon: "🚀",
    color: "#138808",
  },
];

export const milestones = [
  { year: "2014", event: "Becomes PM", x: 5 },
  { year: "2015", event: "Make in India", x: 14 },
  { year: "2016", event: "Demonetization", x: 23 },
  { year: "2017", event: "GST Launch", x: 32 },
  { year: "2018", event: "Ayushman Bharat", x: 41 },
  { year: "2019", event: "Article 370", x: 50 },
  { year: "2020", event: "Atmanirbhar Bharat", x: 59 },
  { year: "2021", event: "Vaccine Maitri", x: 68 },
  { year: "2022", event: "Amrit Mahotsav", x: 77 },
  { year: "2023", event: "G20 & Moon Landing", x: 86 },
  { year: "2024", event: "Third Term", x: 95 },
];
