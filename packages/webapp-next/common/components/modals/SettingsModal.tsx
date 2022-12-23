import React from "react";
import { KogWheel } from "../../../assets/icons/KogWheel";
import { SettingsOverlay } from "../overlays/SettingsOverlay";

export const SettingsModal = () => {
  const [modalIsVisible, setShowModal] = React.useState(false);
  const closeModal = () => setShowModal(false);
  const showModal = () => setShowModal(true);
  return (
    <>
      <button onClick={showModal}>
        <KogWheel />
      </button>
      {modalIsVisible ? (
        <>
          <SettingsOverlay closeModal={closeModal} />
        </>
      ) : null}
    </>
  );
};
