/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ NUEVO: Configuración de dominios remotos permitidos para next/image
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      // Podés agregar otros dominios aquí en el futuro si tu agencia usa un CMS o AWS S3
    ],
  },
};

export default nextConfig;