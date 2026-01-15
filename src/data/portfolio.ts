// Email template for collaboration/hiring inquiries
export const getEmailTemplate = () => {
  const subject = encodeURIComponent('Collaboration Opportunity - Web Developer Role')
  const body = encodeURIComponent(`Hi Wasim,

I came across your portfolio and I'm interested in discussing a potential collaboration or role opportunity.

About me/us:
[Your name/company]

Opportunity details:
[Brief description of the role/project]

Timeline:
[Expected start date or project timeline]

Best regards,
[Your name]`)
  return { subject, body }
}

// Helper function to get the full mailto URL with template
export const getMailtoUrl = (email: string) => {
  const { subject, body } = getEmailTemplate()
  return `mailto:${email}?subject=${subject}&body=${body}`
}

export const personalInfo = {
  name: 'Wasim Ekram',
  title: 'Web Developer & Full-Stack Engineer',
  email: 'wasimekram123@gmail.com',
  phone: '07424 219449',
  location: 'London, United Kingdom',
  github: 'https://github.com/wasimekram',
  linkedin: 'https://www.linkedin.com/in/wasimekram/',
  bio: 'Results-driven Web Developer with 7+ years of professional experience building full-stack and hybrid applications using React, Next.js, Flask, and Python.',
  summary: [
    'Delivered scalable backends, RESTful APIs, and GPT-powered applications including chatbots and automation tools',
    'Managed and optimised 250+ production websites, improving accessibility, performance, and compliance',
    'Reduced page load times by 60% using CDN/PXL image optimisation and modern frontend practices',
    'Led accessibility improvements, raising WCAG AA scores from 80% to 91%',
    'Strong experience with analytics, data pipelines, and AI-driven systems',
  ],
}

export const skills = {
  languages: ['HTML', 'CSS', 'JavaScript', 'Python'],
  frameworks: ['React', 'Next.js', 'Flask'],
  tools: ['TerminalFour', 'MongoDB', 'MySQL', 'AWS', 'Docker', 'Git', 'Google Analytics', 'Google Tag Manager', 'Silktide', 'Three.js'],
  methodologies: [],
  others: ['Accessibility (WCAG)'],
}

export const skillsWithLevels = [
  { name: 'React', level: 95 },
  { name: 'Next.js', level: 90 },
  { name: 'JavaScript', level: 95 },
  { name: 'HTML', level: 98 },
  { name: 'CSS', level: 95 },
  { name: 'Python', level: 85 },
  { name: 'Flask', level: 88 },
  { name: 'SQL', level: 80 },
  { name: 'Google Analytics', level: 92 },
  { name: 'TerminalFour', level: 90 },
  { name: 'AWS', level: 75 },
  { name: 'Docker', level: 72 },
  { name: 'Git', level: 90 },
  { name: 'Accessibility (WCAG)', level: 95 },
]

export const experience = [
  {
    title: 'Web Product Officer',
    company: 'Queen Mary University of London',
    location: 'London, United Kingdom',
    period: 'May 2022 – Present',
    description: 'Managed web support services and optimised 250+ production websites',
    highlights: [
      'Managed web support services handling 150+ tickets per month',
      'Delivered 30+ website launches, SSL upgrades, HTTPS migrations, and template transfers',
      'Maintained and optimised 250+ microsites ensuring accessibility, performance, and security compliance',
      'Reduced page load times by 60% and image payloads by 70%, cutting server usage from 3TB to 1TB/month',
      'Implemented search stemming to improve relevance and UX',
      'Led a large-scale accessibility project addressing 500k+ Silktide issues, resolving them sprint-by-sprint',
      'Consolidated 200+ Google Analytics properties into a single structured setup',
      'Built 40+ Looker Studio dashboards for analytics visibility',
      'Integrated Coursefinder and Springboard data into TerminalFour using event listeners',
      'Implemented GDPR compliance via Termly consent banners',
      'Optimised analytics, forms (100+ Jotforms), and tracking pipelines',
      'Saved significant costs by replacing hybrid analytics agencies and tooling',
    ],
    technologies: ['TerminalFour', 'JavaScript', 'Python', 'SQL', 'Looker Studio', 'Google Analytics', 'Silktide', 'CDN/PXL'],
    link: null,
  },
  {
    title: 'Web Developer',
    company: 'Pro Infotech',
    location: 'Mumbai, India',
    period: 'May 2020 – May 2021',
    description: 'Delivered e-commerce, landing, and portfolio websites for multiple clients',
    highlights: [
      'Delivered e-commerce, landing, and portfolio websites for multiple clients',
      'Built and deployed production projects including: anavrinstays.com, cartronics.co.in, jaarx.com, sabkuch2home.com',
      'Worked closely with senior developers on custom features and integrations',
    ],
    technologies: ['React', 'JavaScript', 'HTML', 'CSS', 'Flask', 'MySQL'],
    link: null,
  },
  {
    title: 'Web Developer Intern',
    company: 'Talview',
    location: 'Bangalore, India',
    period: 'Jan 2020 – May 2020',
    description: 'Built a Job Application Portal using Next.js and Semantic UI',
    highlights: [
      'Built a Job Application Portal using Next.js and Semantic UI',
      'Developed automated job and interview management workflows',
      'Implemented dashboard analytics to track user engagement',
    ],
    technologies: ['Next.js', 'Semantic UI', 'JavaScript'],
    link: null,
  },
  {
    title: 'Data Science Intern',
    company: 'National University of Singapore',
    location: 'Singapore',
    period: 'Jun 2019 – Jul 2019',
    description: 'Built a Keras-based cryptocurrency prediction model using Kafka, Spark, and Hadoop',
    highlights: [
      'Built a Keras-based cryptocurrency prediction model using Kafka, Spark, and Hadoop',
      'Developed real-time Twitter Sentiment Analysis pipelines',
      'Created data visualisation dashboards using Hive and Tableau',
    ],
    technologies: ['Python', 'Keras', 'Kafka', 'Spark', 'Hadoop', 'Hive', 'Tableau'],
    link: null,
  },
]

export const projects = [
  {
    title: 'Smart Contract Audit Bot',
    description: 'AI-powered Telegram bot for Ethereum smart contract security',
    highlights: [
      'Integrated GPT-4 for automated vulnerability detection',
      'Delivered AI-driven auditing for blockchain developers',
      'Reduced manual review time significantly',
    ],
    period: '2024',
    technologies: ['Python', 'GPT-4', 'Blockchain', 'Telegram API'],
    image: '/projects/smart-contract-bot.png',
    link: null,
  },
  {
    title: 'University Web Platforms (QMUL)',
    description: 'Enterprise-scale academic web ecosystem',
    highlights: [
      'Maintained and optimised 250+ websites',
      'Accessibility uplift from 80% → 91% AA',
      'Unified analytics across 200+ properties',
    ],
    period: '2022 - Present',
    technologies: ['TerminalFour', 'JavaScript', 'Analytics', 'Accessibility'],
    image: '/projects/qmul-platforms.png',
    link: null,
  },
  {
    title: 'Jaarx',
    description: 'Restaurant POS and contactless ordering system',
    highlights: [
      'Built customer, admin, and staff applications',
      'Implemented real-time order tracking and kitchen queues',
      'Designed QR-based contactless ordering',
    ],
    period: '2020 - 2021',
    technologies: ['React', 'Node.js', 'Real-time Systems'],
    image: '/projects/jaarx.png',
    link: null,
  },
  {
    title: 'Sabkuch2Home',
    description: 'Hyperlocal grocery platform built during COVID-19',
    highlights: [
      'Designed real-time inventory and checkout',
      'Delivered MVP in a single day',
      'Achieved ₹3–4L business at peak',
    ],
    period: '2020',
    technologies: ['React', 'E-commerce', 'Real-time'],
    image: '/projects/sabkuch2home.png',
    link: null,
  },
]

export const achievements = [
  {
    title: 'Years Experience',
    value: '7+',
    description: 'Professional web development experience',
    icon: 'performance',
  },
  {
    title: 'Performance Improvement',
    value: '60%',
    description: 'Through CDN, image optimisation, and frontend improvements',
    icon: 'performance',
  },
  {
    title: 'Websites Delivered',
    value: '30+',
    description: 'Website launches and migrations',
    icon: 'projects',
  },
  {
    title: 'Sites Maintained',
    value: '250+',
    description: 'Across enterprise and academic environments',
    icon: 'projects',
  },
  {
    title: 'Tickets / Month',
    value: '150+',
    description: 'Handled web support and production issues',
    icon: 'users',
  },
  {
    title: 'Cost Savings',
    value: '35k+',
    description: 'Through optimisation, tooling, and process improvements',
    icon: 'badge',
  },
]

export const education = {
  degree: '',
  institution: '',
  location: '',
  year: '',
}

export const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
]
