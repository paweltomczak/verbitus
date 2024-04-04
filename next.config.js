/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['bmeqkx4gjezfj8mi.public.blob.vercel-storage.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bmeqkx4gjezfj8mi.public.blob.vercel-storage.com',
      },
    ],
  },
};

module.exports = nextConfig;
