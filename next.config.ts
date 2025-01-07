import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.giphy.com/",
        port: "",
        pathname: "/media/*",
        search: "",
      }
    ]
  }
  /* config options here */
};

export default nextConfig;
