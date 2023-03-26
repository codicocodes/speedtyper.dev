import React from "react";
import Link from "next/link";
import { GithubLogo } from "../../../../../assets/icons";
import {
  closeModals,
  openProjectModal,
  useSettingsStore,
} from "../../../state/settings-store";
import { Overlay } from "../../../../../common/components/Overlay";
import ModalCloseButton from "../../../../../common/components/buttons/ModalCloseButton";

export interface ChallengeSourceProps {
  url: string;
  name: string;
  license: string;
}

export const ChallengeSource: React.FC<ChallengeSourceProps> = (props) => {
  const { name } = props;
  const isOpen = useSettingsStore((s) => s.projectModalIsOpen);
  return (
    <>
      <button onClick={openProjectModal}>
        <a target="_blank" className="flex items-center font-semibold text-sm hover:text-off-white">
          <div className="mr-1">
            <GithubLogo />
          </div>
          {name}
        </a>
      </button>
      {isOpen && (
        <Overlay onOverlayClick={closeModals}>
          <div
            className="flex flex-col bg-off-white text-dark-ocean p-5 rounded gap-2 w-full max-h-screen overflow-y-scroll gap-y-4 sm:min-w-[400px]"
            style={{ fontFamily: "Fira Code" }}
          >
            <div className="flex items-center justify-between">
              <div className="mr-2">
                <GithubLogo />
              </div>
              <h2 className="font-semibold tracking-wider text-xl">{name}</h2>
              <Link href={`https://github.com/${name}`}>
                <a target="_blank" className="mr-2">
                  <OutwardLinkIcon />
                </a>
              </Link>
              <ModalCloseButton onButtonClickHandler={closeModals} />
            </div>
            <div className="flex items-center">
              <h2 className="text-sm font-semibold mr-2">License:</h2>
              <h2 className="text-sm">{props.license}</h2>
            </div>

            <div className="flex items-center">
              <h2 className="text-sm tracking-wider font-semibold">
                Challenge source
              </h2>
              <Link href={props.url}>
                <a target="_blank" className="mr-2">
                  <OutwardLinkIcon />
                </a>
              </Link>
            </div>
            <div className="flex items-center">
              <div className="text-green-500">
                <svg
                  className="fill-current mr-2"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                  <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"></path>
                </svg>
              </div>
              <h2 className="text-sm tracking-wider font-semibold">
                Good first issues
              </h2>
              <Link
                href={`https://github.com/${name}/issues?q=is%3Aopen+label%3A%22good+first+issue%22%2C%22help+wanted%22+`}
              >
                <a target="_blank" className="mr-2">
                  <OutwardLinkIcon />
                </a>
              </Link>
            </div>
          </div>
        </Overlay>
      )}
    </>
  );
};

export const OutwardLinkIcon = () => {
  // SVG Below: Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className="ml-2 h-3"
    >
      <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
    </svg>
  );
};
