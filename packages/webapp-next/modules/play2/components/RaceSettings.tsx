import { RadioGroup, Switch } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { KogWheel } from "../../../assets/icons/KogWheel";
import Button from "../../../common/components/Button";
import { Overlay } from "../../../common/components/Overlay";
import {
  closeSettingsModal,
  openSettingsModal,
  setCaretType,
  useSettingsStore,
} from "../state/settings-store";

export const RaceSettings: React.FC = () => {
  const isOpen = useSettingsStore((s) => s.settingsModalIsOpen);
  return (
    <>
      <Button
        onClick={openSettingsModal}
        color="invisible"
        leftIcon={
          <div className="h-5 w-auto">
            <KogWheel />
          </div>
        }
      />
      {isOpen && <RaceSettingsModal />}
    </>
  );
};

export const RaceSettingsModal: React.FC = () => {
  return (
    <Overlay onOverlayClick={closeSettingsModal}>
      <div
        className="flex flex-col w-full bg-off-white text-dark-ocean p-5 rounded gap-4 w-full"
        style={{ fontFamily: "Fira Code" }}
      >
        <h2 className="flex items-center justify-center text-lg font-bold tracking-widest">
          settings
        </h2>
        <ToggleSelector
          title="public race"
          description="Enable to let other players find and join your race"
          enabled={false}
          toggleEnabled={() => {}}
        />
        <ToggleSelector
          title="syntax highlighting"
          description="Enable to use syntax highlighting"
          enabled={false}
          toggleEnabled={() => {}}
        />
        <CaretSelector />
      </div>
    </Overlay>
  );
};

export const CaretSelector = () => {
  const isSmoothCaret = useSettingsStore((s) => s.smoothCaret);
  const selectedCaretType = isSmoothCaret ? "smooth" : "block";
  return (
    <RadioGroup value={selectedCaretType} onChange={setCaretType}>
      <RadioGroup.Label className="text-xs ml-4 font-semibold uppercase tracking-widest">
        Caret style
      </RadioGroup.Label>
      <div className="flex w-full font-bold tracking-widest">
        <RadioGroup.Option
          className="w-full mx-2 cursor-pointer"
          value="smooth"
        >
          {({ checked }) => (
            <div
              className={`flex items-center h-full w-full p-3 m-1 rounded-lg ${
                checked ? "bg-purple-200" : "bg-gray-200"
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
        <RadioGroup.Option className="w-full mx-2 cursor-pointer" value="block">
          {({ checked }) => (
            <div
              className={`flex items-center h-full w-full p-3 m-1 rounded-lg ${
                checked ? "bg-purple-200" : "bg-gray-200"
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
  enabled: boolean;
  toggleEnabled: () => void;
}

export const ToggleSelector: React.FC<ToggleSelectorProps> = ({
  // enabled,
  // toggleEnabled,
  title,
  description,
}) => {
  // temporary
  const [enabled, toggleEnabled] = useState(false);
  return (
    <>
      <div className="pt-1 pb-4 rounded-lg border-gray-200">
        <Switch checked={enabled} onChange={toggleEnabled} as={Fragment}>
          {({ checked }) => (
            /* Use the `checked` state to conditionally style the button. */
            <div className="flex items-center mt-2 mx-4">
              <button
                className={`${
                  checked ? "bg-purple-300" : "bg-faded-gray"
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Enable notifications</span>
                <span
                  className={`${
                    checked ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </button>
              <div className="flex justify-between items-center w-full ml-4">
                <span className="text-sm font-semibold uppercase tracking-widest">
                  {title}
                </span>
                <span className="w-auto tracking-wider font-thin text-sm ml-8">
                  {description}
                </span>
              </div>
            </div>
          )}
        </Switch>
      </div>
    </>
  );
};
