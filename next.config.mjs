/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["woodmart.b-cdn.net", "images.unsplash.com"],
  },
  reactStrictMode: false,
  api: {
    bodyParser: true,
  },
};

export default nextConfig;
