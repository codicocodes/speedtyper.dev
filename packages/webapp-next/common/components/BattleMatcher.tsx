import { useState } from "react";
import useSWR from "swr";
import { BattleIcon } from "../../assets/icons/BattleIcon";
import { UserGroupIcon } from "../../assets/icons/UserGroupIcon";
import { useGameStore } from "../../modules/play2/state/game-store";
import { getExperimentalServerUrl } from "../utils/getServerUrl";
import { Overlay } from "./Overlay";

export const BattleMatcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <div className="flex items-center font-semibold text-sm ml-2">
      <button className="flex items-center" onClick={openModal}>
        <BattleIcon />
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
  const joinRace = () => {
    game?.join(race.id);
    closeModal();
  };
  return (
    <button
      onClick={joinRace}
      className="flex w-full items-center justify-between gap-2 text-base rounded-lg bg-gray-300 hover:bg-gray-400 hover:cursor-pointer p-2 px-4 my-1"
    >
      <div className="flex">
        <div className="flex items-center bg-purple-300 px-2 rounded mr-2">
          <UserGroupIcon /> <span className="mx-2">{memberCount}</span>
        </div>
        <span>{ownerName}</span>
      </div>
      <svg className="fill-current h-4" viewBox="0 0 512 512">
        <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
      </svg>
    </button>
  );
};

interface BattleMatcherModalProps {
  closeModal: () => void;
}

const BattleMatcherModal = ({ closeModal }: BattleMatcherModalProps) => {
  const raceID = useGameStore((state) => state.id);
  const baseUrl = getExperimentalServerUrl();
  const { data } = useSWR(
    `${baseUrl}/api/races`,
    (...args) => fetch(...args).then((res) => res.json()),
    { refreshInterval: 10000 }
  );
  return (
    <Overlay onOverlayClick={closeModal}>
      <div
        className="bg-off-white text-dark-ocean p-5 rounded gap-4"
        style={{
          width: "350px",
        }}
      >
        <h2 className="text-xl mb-4">Join a race</h2>
        {
          // TODO: Show a loading indicator when isLoading=true
        }
        {data &&
          data
            .filter((race: any) => race.id !== raceID)
            .map((race: any, i: number) => (
              <BatteListItem key={i} race={race} closeModal={closeModal} />
            ))}
      </div>
    </Overlay>
  );
};
