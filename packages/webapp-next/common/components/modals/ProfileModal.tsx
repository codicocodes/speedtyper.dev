import Image from "next/image";
import { ReactNode } from "react";
import { closeModals } from "../../../modules/play2/state/settings-store";
import { logout } from "../../api/auth";
import { useUserStore } from "../../state/user-store";
import { Overlay } from "../Overlay";

export interface ProfileModalProps {
  closeModal: () => void;
}

export function ProfileModal({ closeModal }: ProfileModalProps) {
  const user = useUserStore();
  return (
    <Overlay onOverlayClick={closeModal}>
      <div className="text-dark-ocean bg-off-white p-5 rounded">
        <div className="flex items-center">
          <Image
            alt="profile image"
            className="rounded-full"
            width="50"
            height="50"
            src={user.avatarUrl}
          />
          <span className="ml-4 text-lg tracking-wider">{user.username}</span>
        </div>
        <button
          onClick={() => logout().then(() => closeModals())}
          className="mt-4 p-2 rounded-full bg-dark-lake text-off-white text-lg font-bold tracking-wider w-full"
        >
          logout
        </button>
      </div>
    </Overlay>
  );
}

interface ProfileItemProps {
  onClick?: () => void;
  children: ReactNode;
}

export function ProfileItem({ children, onClick }: ProfileItemProps) {
  return (
    <div
      onClick={onClick}
      className="hover:text-purple-700 w-full ml-4 flex items-center text-lg justify-start cursor-pointer border-0 rounded bg-100 outline-none focus:outline-none"
    >
      {children}
    </div>
  );
}
