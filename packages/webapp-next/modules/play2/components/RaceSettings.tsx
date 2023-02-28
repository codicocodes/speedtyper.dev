import { RadioGroup, Switch } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { Fragment } from "react";
import { OnlineIcon } from "../../../assets/icons/OnlineIcon";
import { Overlay } from "../../../common/components/Overlay";
import { useIsOwner } from "../state/game-store";
import {
  closeModals,
  openLanguageModal,
  setCaretType,
  useSettingsStore,
} from "../state/settings-store";
import { ActionButton } from "./play-footer/PlayFooter";
import { LanguageSelector } from "./race-settings/LanguageSelector";

export const RaceSettings: React.FC = () => {
  const isOpen = useSettingsStore((s) => s.languageModalIsOpen);
  const languageSelected = useSettingsStore((s) => s.languageSelected);
  const language = languageSelected ? languageSelected.name : "language";

  return (
    <>
      <ActionButton
        className="flex items-center w-auto min-w-8"
        onClick={openLanguageModal}
        color="invisible"
        icon={
          <div className="h-3">
            <OnlineIcon />
          </div>
        }
        text={language}
      />
      {isOpen && <RaceSettingsModal />}
    </>
  );
};

export const RaceSettingsModal: React.FC = () => {
  const isOwner = useIsOwner();
  return (
    <Overlay onOverlayClick={closeModals}>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col w-full text-dark-ocean p-5 rounded gap-4 w-full"
          style={{ fontFamily: "Fira Code" }}
        >
          <div className="flex flex-col gap-4 rounded-lg p-4 min-w-8">
            {isOwner && <LanguageSelector />}
          </div>
        </motion.div>
      </AnimatePresence>
    </Overlay>
  );
};

export const CaretSelector = () => {
  const isSmoothCaret = useSettingsStore((s) => s.smoothCaret);
  const selectedCaretType = isSmoothCaret ? "smooth" : "block";
  return (
    <RadioGroup value={selectedCaretType} onChange={setCaretType}>
      <RadioGroup.Label className="text-xs font-semibold uppercase tracking-widest">
        Caret style
      </RadioGroup.Label>
      <div className="flex w-full font-bold tracking-widest gap-1">
        <RadioGroup.Option className="w-full cursor-pointer" value="smooth">
          {({ checked }) => (
            <div
              className={`flex items-center h-full w-full p-3 rounded-lg ${
                checked
                  ? "bg-purple-200 hover:bg-purple-300"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <span
                className="flex flex-col h-full rounded-lg bg-gray-600 mr-4"
                style={{
                  width: "2px",
                }}
              />
              <span>Line (smooth)</span>
            </div>
          )}
        </RadioGroup.Option>
        <RadioGroup.Option className="w-full cursor-pointer" value="block">
          {({ checked }) => (
            <div
              className={`flex items-center h-full w-full p-3 rounded-lg ${
                checked
                  ? "bg-purple-200 hover:bg-purple-300"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <span className="flex flex-col h-full rounded-sm bg-gray-600 mr-4 w-3" />
              <span>Block</span>
            </div>
          )}
        </RadioGroup.Option>
      </div>
    </RadioGroup>
  );
};

interface ToggleSelectorProps {
  title: string;
  description: string;
  checked: boolean;
  toggleEnabled: () => void;
  disabled?: boolean;
}

export const ToggleSelector: React.FC<ToggleSelectorProps> = ({
  checked,
  disabled = false,
  toggleEnabled,
  title,
  description,
}) => {
  return (
    <>
      <div className="rounded-lg border-gray-200">
        <div className="flex items-center">
          <Switch checked={checked} onChange={toggleEnabled} as={Fragment}>
            {({ checked }) => (
              /* Use the `checked` state to conditionally style the button. */
              <button
                disabled={disabled}
                className={`${
                  disabled
                    ? "bg-gray-500"
                    : checked
                    ? "bg-purple-300"
                    : "bg-faded-gray"
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Enable notifications</span>
                <span
                  className={`${
                    checked ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </button>
            )}
          </Switch>
          <div className="flex justify-between items-center w-full ml-4">
            <span className="text-sm font-semibold uppercase tracking-widest">
              {title}
            </span>
            <span className="w-auto tracking-wider font-thin text-sm ml-8">
              {description}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
