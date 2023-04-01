import { Overlay } from "../Overlay";
import ModalCloseButton from "../buttons/ModalCloseButton";
import GithubModal from "../modals/GithubModal";
import { GithubLoginButton } from "../buttons/GithubLoginButton";
import { useRouter } from "next/router";
import { getExperimentalServerUrl } from "../../utils/getServerUrl";
import { useGithubAuthFactory } from "../../api/auth";

interface GithubLoginOverlayProps {
  closeModal: () => void;
}

export const GithubLoginOverlay: React.FC<GithubLoginOverlayProps> = ({
  closeModal,
}: GithubLoginOverlayProps) => {
  const router = useRouter();
  const serverUrl = getExperimentalServerUrl();
  const initGithubAuth = useGithubAuthFactory(router, serverUrl + "/api");
  return (
    <>
      <Overlay onOverlayClick={closeModal}>
        <GithubModal>
          <div className="flex justify-center items-center p-5 rounded-t">
            <ModalCloseButton onButtonClickHandler={closeModal} />
          </div>
          <h3 className="text-dark-ocean flex-grow text-5xl tracking-wider font-thin flex justify-center">
            Welcome
          </h3>
          <p className="text-dark-ocean text-lg flex-grow tracking-widest font-thin flex justify-center p-10">
            Signup to SpeedTyper with your Github account to save your results
            and get on the toplist.
          </p>
          <div className="flex justify-center mb-6 flex-auto">
            <GithubLoginButton showModal={initGithubAuth} />
          </div>
        </GithubModal>
      </Overlay>
    </>
  );
};
