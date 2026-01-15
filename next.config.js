/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Set basePath if deploying to GitHub Pages with a repository name
  // For username.github.io, leave basePath empty or undefined
  // For username.github.io/repo-name, set basePath to '/repo-name'
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  transpilePackages: ['three'],
  images: {
    unoptimized: true,
    domains: ['avatars.githubusercontent.com'],
  },
  // Performance optimizations
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // Optimize production builds
  productionBrowserSourceMaps: false,
  // Optimize bundle size
  experimental: {
    optimizePackageImports: ['framer-motion', '@react-three/fiber', '@react-three/drei'],
  },
  // Webpack optimizations
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Optimize chunk splitting
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunk for large libraries
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /node_modules/,
              priority: 20,
            },
            // Separate chunk for Three.js
            three: {
              name: 'three',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
              priority: 30,
            },
            // Separate chunk for Framer Motion
            framer: {
              name: 'framer',
              chunks: 'all',
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              priority: 30,
            },
          },
        },
      }
    }
    return config
  },
}

module.exports = nextConfig
