/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Set to false to avoid double-rendering in development
  images: {
    domains: ['placehold.co', 'images.unsplash.com'],
  },
  // Use valid Next.js 15 options
  experimental: {
    scrollRestoration: true,
  },
  // Disable unnecessary features during development
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors for now
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors for now
  }
};

module.exports = nextConfig;
