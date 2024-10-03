import { readFileSync } from 'fs';
import { join } from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... your existing config
  env: {
    ELEVENLABS_API_KEY: process.env.ELEVENLABS_API_KEY,
  },
};

// Check if we're in development mode
if (process.env.NODE_ENV === 'development') {
  try {
    nextConfig.server = {
      // This will allow both HTTP and HTTPS
      http: {},
      https: {
        key: readFileSync(join(process.cwd(), 'certificates', 'localhost-key.pem')),
        cert: readFileSync(join(process.cwd(), 'certificates', 'localhost.pem')),
      },
    };
  } catch (error) {
    console.warn('HTTPS certificate not found. Running in HTTP mode only.');
    nextConfig.server = {
      http: {},
    };
  }
}

export default nextConfig;
