import { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
}

export default function Modal({ children }: ModalProps) {
  return (
    <div className="max-h-screen">
      <div className="flex flex-col gap-4 bg-off-white rounded-lg text-dark-ocean p-4">
        {children}
      </div>
    </div>
  );
}
