import {
  ChartNoAxesColumnDecreasingIcon,
  ClapperboardIcon,
  CoinsIcon,
  FileTextIcon,
  GlobeIcon,
  HouseIcon,
  ImageIcon,
  ListMusicIcon,
  Mailbox,
  MegaphoneIcon,
  MountainIcon,
  UsersIcon,
} from 'lucide-react';
import { FaEarthAfrica, FaEarthAmericas, FaEarthEurope } from 'react-icons/fa6';
import type { Ad, TCategory, TFooterLink, TNavItem, TNewsLink } from '@/types';

export const topTextMessages = [
  {
    text: 'Hari amasiganwa ya magare ari kubera Kimironko ku mwaka wa 2025',
    link: 'https://hextaui.com',
    tooltipText: '🚴‍♀️ Info Tv 🚲',
  },
  {
    text: "Irushanwa ry'ikoranabuhanga rigiye kubera i Kigali mu kwezi kwa Nyakanga",
    link: 'https://techchallenge.rw',
    tooltipText: '💻 Tech Challenge 🌐',
  },
  {
    text: "Igitaramo cy'abahanzi kizabera BK Arena tariki 20 Kamena",
    link: 'https://bkarenalive.rw',
    tooltipText: '🎤 BK Arena 🎶',
  },
];
export const navItems: TNavItem[] = [
  {
    href: '/',
    label: 'Home',
    icon: HouseIcon,
  },
  {
    href: '/staff',
    label: 'Staffs',
    icon: UsersIcon,
  },
  {
    href: '/gallery',
    label: 'Gallery',
    icon: ImageIcon,
  },
  {
    href: '/tv',
    label: 'TV',
    icon: ClapperboardIcon,
  },
  {
    href: '/podcast',
    label: 'Podcast',
    icon: ListMusicIcon,
  },
  {
    href: '/ads',
    label: 'Ads',
    icon: MegaphoneIcon,
  },
  {
    href: '/#stock',
    label: 'Stock',
    icon: CoinsIcon,
  },
  {
    href: '/#contact',
    label: 'Contact Us',
    icon: Mailbox,
  },
];
export const newsLinks: TNewsLink[] = [
  {
    title: 'News',
    links: [
      {
        title: 'Breaking News',
        href: '/',
        icon: Mailbox,
        external: false,
      },
      {
        title: 'Latest News',
        href: '/',
        icon: FileTextIcon,
        external: false,
      },
      {
        title: 'Top Stories',
        href: '/',
        icon: ChartNoAxesColumnDecreasingIcon,
        external: false,
      },
      {
        title: 'Local News',
        href: '/',
        icon: GlobeIcon,
        external: false,
      },
    ],
  },
  {
    title: 'Region',
    links: [
      {
        title: 'Rwanda',
        href: '/',
        external: false,
        icon: MountainIcon,
      },
      {
        title: 'Africa',
        href: '/',
        external: false,
        icon: FaEarthAfrica,
      },
      {
        title: 'Usa',
        href: '/',
        external: false,
        icon: FaEarthAmericas,
      },
      {
        title: 'Europe',
        href: '/',
        external: false,
        icon: FaEarthEurope,
      },
    ],
  },
];
export const footerLinks: TFooterLink[] = [
  {
    title: 'Newsroom',
    links: [
      { name: 'Latest News', href: '/', external: false },
      { name: 'Top Stories', href: '/', external: false },
      { name: "Editor's Picks", href: '/', external: false },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/', external: false },
      { name: 'Careers', href: '/', external: false },
      { name: 'Press', href: '/', external: false },
      { name: 'Contact', href: '/', external: false },
    ],
  },
  {
    title: 'For Business',
    links: [
      { name: 'Advertise with Us', href: '/', external: false },
      { name: 'Media Kit', href: '/', external: false },
      { name: 'Partner with Us', href: '/', external: false },
    ],
  },
  {
    title: 'More',
    links: [
      { name: 'Newsletter', href: '/', external: false },
      { name: 'Mobile App', href: '/', external: false },
      { name: 'RSS Feeds', href: '/', external: false },
      { name: 'Help Center', href: '/', external: false },
    ],
  },
  {
    title: 'Terms & Policies',
    links: [
      { name: 'Terms of Use', href: '/', external: false },
      { name: 'Privacy Policy', href: '/', external: false },
      { name: 'Cookie Policy', href: '/', external: false },
      { name: 'Editorial Policy', href: '/', external: false },
    ],
  },
  {
    title: 'Safety',
    links: [
      { name: 'Fact-Checking', href: '/', external: false },
      { name: 'Corrections', href: '/', external: false },
      { name: 'Trust & Transparency', href: '/', external: false },
    ],
  },
  {
    title: 'Follow Us',
    links: [
      { name: 'Facebook', href: '/', external: true },
      { name: 'Twitter', href: '/', external: true },
      { name: 'Instagram', href: '/', external: true },
      { name: 'YouTube', href: '/', external: true },
    ],
  },
  {
    title: 'Sections',
    links: [
      { name: 'Politics', href: '/', external: false },
      { name: 'Business', href: '/', external: false },
      { name: 'Technology', href: '/', external: false },
      { name: 'Health', href: '/', external: false },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Media Resources', href: '/', external: false },
      { name: 'Author Guidelines', href: '/', external: false },
      { name: 'News Archive', href: '/', external: false },
    ],
  },
  {
    title: 'Community',
    links: [
      { name: 'Events', href: '/', external: false },
      { name: 'Reader Stories', href: '/', external: false },
      { name: 'Submit News', href: '/', external: false },
    ],
  },
];

export const allCategories: TCategory[] = [
  { title: 'All' },
  { title: 'Politics' },
  { title: 'Business' },
  { title: 'Technology' },
  { title: 'Sport' },
  { title: 'Entertainment' },
  { title: 'Health' },
  { title: 'Science' },
  { title: 'World' },
  { title: 'Education' },
  { title: 'Environment' },
  { title: 'Lifestyle' },
  { title: 'Travel' },
  { title: 'Crime' },
  { title: 'Opinion' },
  { title: 'Culture' },
];

export const ads: Ad[] = [
  {
    companyName: 'Buy Today',
    cover:
      'https://3u39ha98bi.ufs.sh/f/CoX6DXpfh7iaAI5pJzLrjsXEGDV842Knqk6bzweC5RxlNHTi',
    coverType: 'img',
    createdAt: '2025-05-29T08:45:00Z',
    link: '',
  },
  {
    companyName: 'Rathon dev',
    cover:
      'https://3u39ha98bi.ufs.sh/f/CoX6DXpfh7iaeec9V8ALRBu7tpC64bnzmT8iQrcyOvla19hH',
    coverType: 'vid',
    createdAt: '2025-06-03T14:20:00Z',
    link: 'https://rathon.vercel.app',
  },
  {
    companyName: 'Ship faster',
    cover:
      'https://3u39ha98bi.ufs.sh/f/CoX6DXpfh7iaHdM2PCgJkUs3OlGdqPaneRDCiyFv4rjLMW2S',
    coverType: 'img',
    createdAt: '2025-06-01T10:30:00Z',
    link: '',
  },
  {
    companyName: 'BlackFriday',
    cover:
      'https://3u39ha98bi.ufs.sh/f/CoX6DXpfh7iabX6jwh1pPt62vRZzly7h0B9mCQxGfoijIeWK',
    coverType: 'vid',
    createdAt: '2025-06-05T16:00:00Z',
    link: '',
  },

  {
    companyName: 'New ads',
    cover:
      'https://3u39ha98bi.ufs.sh/f/CoX6DXpfh7iaTdv94HxmCU5rw2uxflT8PgYp9sXSVja3FLe4',
    coverType: 'img',
    createdAt: '2025-06-03T14:20:00Z',
    link: '',
  },
  {
    companyName: 'Claim your reward',
    cover:
      'https://3u39ha98bi.ufs.sh/f/CoX6DXpfh7iaHTfS5eCgJkUs3OlGdqPaneRDCiyFv4rjLMW2',
    coverType: 'img',
    createdAt: '2025-06-03T14:20:00Z',
    link: '',
  },
];

export const allAds = [
  {
    companyName: 'Buy Today',
    cover: '/ads/ads-a.jpg',
    coverType: 'img',
  },
  {
    companyName: 'Cars on Low Price',
    cover: '/ads/ads-b.jpg',
    coverType: 'img',
  },
  {
    companyName: 'The best offer',
    cover: '/ads/ads-c.jpg',
    coverType: 'img',
  },
];
