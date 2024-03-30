import "../styles/globals.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import { Layout } from "../common/components/Layout";
import { Stream } from "../components/Stream";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";
import { useIsPlaying } from "../common/hooks/useIsPlaying";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

function MyApp({ Component, pageProps }: AppProps) {
  const title = "SpeedTyper.dev | Typing practice for programmers";
  const isPlaying = useIsPlaying();
  const isPlayingCss = isPlaying ? "hidden" : "";
  return (
    <>
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
            async
            src="https://umami-production-7f33.up.railway.app/script.js"
            data-website-id="ed902c85-74a2-427f-a554-520fdf0925e5"
          ></script>
        </Head>
        <NextNProgress
          options={{ showSpinner: false }}
          color="#d6bbfa"
          height={2}
        />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Stream />
      </div>

      <div className="absolute bottom-0 flex w-full justify-center">
        <a
          data-umami-event="TikTok Banner - Click"
          href="https://www.tiktok.com/tag/speedtyperdev"
          target="_blank"
          className={`${isPlayingCss} mb-12 sm:mb-24 border border-gray-400 rounded-lg p-4 flex gap-2 items-center hover:border-purple-400 transition-all hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-fuchsia-700`}
          rel="noreferrer"
        >
          <FontAwesomeIcon
            className="w-5 text-lg text-white"
            icon={faTiktok as IconProp}
          />
          <span className="text-white">create & watch</span>
          <span className="md:font-semibold hidden sm:inline">
            #speedtyperdev
          </span>
          <span className="hidden sm:inline text-white">TikToks</span>
        </a>
      </div>
    </>
  );
}

export default MyApp;
