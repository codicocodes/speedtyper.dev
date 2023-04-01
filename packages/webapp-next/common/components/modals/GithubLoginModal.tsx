import { useRouter } from "next/router";
import React from "react";
import {
  closeModals,
  openProfileModal,
  useSettingsStore,
} from "../../../modules/play2/state/settings-store";
import { useGithubAuthFactory } from "../../api/auth";
import { useUserStore } from "../../state/user-store";
import { getExperimentalServerUrl } from "../../utils/getServerUrl";
import { Avatar } from "../Avatar";
import { GithubLoginButton } from "../buttons/GithubLoginButton";
import { GithubLoginOverlay } from "../overlays/GithubLoginOverlay";
import { ProfileModal } from "./ProfileModal";

export const GithubLoginModal = () => {
  const [modalIsVisible, setShowModal] = React.useState(false);
  const closeModal = () => setShowModal(false);
  const showModal = () => setShowModal(true);
  return (
    <>
      <GithubLoginButton showModal={showModal} />
      {modalIsVisible ? (
        <>
          <GithubLoginOverlay closeModal={closeModal} />
        </>
      ) : null}
    </>
  );
};

export const NewGithubLoginModal = () => {
  const user = useUserStore();
  const profileModalIsOpen = useSettingsStore((s) => s.profileModalIsOpen);
  return (
    <>
      <button onClick={openProfileModal}>
        <Avatar avatarUrl={user.avatarUrl} username={user.username} />
      </button>
      {profileModalIsOpen ? (
        <>
          {user.isAnonymous ? (
            <GithubLoginOverlay closeModal={closeModals} />
          ) : (
            <ProfileModal closeModal={closeModals} />
          )}
        </>
      ) : null}
    </>
  );
};
