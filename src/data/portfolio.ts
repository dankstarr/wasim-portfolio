export const personalInfo = {
  name: 'Jashan Shetty',
  title: 'Frontend Engineer',
  email: 'jashanshetty1709@gmail.com',
  phone: '+91 9820769479',
  location: 'Bangalore, India',
  github: 'https://github.com/eth-jashan',
  linkedin: 'https://linkedin.com/in/jashanshetty',
  bio: 'Results-driven Full Stack Developer with 4 years of professional experience crafting robust web and mobile applications using React, React Native, and Node.js.',
  summary: [
    'Architecting and implementing scalable solutions that have improved application performance by 40%',
    'Leading the development of 5+ successful projects from concept to deployment in fast-paced startup environments',
    'Mentoring junior developers and driving the adoption of best practices, resulting in a 30% reduction in bug reports',
    'Collaborating cross-functionally to translate complex business requirements into user-centric features with 95% client satisfaction',
  ],
}

export const skills = {
  languages: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Python'],
  frameworks: ['React', 'React Native', 'Next.js', 'Node.js'],
  tools: ['GraphQL', 'WebSockets', 'Solidity', 'AWS', 'Git'],
  methodologies: ['CI/CD', 'Agile', 'TDD'],
  others: ['Blockchain', 'Analytics', 'Sentry'],
}

export const experience = [
  {
    title: 'Frontend Engineer',
    company: 'DeepReel',
    location: 'Remote',
    period: 'Jan 2025 - Present',
    description: 'Building AI-powered video solutions',
    highlights: [
      'Replaced legacy UI with a sleek, responsive React-based interface, improving user engagement and visual consistency',
      'Built granular event-tracking for video interactions, button clicks, and session flows, enabling actionable user behavior insights',
      'Created dashboards with heatmaps, funnel charts, and session flows, empowering stakeholders to make informed product decisions',
      'Collaborated with product, design, backend, and analytics teams to align UX enhancements with AI-powered video goals',
      'Pioneered AI-native development with Claude Code: Built the Remotion Genie Editor featuring SVG masking, dynamic captions, and timeline-based video composition',
    ],
    technologies: ['React', 'Next.js', 'Analytics', 'AWS', 'Node.js', 'Remotion', 'BAML'],
    link: 'https://www.deepreel.com/',
  },
  {
    title: 'Senior Front End Engineer',
    company: 'LXME',
    location: 'Mumbai, India',
    period: 'Jun 2024 - Jan 2025',
    description: 'Financial platform for women',
    highlights: [
      'Successfully upgraded React Native codebase from version 0.69 to 0.74, modernizing application architecture for 8,000+ daily active users',
      'Implemented Sentry for crash management, reducing crash rate from 6% to 1.25% and enhancing app stability',
      'Spearheaded \'Savings Challenge\', driving 30% of new SIP investments and contributing to business growth',
      'Improved app responsiveness by resolving performance bottlenecks',
    ],
    technologies: ['React Native', 'Sentry', 'TypeScript'],
    link: 'https://lxme.in',
  },
  {
    title: 'Tech Cofounder',
    company: 'Xade Finance',
    location: 'Remote',
    period: 'Jan 2024 - Dec 2025',
    description: 'Crypto trading platform',
    highlights: [
      'Spearheaded MVP development for a crypto trading app, securing $500K in product launch readiness',
      'Enabled seamless user interaction without managing private keys or gas fees',
      'Designed deposit and trading features for multi-blockchain networks',
      'Delivered Android and iOS apps with gas-less transaction models',
    ],
    technologies: ['React Native', 'Blockchain', 'WebSockets'],
    link: null,
  },
  {
    title: 'Core Software Engineer',
    company: 'Rep3',
    location: 'Bangalore, India',
    period: 'Jan 2022 - Jun 2024',
    description: 'Web3 community engagement platform',
    highlights: [
      'Contributed to the development of 5+ product offerings as a core developer',
      'Implemented robust CI/CD pipelines for seamless feature deployment',
      'Built a SaaS platform for compensating DAO contributors using cryptocurrency and NFTs',
      'Developed a versatile NPM package for integrating protocol mechanisms into JavaScript frameworks',
      'Achieved 250,000+ gas-less badges minted to incentivize crypto community engagement',
    ],
    technologies: ['Node.js', 'Solidity', 'CI/CD', 'JavaScript'],
    link: 'https://app.rep3.gg/',
  },
  {
    title: 'React Native Engineer',
    company: 'CryptoXpress',
    location: 'Bangalore, India',
    period: 'Sep 2021 - Jan 2022',
    description: 'Cryptocurrency wallet and marketplace',
    highlights: [
      'Designed secure in-app lock screens for a cryptocurrency wallet',
      'Developed a platform for real-time asset tracking and seamless minting',
      'Enhanced responsiveness by migrating to WebSocket for real-time data',
      'Enabled cryptocurrency payments for booking travel accommodations',
    ],
    technologies: ['React Native', 'WebSockets', 'Blockchain'],
    link: null,
  },
  {
    title: 'React Native Engineer',
    company: 'Lokal Kitchen',
    location: 'Mumbai, India',
    period: 'Mar 2021 - Sep 2021',
    description: 'Food delivery platform',
    highlights: [
      'Modernized a legacy web application, improving scalability and user experience',
      'Developed a dashboard for managing menus, operating hours, and service radius',
      'Built a customer-facing app with chef profiles and personalized recommendations',
      'Integrated Dunzo for seamless order delivery',
    ],
    technologies: ['React Native', 'Dunzo API'],
    link: null,
  },
]

export const projects = [
  {
    title: 'Jaarx',
    description: 'Comprehensive restaurant POS system for contactless ordering',
    highlights: [
      'Developed customer, admin, and waiter/staff apps for streamlined operations',
      'Implemented features like real-time order tracking and kitchen queue management',
      'Designed QR code technology to enable contactless menu browsing and order placement',
    ],
    period: 'Jul 2020 - Jan 2021',
    technologies: ['React Native', 'Node.js', 'Real-time Systems'],
    image: '/projects/jaarx.png',
    link: null,
  },
  {
    title: 'Sabkuch2Home',
    description: 'Rapid development of a hyperlocal grocery e-commerce platform during COVID-19 lockdown',
    highlights: [
      'Designed real-time inventory tracking and seamless checkout',
      'Delivered the project within a single day',
      'Built during COVID-19 lockdown, reaching around 3L-4L business at peak',
    ],
    period: 'Apr 2020 - Jun 2020',
    technologies: ['React', 'E-commerce', 'Real-time'],
    image: '/projects/sabkuch2home.png',
    link: null,
  },
]

export const achievements = [
  {
    title: 'Performance Optimization',
    value: '40%',
    description: 'Application performance improvement through scalable solutions',
    icon: 'performance',
  },
  {
    title: 'Client Satisfaction',
    value: '95%',
    description: 'Translating complex requirements into user-centric features',
    icon: 'satisfaction',
  },
  {
    title: 'Bug Reduction',
    value: '30%',
    description: 'Through mentorship and best practices adoption',
    icon: 'bug',
  },
  {
    title: 'Successful Projects',
    value: '5+',
    description: 'From concept to deployment in startup environments',
    icon: 'projects',
  },
  {
    title: 'Gas-less Badges',
    value: '250K+',
    description: 'Minted for crypto community engagement',
    icon: 'badge',
  },
  {
    title: 'Daily Active Users',
    value: '8K+',
    description: 'Serving users on LXME platform',
    icon: 'users',
  },
]

export const education = {
  degree: 'Computer Science Engineering',
  institution: 'Pillai College Of Engineering',
  location: 'Mumbai, India',
  year: '2017 - 2021',
}

export const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
]
