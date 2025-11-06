// next.config.mjs
// @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'picsum.photos'],
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'images.unsplash.com' } // for Faker/Picsum images
      // { protocol: 'https', hostname: 'loremflickr.com' }, // add if you use LoremFlickr
    ]
  }
}

export default nextConfig
