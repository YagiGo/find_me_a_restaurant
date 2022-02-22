/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GOOGLE_MAP_API: process.env.GOOGLE_MAP_API || '',
    CENTER_LAT: process.env.CENTER_LAT || 0,
    CENTER_LNG: process.env.CENTER_LNG,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
