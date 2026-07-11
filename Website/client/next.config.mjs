/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // Temporarily off — React Compiler was compounding portfolio card double-paint in Turbopack
  reactCompiler: false,
  async redirects() {
    return [
      {
        source: '/services/events-exhibition',
        destination: '/services/exhibition-management',
        permanent: true,
      },
      {
        source: '/services/mobile-app-development',
        destination: '/services/app-development',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'images.squarespace-cdn.com',
      },
    ],
  },
};

export default nextConfig;
