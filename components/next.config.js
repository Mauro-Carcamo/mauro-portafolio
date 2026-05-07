/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Cachear imágenes optimizadas por 1 año (en segundos)
    minimumCacheTTL: 31536000,
    // Ajusta la calidad de las imágenes (por defecto es 75). Un valor de 60-70 suele ser un buen compromiso para móviles.
    quality: 70, 
    // Define los tamaños de dispositivo para generar imágenes responsivas.
    deviceSizes: [320, 640, 768, 1024, 1280, 1536], // Adaptado a tamaños comunes de móviles y tablets
    // Define los tamaños de imagen para generar imágenes responsivas.
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Tamaños pequeños para iconos y miniaturas
    // Prioriza formatos de imagen modernos como WebP y AVIF para mejor compresión.
    formats: ['image/webp', 'image/avif'],
  },
};

module.exports = nextConfig;