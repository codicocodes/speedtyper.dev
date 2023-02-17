import { RadioGroup, Switch } from "@headlessui/react";
import React, { Fragment } from "react";
import { InfoIcon } from "../../../assets/icons/InfoIcon";
import { KogWheel } from "../../../assets/icons/KogWheel";
import { BattleMatcherContainer } from "../../../common/components/BattleMatcher";
import Button from "../../../common/components/Button";
import { Overlay } from "../../../common/components/Overlay";
import { useIsOwner } from "../state/game-store";
import {
  closeSettingsModal,
  openSettingsModal,
  setCaretType,
  toggleRaceIsPublic,
  toggleSyntaxHighlightning,
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
  const isSyntaxHighlightingEnabled = useSettingsStore(
    (s) => s.syntaxHighlighting
  );
  const isRacePublic = useSettingsStore((s) => s.raceIsPublic);
  const isOwner = useIsOwner();
  return (
    <Overlay onOverlayClick={closeSettingsModal}>
      <div
        className="flex flex-col w-full bg-off-white text-dark-ocean p-5 rounded gap-4 w-full"
        style={{ fontFamily: "Fira Code" }}
      >
        <div className="flex flex-col gap-4 border border-faded-gray rounded-lg p-4">
          <div className="flex items-center">
            <button
              className="cursor-default w-4 h-auto mr-1"
              title="Personal settings are stored in your browser"
            >
              <InfoIcon />
            </button>
            <h2 className="text-xl tracking-wider">Personal Settings</h2>
          </div>
          <ToggleSelector
            title="syntax highlighting"
            description="Enable to use syntax highlighting"
            checked={isSyntaxHighlightingEnabled}
            toggleEnabled={toggleSyntaxHighlightning}
          />
          <CaretSelector />
        </div>
        <div className="flex flex-col gap-4 border border-faded-gray rounded-lg p-4">
          <div className="flex items-center">
            <button
              className="cursor-default w-4 h-auto mr-1"
              title="Only the race owner can update race settings"
            >
              <InfoIcon />
            </button>
            <h2 className="text-xl">Race settings</h2>{" "}
          </div>
          <ToggleSelector
            title="public race"
            description="Enable to let other players find and join your race"
            checked={isRacePublic}
            disabled={!isOwner}
            toggleEnabled={toggleRaceIsPublic}
          />
        </div>
        <div className="flex flex-col gap-4 border border-faded-gray rounded-lg p-4">
          <h2 className="text-xl mt-2">Join a public race</h2>
          <BattleMatcherContainer closeModal={closeSettingsModal} />
        </div>
      </div>
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
