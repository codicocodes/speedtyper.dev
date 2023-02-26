import { InfoIcon } from "../../../assets/icons/InfoIcon";
import {
  CaretSelector,
  ToggleSelector,
} from "../../../modules/play2/components/RaceSettings";
import {
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
  return (
    <>
      <Overlay onOverlayClick={closeModal}>
        <div className="flex flex-col gap-4 bg-off-white rounded-lg text-dark-ocean p-4">
          <div className="flex items-center">
            <button
              className="cursor-default w-4 h-auto mr-1"
              title="Personal settings are stored in your browser"
            >
              <InfoIcon />
            </button>
            <h2 className="text-xl tracking-wider">Personal Settings</h2>
          </div>
          <ToggleSelector
            title="syntax highlighting"
            description="Enable to use syntax highlighting"
            checked={isSyntaxHighlightingEnabled}
            toggleEnabled={toggleSyntaxHighlightning}
          />
          <CaretSelector />
        </div>
      </Overlay>
    </>
  );
};
