const luxCampaign = '/src/assets/images/lux_campaign_1782106529363.jpg';
const creativeConcept = '/src/assets/images/creative_concept_1782106541878.jpg';
const cinematicConcept = '/src/assets/images/cinematic_concept_1782106555605.jpg';
import { PortfolioProject } from '../types';

export const JULIAN_AVATAR_PATH = '/src/assets/images/arshdeep_avatar_exact.png';

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'campaign-01',
    title: 'REBRANDING LOCAL BUSINESSES',
    category: 'LOCAL BUSINESS MARKETING',
    imageUrl: luxCampaign,
    aspect: '3:4',
    offsetClass: 'md:pt-0 pb-12',
    description: 'Creating fresh visual assets for neighborhood shops. By designing custom physical menus and eye-catching social media posts on Canva, I help local brands connect with their community and look highly professional.',
    year: '2026',
    metrics: [
      'CANVA DESIGN',
      'VISUAL IDENTITY'
    ],
    link: '#campaign-silent'
  },
  {
    id: 'campaign-02',
    title: 'CREATIVE BRAND CONCEPTS',
    category: 'AI & CONTENT STRATEGY',
    imageUrl: creativeConcept,
    aspect: '4:3',
    offsetClass: 'md:pt-24 md:pl-8 pb-12',
    description: 'Building out next-generation marketing ideas. I use modern AI tools to research target audiences, brainstorm unique social media campaigns, and design fresh brand strategies that tell a story.',
    year: '2025',
    metrics: [
      'AI PROMPTING',
      'CAMPAIGN IDEATION'
    ],
    link: '#campaign-architectural'
  },
  {
    id: 'campaign-03',
    title: 'VISUAL MARKETS & MENUS',
    category: 'FREELANCE CONTENT CREATION',
    imageUrl: cinematicConcept,
    aspect: '16:9',
    offsetClass: 'md:pt-12 pb-16 col-span-2 max-w-4xl mx-auto',
    description: 'Designing print and digital assets for neighborhood eateries and businesses. I build practical, beautiful assets like menus and promotion posters that improve presentation and attract local clients.',
    year: '2026',
    metrics: [
      'LOCAL BUSINESSES',
      'PRINT & DIGITAL'
    ],
    link: '#campaign-cinematic'
  }
];

export const NAVIGATION_LINKS = [
  { id: 'hero', label: 'HOME', href: '#hero' },
  { id: 'projects', label: 'CASE STUDIES', href: '#projects' },
  { id: 'about', label: 'EXPERIENCE', href: '#about' },
  { id: 'contact', label: 'CONNECT', href: '#contact' }
];

export const PERSONAL_BIO = {
  name: 'ARSHDEEP SINGH',
  title: 'CREATIVE STRATEGIST • DIGITAL MARKETER',
  role: 'Creative Strategist & Digital Marketer',
  tagline: 'Designing bold strategies and visuals for growing brands.',
  editorialCopy: 'I am a highly creative digital marketing student with a passion for brand strategy. I combine my visual skills in Canva with smart AI tools to build engaging campaigns, design local marketing materials, and explore fresh growth strategies for modern brands.'
};
