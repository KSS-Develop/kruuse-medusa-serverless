import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "@medusajs/product",
    "@medusajs/cart",
    "@medusajs/customer",
    "@medusajs/auth",
    "@medusajs/order",
  ],
};

export default nextConfig;
