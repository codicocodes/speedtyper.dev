import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { CrownIcon } from "../../../../assets/icons/CrownIcon";
import Button from "../../../../common/components/Button";
import { Overlay } from "../../../../common/components/Overlay";
import {
  closeModals,
  openLeaderboardModal,
  useSettingsStore,
} from "../../state/settings-store";
import { Leaderboard } from "./Leaderboard";

export const LeaderboardButton: React.FC = () => {
  const isOpen = useSettingsStore((s) => s.leaderboardModalIsOpen);
  return (
    <>
      <Button
        size="sm"
        onClick={openLeaderboardModal}
        color="invisible"
        leftIcon={<CrownIcon />}
      />
      {isOpen && (
        <Overlay onOverlayClick={closeModals}>
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Leaderboard />
            </motion.div>
          </AnimatePresence>
        </Overlay>
      )}
    </>
  );
};
