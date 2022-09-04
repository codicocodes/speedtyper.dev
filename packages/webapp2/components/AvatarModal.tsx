import React from "react";
import Switch from "react-switch";
import { IUser } from "../../types/";

import ky from "ky-universal";
import { useAppContext } from "../AppContext";
import { useRouter } from "next/router";

const AvatarModal = ({ user, logout }: { user: IUser; logout: () => void }) => {
  const { siteRoot, serverUrl } = process.env
  const router = useRouter()

  const { smoothCaret, toggleSmoothCaret } = useAppContext();

  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <span className="hidden sm:block mr-2 text-off-white text-lg">
        {user.username}
      </span>
      <img
        className="mx-2 order-0 hover:border-2 border-off-white cursor-pointer h-10 w-10 rounded-full"
        src={user.avatarUrl}
        alt=""
        onClick={() => setShowModal(true)}
      />
      {showModal ? (
        <>
          <div
            onClick={() => setShowModal(false)}
            className="lg:mt-16 lg:mr-40 lg:justify-end lg:items-start justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto">
              {/*content*/}

              <div className="cursor-pointer border-0 rounded relative flex flex-col w-full bg-white outline-none focus:outline-none shadow-xl">
                {/*body*/}
                <div className="relative flex-auto">
                  <div
                    className="flex justify-center p-2 px-8 trailing-widest border-b-2 border-gray-200"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <p className="pr-4">Smooth Caret</p>
                    <Switch
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      onChange={() => {
                        toggleSmoothCaret();
                      }}
                      checked={smoothCaret}
                    />
                  </div>
                  <button
                    className="flex justify-center p-2 px-8 trailing-widest"
                    onClick={async (e) => {
                      e.stopPropagation();
                      ky.delete(`${serverUrl}/auth`, {
                        credentials: "include",
                      }).then(() => {
                        logout();
                        router.push(siteRoot ?? "");
                      });
                    }}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="opacity-0 fixed inset-0 z-40 bg-black lg:bg-transparent"
            onClick={() => setShowModal(false)}
          ></div>
        </>
      ) : null}
    </>
  );
};

export default AvatarModal;
