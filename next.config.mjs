/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'export',
    images: {
      unoptimized: true,
      domains: ['i.scdn.co'], // Allow Spotify album art images
    },
    eslint: {
      ignoreDuringBuilds: true,
    },  
  }
  
  export default nextConfig;