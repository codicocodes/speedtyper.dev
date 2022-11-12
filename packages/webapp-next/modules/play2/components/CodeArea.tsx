import { ReactNode } from "react";

interface CodeAreaProps {
  language: string;
  filePath: string;
  focused: boolean;
  children: ReactNode;
}

export function CodeArea({
  language,
  filePath,
  focused,
  children,
}: CodeAreaProps) {
  return (
    <div
      className="bg-dark-lake text-faded-gray flex-shrink tracking-wider rounded-xl p-4 text-2xl w-full"
      style={{
        height: "420px",
        fontFamily: "Fira Code",
        fontWeight: "normal",
      }}
    >
      {!focused && (
        <div className="absolute flex justify-center items-center w-full h-full">
          Click or press any key to focus
        </div>
      )}

      <CodeAreaHeader filePath={filePath} />
      <pre className={focused ? "blur-none opacity-100" : "blur-sm opacity-40"}>
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
