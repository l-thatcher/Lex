import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  async rewrites() {
    return [
      {
        source: '/videos/:path*',
        destination: 'http://localhost:8080/videos/:path*', // Assuming Nginx is running on port 8080
      },
    ]
  },
}


export default nextConfig;
