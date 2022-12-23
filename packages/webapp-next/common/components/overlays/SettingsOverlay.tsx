import { Overlay } from "../Overlay";

interface SettingsOverlayProps {
  closeModal: () => void;
}

export const SettingsOverlay: React.FC<SettingsOverlayProps> = ({
  closeModal,
}: SettingsOverlayProps) => {
  return (
    <>
      <Overlay onOverlayClick={closeModal}>
        <div className="lg:rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none w-full">
          <h1 className="text-2xl text-dark-ocean p-12">Settings</h1>
        </div>
      </Overlay>
    </>
  );
};
