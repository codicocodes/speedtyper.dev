/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  publicRuntimeConfig: {
    isProduction: process.env.NODE_ENV === "production",
    title: "speedtyper.dev | Typing Practice For Programmers | Typing races",
    description:
      "speedtyper.dev is a typing application for programmers. Battle against other developers by typing challenges from real open source projects as fast as possible. Practice your typing to become a faster and more accurate programmer by practicing typing actual code sequences and symbols that are hard to find on the keyboard.",
    lastBuilt: Date.now(),
    siteRoot:
      process.env.NODE_ENV === "production"
        ? "https://speedtyper.dev"
        : "http://localhost:3001",
    serverUrl:
      process.env.NODE_ENV === "production"
        ? "https://v2.speedtyper.dev"
        : "http://localhost:5001",
    experimentalServerUrl:
      process.env.NODE_ENV === "production"
        ? "https://v3.speedtyper.dev"
        : "http://localhost:1337",
  },
  webpack: (config, options) => {
    // WAV file
    config.module.rules.push({
      test: /\.(wav)$/,
      use: {
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          publicPath: "/_next/static/sounds/",
          outputPath: `${options.isServer ? "../" : ""}static/sounds/`,
        },
      },
    });

    return config;
  }
};

module.exports = nextConfig;
