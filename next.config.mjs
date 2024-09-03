/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'owcdn.net',
          port: '',
          pathname: '/img/**',
        },
        {
          protocol: 'https',
          hostname: 'i.imgur.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'vlr.gg',
          port: '',
          pathname: '/img/vlr/game/agents/**',
        }
      ],
    },
  };
  
  export default nextConfig;