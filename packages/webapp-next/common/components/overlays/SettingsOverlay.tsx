import { InfoIcon } from "../../../assets/icons/InfoIcon";
import Modal from "../modals/Modal";
import { closeModals } from "../../../modules/play2/state/settings-store";
import ModalCloseButton from "../buttons/ModalCloseButton";
import {
  CaretSelector,
  ToggleSelector,
} from "../../../modules/play2/components/RaceSettings";
import {
  toggleDefaultRaceIsPublic,
  toggleSyntaxHighlightning,
  useSettingsStore,
} from "../../../modules/play2/state/settings-store";
import { Overlay } from "../Overlay";

interface SettingsOverlayProps {
  closeModal: () => void;
}

export const SettingsOverlay: React.FC<SettingsOverlayProps> = ({
  closeModal,
}: SettingsOverlayProps) => {
  const isSyntaxHighlightingEnabled = useSettingsStore(
    (s) => s.syntaxHighlighting
  );
  const isPublicRaceByDefault = useSettingsStore((s) => s.defaultIsPublic);
  return (
    <>
      <Overlay onOverlayClick={closeModal}>
        <Modal>
          <div className="flex items-center">
            <button
              className="cursor-default w-4 h-auto mr-1"
              title="Personal settings are stored in your browser"
            >
              <InfoIcon />
            </button>
            <h2 className="text-xl tracking-wider">Personal Settings</h2>
            <ModalCloseButton onButtonClickHandler={closeModals} />
          </div>
          <ToggleSelector
            title="syntax highlighting"
            description="Enable to use syntax highlighting"
            checked={isSyntaxHighlightingEnabled}
            toggleEnabled={toggleSyntaxHighlightning}
          />
          <ToggleSelector
            title="Public races"
            description="Races you start will be public by default"
            checked={isPublicRaceByDefault}
            toggleEnabled={toggleDefaultRaceIsPublic}
          />
          <CaretSelector />
        </Modal>
      </Overlay>
    </>
  );
};
