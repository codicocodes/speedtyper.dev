import { ReactNode } from "react";

interface CodeAreaProps {
  language: string;
  filePath: string;
  children: ReactNode;
}

export function CodeArea({ language, filePath, children }: CodeAreaProps) {
  // TODO: css when unfocused: blur-sm opacity-40
  return (
    <div
      className={`flex-shrink tracking-wider rounded-xl p-4 text-2xl w-full`}
      style={{
        backgroundColor: "black",
        color: "rgb(184, 184, 184, 0.8)",
        height: "420px",
        // width: "960px",
        fontFamily: "Fira Code",
        fontWeight: "normal",
      }}
    >
      <CodeAreaHeader filePath={filePath} />
      <pre>
        <code className={`${language}`}>{children}</code>
      </pre>
    </div>
  );
}

function CodeAreaHeader({ filePath }: { filePath: string }) {
  return (
    <div className="flex items-center flex-row mb-4">
      <div className="flex flex-row gap-2 absolute">
        <div className="w-2.5 h-2.5 bg-slate-600 rounded-full" />
        <div className="w-2.5 h-2.5 bg-slate-600 rounded-full" />
        <div className="w-2.5 h-2.5 bg-slate-600 rounded-full" />
      </div>
      <div className="flex items-start justify-center flex-row w-full h-6">
        <span className="italic text-base opacity-80">{filePath}</span>
      </div>
    </div>
  );
}
