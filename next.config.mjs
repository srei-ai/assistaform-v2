/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "live.staticflickr.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "geograph.org.uk" },
      { protocol: "https", hostname: "www.geograph.org.uk" }
    ]
  }
};
export default nextConfig;
