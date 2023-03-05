import { ReactNode } from "react";

interface GithubModalProps {
  children: ReactNode;
}

export default function GithubModal({ children }: GithubModalProps) {
  return (
    <div className="max-w-[800px] border-0 lg:rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
      {children}
    </div>
  );
}
