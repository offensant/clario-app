/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/clario-app',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
