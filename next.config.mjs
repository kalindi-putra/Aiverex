/** @type {import('next').NextConfig} */
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      
      remotePatterns: [
        {
          protocol: 'https', 
          hostname: 'aivirex.in',
          port: '', 
          pathname: '/assets/img/favicon/**', 
        },
        {
          protocol: 'https',
          hostname: 'sb-ui-kit-pro.startbootstrap.com',
          port: '',
          pathname: '/assets/img/illustrations/**',
        },
      ],
    },
  };
  

export default nextConfig;
