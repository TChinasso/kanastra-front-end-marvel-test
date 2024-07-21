/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'pt-BR'], // List of supported locales
    defaultLocale: 'en', // Default locale
    localeDetection: true, // Enable automatic locale detection
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/heroes',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'i.annihil.us',
        port: '',
        pathname: '/**'
      },
    ],
  },
};

export default nextConfig;
