import { ReactNode } from "react";
import Countdown from "../../../components/Countdown";
import { useGameStore } from "../state/game-store";

interface CodeAreaProps {
  filePath: string;
  focused: boolean;
  children: ReactNode;
  staticHeigh: boolean;
}

export function CodeArea({
  filePath,
  focused,
  children,
  staticHeigh = true,
}: CodeAreaProps) {
  const countDown = useGameStore((state) => state.countdown);
  return (
    <div
      className={`${
        staticHeigh ? "flex flex-col w-full" : ""
      } bg-dark-lake text-faded-gray flex-shrink tracking-tight sm:tracking-wider rounded-xl p-4 text-xs sm:text-2xl w-full`}
      style={{
        fontFamily: "Fira Code",
        fontWeight: "normal",
      }}
    >
      {!focused && (
        <div className="absolute flex justify-center items-center w-full h-full">
          Click or press any key to focus
        </div>
      )}
      {countDown && (
        <div className="absolute flex justify-center items-center w-full h-full">
          <Countdown countdown={countDown} />
        </div>
      )}

      <CodeAreaHeader filePath={filePath} />
      <pre className={focused ? "blur-none opacity-100" : "blur-sm opacity-40"}>
        <code>{children}</code>
      </pre>
    </div>
  );
}

function CodeAreaHeader({ filePath }: { filePath: string }) {
  return (
    <div className="flex items-center flex-row mb-4 w-full">
      <div className="flex flex-row gap-2 mr-2 relative">
        <div className="w-2.5 h-2.5 bg-slate-600 rounded-full" />
        <div className="w-2.5 h-2.5 bg-slate-600 rounded-full" />
        <div className="w-2.5 h-2.5 bg-slate-600 rounded-full" />
      </div>
      <div className="flex items-start justify-center flex-row w-full h-6 pr-12">
        <span className="hidden sm:block italic text-base opacity-80 truncate">
          {filePath}
        </span>
      </div>
    </div>
  );
}
