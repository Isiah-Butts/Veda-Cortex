import path from 'node:path'
import { fileURLToPath } from 'node:url'

/** Project folder (this file lives at repo root). Stops Turbopack from picking a parent folder when another package-lock.json exists higher up. */
const projectRoot = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: projectRoot,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
