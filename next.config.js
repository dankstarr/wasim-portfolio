/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
}

module.exports = nextConfig
