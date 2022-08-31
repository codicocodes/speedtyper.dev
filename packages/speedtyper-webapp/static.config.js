import React from "react";
import path from "path";

export default {
  getSiteData: async () => ({
    title:
      "speedtyper.dev | Typing Practice For Programmers | Typing races",
    description:
      "speedtyper.dev is a typing application for programmers. Battle against other developers by typing challenges from real open source projects as fast as possible. Practice your typing to become a faster and more accurate programmer by practicing typing actual code sequences and symbols that are hard to find on the keyboard.",
    lastBuilt: Date.now(),
    siteRoot:
      process.env.NODE_ENV === "production"
        ? "https://speedtyper.dev"
        : "http://localhost:3001",
    serverUrl:
      process.env.NODE_ENV === "production"
        ? "https://api.speedtyper.dev"
        : "http://localhost:5001",
  }),

  Document: ({ Html, Head, Body, children, state }) => (
    <Html lang="en-US" className="h-full">
      <Head>
        <title>{state.siteData.title}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="typing practice, coding speed, programming speed, code faster, speed coding, coding practice, coding tutor, programming tutor, coding games, learn programming, learn coding, typing tutor, typing competition for programmers, typing challenges for programmers, programming competitions, coding competitions, programming challenges, open source coding competitions"
        />
        <meta name="description" content={state.siteData.description} />
        <meta
          property="og:image"
          content={`${state.siteData.siteRoot}/images/logo.png`}
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="1024" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={state.siteData.siteRoot} />
        <meta property="og:title" content={state.siteData.title} />
        <meta property="og:description" content={state.siteData.description} />
        <link rel="icon" href="../images/favicon.ico" />
       <script defer data-domain="speedtyper.dev" src="https://plausible.io/js/plausible.js"></script>
      </Head>
      <Body className="h-full w-full flex flex-col bg-dark-ocean">
        {children}
      </Body>
    </Html>
  ),
  entry: path.join(__dirname, "src", "index.tsx"),
  plugins: [
    "react-static-plugin-tailwindcss",
    ["react-static-plugin-typescript", { typeCheck: true }],
    [
      require.resolve("react-static-plugin-source-filesystem"),
      {
        location: path.resolve("./src/pages"),
      },
    ],
    require.resolve("react-static-plugin-reach-router"),
    require.resolve("react-static-plugin-sitemap"),
  ],
  devServer: {
    port: 3001,
    host: "127.0.0.1",
  },
};
