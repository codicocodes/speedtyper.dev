import { useState } from "react";
import useSWR from "swr";
import { InfoIcon } from "../../assets/icons/InfoIcon";
import Modal from "./modals/Modal";
import { OnlineIcon } from "../../assets/icons/OnlineIcon";
import { UserGroupIcon } from "../../assets/icons/UserGroupIcon";
import { ToggleSelector } from "../../modules/play2/components/RaceSettings";
import { useGameStore, useIsOwner } from "../../modules/play2/state/game-store";
import {
  closeModals,
  openPublicRacesModal,
  toggleRaceIsPublic,
  useSettingsStore,
} from "../../modules/play2/state/settings-store";
import { ONLINE_COUNT_API } from "../api/races";
import { getExperimentalServerUrl } from "../utils/getServerUrl";
import { Overlay } from "./Overlay";
import ModalCloseButton from "./buttons/ModalCloseButton";

export const BattleMatcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <div className="flex items-center font-semibold text-sm ml-2">
      <button
        className="ml-2 flex items-center text-off-white h-5 px-1"
        onClick={openModal}
      >
        <OnlineIcon />
        <div className="flex h-full items-end">
          <div
            className="bg-green-300 rounded-full"
            style={{ width: "5px", height: "5px" }}
          />
        </div>
      </button>
      {isOpen && <BattleMatcherModal closeModal={closeModal} />}
    </div>
  );
};

interface BatteListItemProps {
  race: any;
  closeModal: () => void;
}

const BatteListItem: React.FC<BatteListItemProps> = ({ race, closeModal }) => {
  const { ownerName, memberCount } = race;
  const game = useGameStore((state) => state.game);
  const myRaceID = useGameStore((state) => state.id);
  const isMyRace = myRaceID === race.id;
  const joinRace = () => {
    // TODO: if no game -> we should forward to page with ?id=race.id
    closeModal();
    game?.join(race.id);
  };
  return (
    <button
      onClick={joinRace}
      disabled={isMyRace}
      className={`flex w-full items-center justify-between gap-2 text-base rounded-lg bg-gray-300 
      ${
        isMyRace
          ? "bg-gray-400 hover:cursor-not-allowed"
          : "hover:cursor-pointer hover:bg-gray-400"
      } p-2 px-4 my-1`}
    >
      <div className="flex">
        <div className="flex items-center bg-purple-300 px-2 rounded mr-2">
          <div className="h-3">
            <UserGroupIcon />
          </div>
          <span className="mx-2">{memberCount}</span>
        </div>
        <span>{ownerName}</span>
      </div>
      {!isMyRace ? (
        <svg className="fill-current h-4" viewBox="0 0 512 512">
          <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
        </svg>
      ) : null}
    </button>
  );
};

interface BattleMatcherModalProps {
  closeModal: () => void;
}

export const PlayingNow = () => {
  const { data } = useSWR(
    ONLINE_COUNT_API,
    (...args) => fetch(...args).then((res) => res.json()),
    { refreshInterval: 15000 }
  );
  const isPublic = useSettingsStore((s) => s.raceIsPublic);
  const isOpen = useSettingsStore((s) => s.publicRacesModalIsOpen);
  const isOwner = useIsOwner();
  return (
    <>
      <button
        className="font-semibold text-xs tracking-wide"
        onClick={openPublicRacesModal}
      >
        <div className="flex items-center px-1 rounded uppercase">
          <div className="flex text-dark-ocean items-center bg-gray-300 px-2 rounded">
            <div
              className={`mr-1 h-2 w-2 rounded-full 
      ${isPublic ? "bg-green-400" : "bg-gray-400"}`}
            />
            <div className="h-2 mr-1">
              <UserGroupIcon />
            </div>
            {data?.online ?? 0}
          </div>
        </div>
      </button>
      {isOpen && (
        <Overlay onOverlayClick={closeModals}>
          <Modal>
            <div className="flex items-center">
              <h2 className="text-xl mr-2">Public races</h2>
              <button
                className="cursor-default w-4 mr-1"
                title="You can configure your races to be public by default in your settings"
              >
                <InfoIcon />
              </button>
              <ModalCloseButton onButtonClickHandler={closeModals} />
            </div>
            <ToggleSelector
              title="public race"
              description="Enable to let other players find and join your race"
              checked={isPublic}
              disabled={!isOwner}
              toggleEnabled={toggleRaceIsPublic}
            />
            <BattleMatcherContainer closeModal={closeModals} />
          </Modal>
        </Overlay>
      )}
    </>
  );
};

const BattleMatcherModal = ({ closeModal }: BattleMatcherModalProps) => {
  return (
    <Overlay onOverlayClick={closeModal}>
      <BattleMatcherContainer closeModal={closeModal} />
    </Overlay>
  );
};

export const BattleMatcherContainer = ({
  closeModal,
}: {
  closeModal: () => void;
}) => {
  const baseUrl = getExperimentalServerUrl();
  const { data } = useSWR(
    `${baseUrl}/api/races`,
    (...args) => fetch(...args).then((res) => res.json()),
    { refreshInterval: 10000 }
  );

  const availableRaces = data;
  return (
    <div className="">
      {availableRaces && availableRaces.length > 0 && (
        <div className="">
          {availableRaces.map((race: any, i: number) => (
            <BatteListItem key={i} race={race} closeModal={closeModal} />
          ))}
        </div>
      )}
    </div>
  );
};
