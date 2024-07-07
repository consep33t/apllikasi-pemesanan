/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

export default nextConfig;
