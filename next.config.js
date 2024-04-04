/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bmeqkx4gjezfj8mi.public.blob.vercel-storage.com',
      },
    ],
  },
};

module.exports = nextConfig;
