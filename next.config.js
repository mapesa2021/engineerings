/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for cPanel hosting
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'],
  },
}

module.exports = nextConfig
