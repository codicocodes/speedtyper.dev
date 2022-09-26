import getConfig from "next/config";
import { useRouter } from "next/router";
import React from "react";
import Button from "./Button";
import { GithubLogo } from "../assets/icons";

const LoginModal = () => {
  const [showModal, setShowModal] = React.useState(false);
  const { publicRuntimeConfig: { serverUrl, siteRoot } } = getConfig()
  const router = useRouter()
  
  return (
    <>
      <Button
        color="primary"
        size="sm"
        leftIcon={<GithubLogo />}
        onClick={() => setShowModal(true)}
        title="Login"
        text="Sign up | Login"
      />

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => setShowModal(false)}
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="border-0 lg:rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex justify-center items-center p-5 rounded-t">
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
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
                  Signup to SpeedTyper with your Github account to save your
                  results and get on the toplist.
                </p>
                <div className="flex justify-center p-6 flex-auto">
                  <button
                    className={`flex bg-black justify-center py-4 m-2 px-10 text-off-white trailing-widest rounded-full text-lg outline-none border-none`}
                    style={{
                      outline: "none",
                    }}
                    onClick={() => {
                      let currentUrl = siteRoot;
                      if (document !== undefined) {
                        currentUrl = window.location.href;
                      }
                      if (serverUrl){
                        router.push(
                          `${serverUrl}/auth/github?currentUrl=${currentUrl}`
                        );
                      } else {
                        throw new Error("Server URL is not defined.")
                      }
                    }}
                  >
                    Continue with Github
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default LoginModal;
