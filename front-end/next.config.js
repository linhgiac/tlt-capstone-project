/** @type {import('next').NextConfig} */
const {i18n} = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['127.0.0.1'],
  },
  i18n
}

module.exports = nextConfig
