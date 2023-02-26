import React from "react";
import { KogWheel } from "../../../assets/icons/KogWheel";
import {
  closeModals,
  openSettingsModal,
  useSettingsStore,
} from "../../../modules/play2/state/settings-store";
import Button from "../Button";
import { SettingsOverlay } from "../overlays/SettingsOverlay";

export const SettingsModal = () => {
  const isOpen = useSettingsStore((s) => s.settingsModalIsOpen);
  return (
    <div>
      <Button
        size="sm"
        onClick={openSettingsModal}
        color="invisible"
        leftIcon={
          <div className="h-4 w-auto">
            <KogWheel />
          </div>
        }
      />
      {isOpen ? (
        <>
          <SettingsOverlay closeModal={closeModals} />
        </>
      ) : null}
    </div>
  );
};
