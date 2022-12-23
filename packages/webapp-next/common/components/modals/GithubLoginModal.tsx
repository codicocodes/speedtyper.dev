import { useRouter } from "next/router";
import React from "react";
import { useGithubAuthFactory } from "../../api/auth";
import { useUserStore } from "../../state/user-store";
import { Avatar } from "../Avatar";
import { GithubLoginButton } from "../buttons/GithubLoginButton";
import { GithubLoginOverlay } from "../overlays/GithubLoginOverlay";

export const GithubLoginModal = () => {
  const router = useRouter();
  const [modalIsVisible, setShowModal] = React.useState(false);
  const closeModal = () => setShowModal(false);
  const showModal = () => setShowModal(true);
  const initGithubAuth = useGithubAuthFactory(router);
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
  const router = useRouter();
  const [modalIsVisible, setShowModal] = React.useState(false);
  const closeModal = () => setShowModal(false);
  const showModal = () => setShowModal(true);
  const initGithubAuth = useGithubAuthFactory(router);
  const user = useUserStore();
  return (
    <>
      <button onClick={showModal}>
        <Avatar url={user.avatarUrl} username={user.username} />
      </button>
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
