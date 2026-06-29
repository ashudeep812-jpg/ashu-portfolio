const luxCampaign = '/src/assets/images/lux_campaign_1782106529363.jpg';
const creativeConcept = '/src/assets/images/creative_concept_1782106541878.jpg';
const cinematicConcept = '/src/assets/images/cinematic_concept_1782106555605.jpg';
import { PortfolioProject } from '../types';

export const JULIAN_AVATAR_PATH = '/src/assets/images/arshdeep_avatar_custom_1782230112940.jpg';

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'campaign-01',
    title: 'THE SILENT LUXURY INSIGHT',
    category: 'Brand Strategy & Digital Activation',
    imageUrl: luxCampaign,
    aspect: '3:4',
    offsetClass: 'md:pt-0 pb-12',
    description: 'An immersive digital narrative built for a heritage high-fashion brand, replacing traditional commercial templates with interactive visual storytelling that captured a 140% surge in qualitative, high-intent client leads.',
    year: '2026',
    metrics: [
      '+140% Qualified Leads',
      '8.2 min Average Session Dur.',
      '3.8M Narrative Impressions'
    ],
    link: '#campaign-silent'
  },
  {
    id: 'campaign-02',
    title: 'ARCHITECTURAL CONSCIOUSNESS',
    category: 'Creative Direction & Data Architecture',
    imageUrl: creativeConcept,
    aspect: '4:3',
    offsetClass: 'md:pt-24 md:pl-8 pb-12',
    description: 'A conceptual framework mapping complex marketing data pipelines onto responsive, physical-looking 3D digital artifacts that turned a standard analytics suite into an inspired, interactive marketing board game.',
    year: '2025',
    metrics: [
      '96% Interactive Engagement',
      'Redefined Brand Positioning',
      'Featured on Editorial News'
    ],
    link: '#campaign-architectural'
  },
  {
    id: 'campaign-03',
    title: 'CINEMATIC TIMELESSNESS',
    category: 'Media Production & Visual PR',
    imageUrl: cinematicConcept,
    aspect: '16:9',
    offsetClass: 'md:pt-12 pb-16 col-span-2 max-w-4xl mx-auto',
    description: 'A multi-channel cinematic film release and interactive PR campaign representing the convergence of fine art, digital marketing, and luxury digital media. The video tells the story of an modern designer exploring empty spaces.',
    year: '2026',
    metrics: [
      '12.5M Cross-Platform Views',
      '+45% Brand Recall Delta',
      'Golden Lion Shortlist, 2026'
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
  title: 'DIGITAL CONTENT ARCHITECT',
  role: 'Expert Digital Content Architect & Visual Storyteller',
  tagline: 'Where Digital Strategy Meets Visual Storytelling.',
  editorialCopy: 'Crafting high-impact, data-backed digital marketing strategies and memorable brand identities. This platform serves as a fluid living space curated for experts, founders, and digital strategists looking to discover forward-thinking ideas, visual frameworks, and detailed strategy execution.'
};
