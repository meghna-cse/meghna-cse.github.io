/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    eslint: {
        ignoreDuringBuilds: true, // ESLint disabled during the build process
    },
};

export default nextConfig;
