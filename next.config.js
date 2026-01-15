/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
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
