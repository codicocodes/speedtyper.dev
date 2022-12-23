import { Overlay } from "../Overlay";

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
        <div className="border-0 lg:rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex justify-center items-center p-5 rounded-t">
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={closeModal}
            >
              <span className="bg-transparent text-dark-ocean h-8 w-8 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <h3 className="text-dark-ocean flex-grow text-5xl tracking-wider font-light leading-normal flex justify-center">
            Welcome
          </h3>
          <p className="text-dark-ocean text-lg flex-grow tracking-widest font-light leading-normal flex justify-center p-10">
            Signup to SpeedTyper with your Github account to save your results
            and get on the toplist.
          </p>
          <div className="flex justify-center p-6 flex-auto">
            <button
              className={`flex bg-black justify-center py-4 m-2 px-10 text-off-white trailing-widest rounded-full text-lg outline-none border-none`}
              style={{
                outline: "none",
              }}
              onClick={initializeAuthentication}
            >
              Continue with Github
            </button>
          </div>
        </div>
      </Overlay>
    </>
  );
};
