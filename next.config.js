module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,  // This will skip type checks during the build, but it’s not recommended in production
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nyc3.digitaloceanspaces.com',
        pathname: '**',
      },
    ],
    domains: ['localhost'],
  },
};
