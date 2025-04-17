/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'vipwpimpqsjvphmterde.supabase.co', // your Supabase project URL
            pathname: '/storage/v1/object/sign/**',
          },
        ],
      },
};

export default nextConfig;

  