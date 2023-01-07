import { useRouter } from "next/router";
import React from "react";
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
  const [modalIsVisible, setShowModal] = React.useState(false);
  const closeModal = () => setShowModal(false);
  const showModal = () => {
    setShowModal(true);
  };
  const serverUrl = getExperimentalServerUrl();
  const initGithubAuth = useGithubAuthFactory(router, serverUrl + "/api");
  return (
    <>
      <button onClick={showModal}>
        <Avatar avatarUrl={user.avatarUrl} username={user.username} />
      </button>
      {modalIsVisible ? (
        <>
          {user.isAnonymous ? (
            <GithubLoginOverlay
              closeModal={closeModal}
              initializeAuthentication={initGithubAuth}
            />
          ) : (
            <ProfileModal closeModal={closeModal} />
          )}
        </>
      ) : null}
    </>
  );
};
