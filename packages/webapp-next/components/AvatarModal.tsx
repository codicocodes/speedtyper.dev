import React from "react";
import Switch from "react-switch";
import { IUser } from "../types/";

import ky from "ky-universal";
import { useAppContext } from "../AppContext";
import { useRouter } from "next/router";
import getConfig from "next/config";
import Image from "next/image";
import { Container } from "../common/components/Layout";

const AvatarModal = ({ user, logout }: { user: IUser; logout: () => void }) => {
  const {
    publicRuntimeConfig: { siteRoot, serverUrl },
  } = getConfig();
  const router = useRouter();

  const { smoothCaret, toggleSmoothCaret } = useAppContext();

  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <span className="hidden sm:block mr-2 text-off-white text-lg">
        {user.username}
      </span>
      <Image
        className="mx-2 order-0 hover:border-2 border-off-white cursor-pointer rounded-full"
        width="40px"
        height="40px"
        quality={100}
        src={user.avatarUrl || ""}
        alt={user.username}
        onClick={() => setShowModal(true)}
      />
      <div className="relative">
        {showModal ? (
          <div>
            <div
              onClick={() => setShowModal(false)}
              className="lg:mt-16 lg:justify-end lg:items-start justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none text-dark-ocean"
            >
              <Container centered={false}>
                {/*content*/}

                <div className="flex flex-row-reverse">
                  <div className="w-fit cursor-pointer border-0 rounded flex flex-col bg-white outline-none focus:outline-none shadow-xl">
                    {/*body*/}
                    <div>
                      <div
                        className="flex justify-start p-2 px-8 trailing-widest border-b-2 border-gray-200"
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
                            toggleSmoothCaret?.();
                          }}
                          checked={smoothCaret ?? false}
                        />
                      </div>
                      <button
                        className="flex items-center justify-start p-2 px-8 trailing-widest"
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
              </Container>
            </div>
            <div
              className="opacity-0 fixed inset-0 z-40 bg-black lg:bg-transparent"
              onClick={() => setShowModal(false)}
            ></div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default AvatarModal;
