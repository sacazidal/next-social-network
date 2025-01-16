/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Все запросы, начинающиеся с /api
        destination:
          "https://pnbnwjpzuflgednrcyfl.supabase.co", // Перенаправление на Supabase
      },
    ];
  },
};

export default nextConfig;
