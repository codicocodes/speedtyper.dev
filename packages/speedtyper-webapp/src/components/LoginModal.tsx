import React from "react";
import { useSiteData } from "react-static";
import { navigate } from "@reach/router";

export default () => {
  const [showModal, setShowModal] = React.useState(false);
  const { siteRoot, serverUrl } = useSiteData();

  return (
    <>
      <button
        type="button"
        style={{ transition: "all .15s ease" }}
        onClick={() => setShowModal(true)}
        className="hidden sm:flex hover:bg-gray-100 bg-off-white shadow rounded items-center px-2 lg:px-4 py-1 mx-2 lg:mx-2 text-base border-gray-200 border"
      >
        <svg height="16" width="16" className="fill-current mr-2">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
        </svg>
        Sign up | Login
      </button>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 lg:rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex justify-center items-center p-5 rounded-t">
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-8 w-8 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <h3 className="text-black-ocean flex-grow text-5xl tracking-wider font-light leading-normal flex justify-center">
                  Welcome
                </h3>
                <p className="text-black-ocean text-lg flex-grow tracking-widest font-light leading-normal flex justify-center p-10">
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
                      navigate(
                        `${serverUrl}/auth/github?currentUrl=${currentUrl}`
                      );
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
