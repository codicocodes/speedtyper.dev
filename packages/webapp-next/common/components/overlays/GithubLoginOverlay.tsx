import { Overlay } from "../Overlay";
import ModalCloseButton from "../buttons/ModalCloseButton";
import GithubModal from "../modals/GithubModal";
import { GithubLoginButton } from "../buttons/GithubLoginButton";
import { closeModals } from "../../../modules/play2/state/settings-store";

interface GithubLoginOverlayProps {
  closeModal: () => void;
  initializeAuthentication: () => void;
}

export const GithubLoginOverlay: React.FC<GithubLoginOverlayProps> = ({
  closeModal,
  initializeAuthentication,
}: GithubLoginOverlayProps) => {
  return (
    <>
      <Overlay onOverlayClick={closeModal}>
        <GithubModal>
          <div className="flex justify-center items-center p-5 rounded-t">
            <ModalCloseButton onButtonClickHandler={closeModals} />
          </div>
          <h3 className="text-dark-ocean flex-grow text-5xl tracking-wider font-thin flex justify-center">
            Welcome
          </h3>
          <p className="text-dark-ocean text-lg flex-grow tracking-widest font-thin flex justify-center p-10">
            Signup to SpeedTyper with your Github account to save your results
            and get on the toplist.
          </p>
          <div className="flex justify-center mb-6 flex-auto">
            <GithubLoginButton showModal={initializeAuthentication} />
          </div>
        </GithubModal>
      </Overlay>
    </>
  );
};
