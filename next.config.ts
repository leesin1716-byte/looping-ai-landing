import type { NextConfig } from "next";

// Safe, broadly-compatible security headers. The site embeds no third-party
// iframes, so SAMEORIGIN framing and a locked-down Permissions-Policy are safe.
// (No CSP: the app relies on Next's inline bootstrap/JSON-LD scripts and a CDN
// font, so a strict policy would need nonces and risks breakage.)
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  // Force HTTPS for 2 years (also covers a future custom domain). vercel.app is
  // already HTTPS-only / HSTS-preloaded, so this is safe to assert.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Isolate the browsing context; the page opens no cross-origin popups.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  // Disable unused/privacy-sensitive features (incl. Topics API opt-out).
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
