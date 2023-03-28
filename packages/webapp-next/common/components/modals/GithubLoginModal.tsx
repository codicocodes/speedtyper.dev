import { faCalendarCheck, faCheckCircle, faCheckDouble, faCheckToSlot, faCircleCheck, faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React from "react";
import {
  closeModals,
  openProfileModal,
  useSettingsStore,
} from "../../../modules/play2/state/settings-store";
import { useGithubAuthFactory } from "../../api/auth";
import { useUserStore } from "../../state/user-store";
import {
  getExperimentalServerUrl,
  getServerUrl,
} from "../../utils/getServerUrl";
import { Avatar } from "../Avatar";
import { GithubLoginButton } from "../buttons/GithubLoginButton";
import { GithubLoginOverlay } from "../overlays/GithubLoginOverlay";
import { ProfileModal } from "./ProfileModal";

export const GithubLoginModal = () => {
  const router = useRouter();
  const [modalIsVisible, setShowModal] = React.useState(false);
  const closeModal = () => setShowModal(false);
  const showModal = () => setShowModal(true);
  const serverUrl = getServerUrl();
  const initGithubAuth = useGithubAuthFactory(router, serverUrl);
  return (
    <>
      <GithubLoginButton showModal={showModal} />
      {modalIsVisible ? (
        <>
          <GithubLoginOverlay
            closeModal={closeModal}
            initializeAuthentication={initGithubAuth}
          />
        </>
      ) : null}
    </>
  );
};

export const NewGithubLoginModal = () => {
  const user = useUserStore();
  const router = useRouter();
  const serverUrl = getExperimentalServerUrl();
  const profileModalIsOpen = useSettingsStore((s) => s.profileModalIsOpen);
  const initGithubAuth = useGithubAuthFactory(router, serverUrl + "/api");
  return (
    <>
      <div className="flex items-center gap-2">
        <button onClick={openProfileModal}>
          <Avatar avatarUrl={user.avatarUrl} username={user.username} />
        </button>
        <div className="flex items-center gap-1 text-orange-500">
          <div className="h-4 w-4">
            <FontAwesomeIcon icon={faFire} />
          </div>
          <span className="text-tighter text-xl font-semibold">4</span>
        </div>
      </div>
      {profileModalIsOpen ? (
        <>
          {user.isAnonymous ? (
            <GithubLoginOverlay
              closeModal={closeModals}
              initializeAuthentication={initGithubAuth}
            />
          ) : (
            <ProfileModal closeModal={closeModals} />
          )}
        </>
      ) : null}
    </>
  );
};
