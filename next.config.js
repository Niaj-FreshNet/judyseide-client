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
        pathname: '',
      },
      {
        protocol: 'https',
        hostname: 'api.judy-seide.code-commando.com',
<<<<<<< HEAD
        pathname: '',
=======
        pathname: '**',
>>>>>>> 3c0c8e00d014459573e13f8e453d47e08037b280
      },
      {
        protocol: 'http', // Allow HTTP protocol for api.judy-seide.code-commando.com
        hostname: 'api.judy-seide.code-commando.com',
<<<<<<< HEAD
        pathname: '',
=======
        pathname: '**',
>>>>>>> 3c0c8e00d014459573e13f8e453d47e08037b280
      },
      {
        protocol: 'http', // Allow HTTP protocol for localhost
        hostname: 'localhost',
        port: '3000', // Specify the port your local server is running on
      },
<<<<<<< HEAD
    ],
  },
};
=======
    ],
  },
};
>>>>>>> 3c0c8e00d014459573e13f8e453d47e08037b280
