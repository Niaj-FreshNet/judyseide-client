module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // ⚠️ Only in dev, not recommended in prod
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nyc3.digitaloceanspaces.com',
        pathname: '**', // ✅ Correct wildcard pattern
      },
      {
        protocol: 'http',
        hostname: 'nyc3.digitaloceanspaces.com',
        pathname: '**', // ✅ Correct wildcard pattern
      },
      {
        protocol: 'https',
        // hostname: 'api.judy-seide.code-commando.com',
        hostname: 'api.belladorjewelry.com',
        pathname: '**',
      },
      {
        protocol: 'http',
        // hostname: 'api.judy-seide.code-commando.com',
        hostname: 'api.belladorjewelry.com',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '**', // ✅ You also need pathname here
      },
    ],
  },
};
