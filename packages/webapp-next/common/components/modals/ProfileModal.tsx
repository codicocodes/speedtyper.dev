import Link from "next/link";
import { ReactNode } from "react";
import { ProfileIcon } from "../../../assets/icons";
import { KogWheel } from "../../../assets/icons/KogWheel";
import { logout } from "../../api/auth";
import { useUserStore } from "../../state/user-store";
import { Container } from "../Layout";

export interface ProfileModalProps {
  closeModal: () => void;
}
export function ProfileModal({ closeModal }: ProfileModalProps) {
  const user = useUserStore();
  return (
    <div>
      <div
        onClick={closeModal}
        className="lg:mt-16 lg:justify-end lg:items-start justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none text-dark-ocean"
      >
        <Container centered={false}>
          <div className="absolute top-0 right-0 bg-white w-36 rounded gap-8">
            <ProfileItem>
              <Link href={`/profile/${user.username}`}>Profile</Link>
            </ProfileItem>
            <ProfileItem>
              <Link href="/settings">Settings</Link>
            </ProfileItem>
            <ProfileItem onClick={logout}>Sign out</ProfileItem>
          </div>
        </Container>
      </div>
    </div>
  );
}

interface ProfileItemProps {
  onClick?: () => void;
  children: ReactNode;
}

export function ProfileItem({ children, onClick }: ProfileItemProps) {
  return (
    <div onClick={onClick} className="hover:text-purple-700 w-full ml-4 flex items-center text-lg justify-start cursor-pointer border-0 rounded bg-100 outline-none focus:outline-none">
      {children}
    </div>
  );
}
