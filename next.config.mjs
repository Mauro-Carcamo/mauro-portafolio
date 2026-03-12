/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    if (process.env.VERCEL) return []
    return [
      {
        source: '/shiny-app',
        destination: 'http://127.0.0.1:8000',
      },
    ]
  },
}

export default nextConfig
