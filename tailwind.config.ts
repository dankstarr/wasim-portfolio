import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0a0a0a',
        secondary: '#1a1a1a',
        accent: '#6366f1',
        'accent-light': '#818cf8',
        'text-primary': '#fafafa',
        'text-secondary': '#d4d4d8', // Improved contrast: changed from #a1a1aa to #d4d4d8 (zinc-300) for better readability
        'text-tertiary': '#a1a1aa', // For less important text
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 8s ease infinite',
        'text-shimmer': 'text-shimmer 2.5s ease-out infinite alternate',
        'morph': 'morph 8s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'text-shimmer': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
        morph: {
          '0%': { borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40%/50% 60% 30% 60%' },
          '100%': { borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'noise': "url('/noise.png')",
      },
    },
  },
  plugins: [],
}
export default config
