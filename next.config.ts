/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development
  reactStrictMode: true,
  
  // Image optimization configuration
  images: {
    domains: [
      'images.unsplash.com', // For placeholder images
      'crew-social-api-staging.onrender.com',
      // Add your production API domain here when ready
    ],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Enable SWC minification for better performance
  swcMinify: true,
  
  // Compress responses
  compress: true,
  
  // Path mapping for cleaner imports (already using @/)
  // This is likely already configured in tsconfig.json
  
  // Environment variables validation (optional)
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // Redirect root to dashboard or login
  async redirects() {
    return [
      // This is handled by your root page.tsx, so you may not need this
      // {
      //   source: '/',
      //   destination: '/login',
      //   permanent: false,
      // },
    ];
  },
};

module.exports = nextConfig;