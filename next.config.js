/**
 * @type {import('next').NextConfig}
 */
 const nextConfig = {
    /* config options here */

    reactStrictMode: false,
    webpack5: false,
    webpack: (config) => {
      config.node = {
        dns: "mock",
        fs: "empty",
        path: true,
        url: false,
      };
      return config;
    },
    
  }
  
  module.exports = nextConfig