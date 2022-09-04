import React, { useRef, useReducer, useState } from "react";
import { ToastContainer  } from "react-toastify";
import CodeArea from "../components/CodeArea";
import CodeInput from "../components/CodeInput";
import ChallengeInfo from "../components/ChallengeInfo";
import Timer from "../components/Timer";
import ProgressBar from "../components/ProgressBar";
import TypingBlocker from "../components/TypingBlocker";
import ErrorBox from "../components/ErrorBox";
import useLoadingFailed from "../hooks/useLoadingFailed";
import useConnectionFailed from "../hooks/useConnectionFailed";
import RaceResultsContainer from "../components/RaceResults";
import WaitingForPlayers from "../components/WaitingForPlayers";
import gameStateReducer, {
  defaultGameState,
} from "../reducers/gameStateReducer";
import { IGameState } from "../types";
import useSocket from "../hooks/useSocket";
import MarketingBar from "../components/MarketingBar";
import RetryChallengeButton from "../components/ReloadChallengeButton";
import StartRaceButton from "../components/StartRaceButton";
import getSkippedMessage from "../utils/getSkippedMessage";
import useAnalytics from "../hooks/useAnalytics";
import Chart from "../components/Chart";
import Countdown from "../components/Countdown";
import useRaceCompleted from "../hooks/useRaceCompleted";
import useToggleFocus from "../hooks/useToggleFocus";
import useQueryParams from "../hooks/useQueryParams";
import ShareRaceButton from "../components/ShareRaceButton";
import useTotalSeconds from "../hooks/useTotalSeconds";
import useBlockTyping from "../hooks/useBlockTyping";
import useWarnTyping from "../hooks/useWarnTyping";
import useTopResults from "../hooks/useTopResults";
import Leaderboard from "../components/Leaderboard";
import PingDiscordButton from "../components/PingDiscordButton";
import LanguageDropdown from "../components/LanguageDropdown";

const PlacementContainer = ({ gameState }: { gameState: IGameState }) => {
  return (
    <div
      className="flex flex-col mb-6 bg-dark-lake p-4 rounded"
      style={{ maxHeight: "300px", overflowY: "auto" }}
    >
      {Object.values(gameState.users)
        .sort(
          (a: any, b: any) =>
            b.gameStats?.progress ?? 0 - a.gameStats?.progress ?? 0
        )
        .map((userState: any, index: number) => {
          // todo this causes choppy progress bar due to fullCodeString and correctChars including indentation

          const me = userState.id === gameState.currentUserId;

          return (
            <ProgressBar
              name={userState?.user?.username ?? ""}
              me={me}
              placement={index + 1}
              key={index}
              progress={userState?.gameStats?.progress ?? 0}
            />
          );
        })}
    </div>
  );
};

const Play = () => {
  const [state, dispatch] = useReducer(gameStateReducer, defaultGameState);
  const selectedUserState = state?.users[state?.selectedUserId];
  const challenge = state?.challenge;
  const queryParams = useQueryParams();
  const { mode, id: gameId } = queryParams;
  const startTime = state.startTime;
  const endTime = selectedUserState?.endTime;
  const totalSeconds = useTotalSeconds(startTime, endTime);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [countdown, setCountdown] = useState(0);

  const socket = useSocket(
    dispatch,
    queryParams,
    selectedLanguage,
    setCountdown
  );

  const loadingFailed = useLoadingFailed(socket);
  const connectionFailed = useConnectionFailed(socket);
  const raceResults = useRaceCompleted(socket, challenge?._id ?? "");
  const topResults = useTopResults(challenge?._id ?? null);
  const isOwner = state.owner === state.currentUserId;
  const focusCodeArea = useToggleFocus();
  const countdownIsOver = !!startTime;

  useAnalytics(
    socket,
    challenge,
    selectedUserState?.renderedStrings?.correctChars ?? ""
  );

  const blockTyping = useBlockTyping(
    selectedUserState?.renderedStrings?.nextChar ?? "",
    selectedUserState?.renderedStrings?.wrongChars ?? "",
    endTime,
    startTime
  );

  const warnTyping = useWarnTyping(state.waiting, selectedUserState);

  const [inputIsSelected, setInputIsSelected] = useState(true);

  const [powerMode] = useState(false);

  const hasMistake =
    selectedUserState &&
    selectedUserState.input &&
    selectedUserState.input !==
      challenge?.strippedCode.substr(0, selectedUserState.input.length);

  const codeInputRef = useRef(null);

  const progress = Math.floor(
    ((selectedUserState?.renderedStrings?.correctChars?.length ?? 0) * 100) /
      (challenge?.fullCodeString?.length ?? 1)
  );

  const participantCount = Object.keys(
    state.users
  ).length

  // TODO: isOwner switching from true to false causes rerender of action buttons
  return (
    <>
      <div className="flex items-center justify-center mt-4">
        <div className="flex m-18 w-full max-w-5xl items-center justify-center flex-col">
          <div className="w-full hmax-w-5xl">
            <div className="flex w-full flex-wrap">
              {mode === "private" && isOwner && (
                <RetryChallengeButton
                  socket={socket}
                  isCompleted={!!endTime}
                  focusCodeArea={focusCodeArea}
                  language={selectedLanguage}
                  mode={mode}
                  gameId={gameId}
                  dispatch={dispatch}
                />
              )}
              {mode !== "private" && (
                <RetryChallengeButton
                  socket={socket}
                  isCompleted={!!endTime}
                  focusCodeArea={focusCodeArea}
                  language={selectedLanguage}
                  gameId={gameId}
                  mode={mode}
                  dispatch={dispatch}
                />
              )}
              {mode === "private" && isOwner && (
                <>
                  <StartRaceButton
                    socket={socket}
                    gameId={state.id}
                    countdown={countdown}
                    startTime={startTime}
                    focused={focusCodeArea}
                    loaded={state.loaded}
                  />
                  <div className="flex items-center text-off-white">
                    <LanguageDropdown
                      selectedLanguage={selectedLanguage}
                      setSelectedLanguage={setSelectedLanguage}
                    />
                  </div>
                </>
              )}
              {
                participantCount > 1 ? <div
                className={`flex text-off-white my-4 items-center py-2 px-4 ml-4 rounded shadow-2xl`}>
                {participantCount} participants
                </div>: null
              }
              <div className="flex flex-grow" />
              <ShareRaceButton gameId={state.id} />
              <PingDiscordButton gameId={state.id} />
            </div>
            <ErrorBox
              loadingFailed={loadingFailed}
              connectionFailed={connectionFailed}
              errorMessage={state.errorMessage}
            />
            <PlacementContainer gameState={state} />
            {state.waiting && !countdown ? (
              <WaitingForPlayers />
            ) : (
              <Timer
                progress={progress}
                combo={selectedUserState?.gameStats?.combo ?? 0}
                maxCombo={selectedUserState?.gameStats?.maxCombo ?? 0}
                totalSeconds={totalSeconds}
                trailingCpm={selectedUserState?.gameStats?.trailingCpm ?? 0}
                totalCpm={selectedUserState?.gameStats?.totalCpm ?? 0}
                mistakeCount={selectedUserState?.gameStats?.mistakeCount ?? 0}
                accuracy={selectedUserState?.gameStats?.accuracy ?? 0}
                isCompleted={!!endTime}
                dispatch={dispatch}
              />
            )}
            {!endTime && (
              <div
                className={`mt-2 pt-2 rounded bg-dark-lake ${
                  !inputIsSelected ? "outline-white" : ""
                }
                `}
              >
                {warnTyping && <TypingBlocker />}

                {
                  <div className="relative">
                    {!countdownIsOver && !!countdown && (
                      <Countdown countdown={countdown} />
                    )}

                    <CodeArea
                      skippedMessage={getSkippedMessage(challenge)}
                      correctChars={
                        selectedUserState?.renderedStrings?.correctChars ?? ""
                      }
                      wrongChars={
                        selectedUserState?.renderedStrings?.wrongChars ?? ""
                      }
                      indentation={
                        selectedUserState?.renderedStrings?.indentation ?? ""
                      }
                      nextChar={
                        selectedUserState?.renderedStrings?.nextChar ?? ""
                      }
                      untypedChars={
                        selectedUserState?.renderedStrings?.untypedChars ?? ""
                      }
                      codeInputRef={codeInputRef}
                      inputIsSelected={inputIsSelected}
                      powerMode={powerMode}
                      blockTyping={blockTyping}
                      language={challenge?.language}
                    />
                  </div>
                }

                {!endTime && (
                  <CodeInput
                    startTime={startTime}
                    isCompleted={!!endTime}
                    hasMistake={hasMistake}
                    input={selectedUserState?.input ?? ""}
                    dispatch={dispatch}
                    codeInputRef={codeInputRef}
                    setInputIsSelected={setInputIsSelected}
                    blockTyping={blockTyping}
                    socket={socket}
                  />
                )}
              </div>
            )}
          </div>
          {!!endTime && (
            <Chart cpmTimeSeries={selectedUserState?.cpmTimeSeries ?? []} />
          )}

          {!!endTime && raceResults.length > 0 && (
            <>
              <div className="max-w-5 xl w-full flex-grow bg-dark-lake shadow-2xl items-center mt-4 py-2 text-lg text-off-white font-light rounded">
                <RaceResultsContainer results={raceResults} />
              </div>
              {topResults.length > 0 && (
                <div className="max-w-5 xl w-full flex-grow bg-dark-lake shadow-2xl items-center mt-4 py-2 text-lg text-off-white font-light rounded">
                  <Leaderboard results={topResults} />
                </div>
              )}
            </>
          )}
          <MarketingBar />
          <div className="flex w-full">
            <div className="flex flex-grow" />
            <ChallengeInfo challenge={challenge} />
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </>
  );
};

export default Play;
