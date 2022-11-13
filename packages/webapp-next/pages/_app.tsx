import "../styles/globals.css";
import "./../spinner.css";
import "./../progressbar.css";

import type { AppProps } from "next/app";
import { AppProvider } from "../AppContext";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import { Layout } from "../common/components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  const title = "SpeedTyper.dev | Typing practice for programmers";
  return (
    <div
      style={{
        height: "100vh",
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
      }}
    >
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="typing practice, coding speed, programming speed, code faster, speed coding, coding practice, coding tutor, programming tutor, coding games, learn programming, learn coding, typing tutor, typing competition for programmers, typing challenges for programmers, programming competitions, coding competitions, programming challenges, open source coding competitions"
        />
        <meta
          name="description"
          content="speedtyper.dev is a typing application for programmers. Battle against other developers by typing challenges from real open source projects as fast as possible. Practice your typing to become a faster and more accurate programmer by practicing typing actual code sequences and symbols that are hard to find on the keyboard."
        />
        <meta
          property="og:description"
          content="speedtyper.dev is a typing application for programmers. Battle against other developers by typing challenges from real open source projects as fast as possible. Practice your typing to become a faster and more accurate programmer by practicing typing actual code sequences and symbols that are hard to find on the keyboard."
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="1024" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://speedtyper.dev" />
        <link rel="icon" href="/favicon.ico" />
        <script
          defer
          data-domain="speedtyper.dev"
          src="https://plausible.io/js/plausible.js"
        ></script>
      </Head>
      <AppProvider>
        <NextNProgress
          options={{ showSpinner: false }}
          color="#d6bbfa"
          height={2}
        />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    </div>
  );
}

export default MyApp;
