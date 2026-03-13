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
  outputFileTracing: false,
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = { type: "memory" }
    }
    return config
  },
  async redirects() {
    return [
      {
        source: "/projects/kittypaw",
        destination: "/projects/kittypau",
        permanent: true,
      },
    ]
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
