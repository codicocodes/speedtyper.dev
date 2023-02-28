import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { fetchUser } from "../../common/api/user";
import { useInitializeUserStore } from "../../common/state/user-store";
import { ResultsInfo } from "../../modules/play2/containers/ResultsContainer";
import { useGameStore } from "../../modules/play2/state/game-store";
import { useEffect } from "react";
import Image from "next/image";
import { ActionButton } from "../../modules/play2/components/play-footer/PlayFooter";
import { ReloadIcon } from "../../assets/icons/ReloadIcon";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const user = await fetchUser(context);
    const result = {
      cpm: 400,
      timeMS: 23000,
      mistakes: 0,
      accuracy: 100,
      id: "asdfasdfasdfasdf",
      raceId: "asdfasdf",
      createdAt: new Date().toString(),
      user,
      userId: "asdf",
    };
    return {
      props: {
        user,
        result,
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

function ResultsPage({
  user,
  result,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useInitializeUserStore(user);
  useEffect(() => {
    useGameStore.setState((s) => ({
      ...s,
      myResult: result,
    }));
  }, [result]);
  return (
    <div className="flex flex-col items-center">
      <div className="bg-dark-lake p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Image
              className="rounded-full"
              height={50}
              width={50}
              src={result.user.avatarUrl}
            />
            <h1 className="ml-4 text-xl font-bold">{result.user.username}</h1>
          </div>
          <div className="flex gap-2">
            <ActionButton
              text="play"
              title="Start playing"
              onClick={() => console.log("lmao")}
              icon={
                <div className="h-3 w-3">
                  <ReloadIcon />
                </div>
              }
            />
          </div>
        </div>
        <div>
          <ResultsInfo />
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;
