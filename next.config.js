// next.config.js

module.exports = {
  // Disable ESLint during builds (optional, only use if you're confident)
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Configure remote image sources for DigitalOcean Spaces
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nyc3.digitaloceanspaces.com',
        pathname: '**',
      },
    ],
  },
  
  // Enable Webpack 5 for better performance (optional, if not already enabled)
  future: {
    webpack5: true,
  },
};
