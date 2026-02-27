/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: { allowedOrigins: ["casagiallorossa.it", "www.casagiallorossa.it", "casagiallorossa.com", "www.casagiallorossa.com"] }
  }
};

export default nextConfig;
