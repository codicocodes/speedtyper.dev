import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { AnimatePresence, motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {
  ResultsText,
  ShareResultButton,
} from "../../modules/play2/containers/ResultsContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { CodeArea } from "../../modules/play2/components/CodeArea";
import useSWR from "swr";
import { getExperimentalServerUrl } from "../../common/utils/getServerUrl";
import { useRouter } from "next/router";
import { cpmToWPM } from "../../common/utils/cpmToWPM";
import { toHumanReadableTime } from "../../common/utils/toHumanReadableTime";
import Image from "next/image";
import { format } from "date-fns";
import { ActionButton } from "../../modules/play2/components/play-footer/PlayFooter";
import { ChallengeSource } from "../../modules/play2/components/play-footer/ChallengeSource";
import { useInitializeUserStore } from "../../common/state/user-store";
import { fetchUser } from "../../common/api/user";
import Head from "next/head";

const baseURL = getExperimentalServerUrl();

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const user = await fetchUser(context);
    return {
      props: {
        user,
      },
    };
  } catch (err) {
    return {
      props: {
        user: null,
      },
    };
  }
};

function ResultPage({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useInitializeUserStore(user);
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useSWR(
    `${baseURL}/api/results/${id}`,
    (...args) => id && fetch(...args).then((res) => res.json())
  );
  const base = typeof window !== "undefined" ? window.location.origin : "";
  const url = `${base}/results/${id}`;

  const resultTitle = data?.user
    ? `${data.user.username} ${cpmToWPM(data.cpm)}wpm`
    : "Result";

  return (
    <>
      <Head>
        <title>{resultTitle}</title>
      </Head>
      <div className="flex flex-col items-center">
        {data?.user && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center gap-2"
            >
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    alt={`${data.user.username} profile picture`}
                    className="rounded-full"
                    width={50}
                    height={50}
                    src={data.user.avatarUrl}
                  />
                  <h1 className="text-lg font-semibold">
                    {data.user.username}
                  </h1>
                </div>
                <span className="text-sm font-light">
                  {format(new Date(data.createdAt), "yyyy-MM-dd HH:mm")}
                </span>
              </div>
              <div className="w-full grid grid-cols-2 sm:flex sm:flex-row sm:justify-center gap-2">
                <ResultsText
                  info="words per minute typed in race"
                  title="words per minute"
                  value={`${cpmToWPM(data.cpm)}`}
                />
                <ResultsText
                  info="Percentage of results on speedtyper.dev this race was faster than"
                  title="global rank"
                  value={`${data.percentile}%`}
                />
                <ResultsText
                  info="% correctly typed characters in race"
                  title="accuracy"
                  value={`${data.accuracy}%`}
                />
                <ResultsText
                  info="time it took to complete race"
                  title="time"
                  value={toHumanReadableTime(Math.floor(data.timeMS / 1000))}
                />
                <ResultsText
                  info="number of mistakes made during race"
                  title="mistakes"
                  value={data.mistakes.toString()}
                />
                <ShareResultButton url={url} />
              </div>
              <CodeArea
                staticHeigh={false}
                filePath={truncateFile(data.challenge.path)}
                focused={true}
              >
                <span className="text-xs sm:text-sm tracking-tight leading-1">
                  {data.challenge.content}
                </span>
              </CodeArea>
              <div className="w-full flex justify-between items-center">
                <ActionButton
                  text="play"
                  title="Start playing"
                  onClick={() => router.push("/")}
                  icon={
                    <div className="h-3 w-3 flex items-center">
                      <FontAwesomeIcon icon={faCode} />
                    </div>
                  }
                />
                <ChallengeSource
                  name={data.challenge.project.fullName}
                  url={data.challenge.url}
                  license={data.challenge.project.licenseName}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {!isLoading && !data.user && (
          <div className="text-4xl font-semibold">404 result not found</div>
        )}
        <ToastContainer />
      </div>
    </>
  );
}

function truncateFile(file: string) {
  const cutoff = 40;
  return file.length > cutoff + 3
    ? file.substring(0, cutoff).trim().concat("...")
    : file;
}

export default ResultPage;
