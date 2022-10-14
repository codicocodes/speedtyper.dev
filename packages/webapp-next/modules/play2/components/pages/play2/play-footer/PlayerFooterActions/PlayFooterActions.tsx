/*
| Filename : PlayFooterActions.tsx
| Author : Calixte DE TOURRIS (Discord: Ovoda#3529)
*/

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../../../../../../../common/components/Button";
import { ReloadIcon } from "../../../../../../../assets/icons/ReloadIcon";
import { copyToClipboard } from "../../../../../../../common/utils/clipboard";
import { LinkIcon } from "../../../../../../../assets/icons/LinkIcon";

/*
|--------------------------------------------------------------------------
| Contracts
|--------------------------------------------------------------------------
*/
export interface PlayFooterActionsProps {
  nextChallenge: () => void;
}

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/
export const PlayFooterActions: React.FC<PlayFooterActionsProps> = (props) => {
  const { nextChallenge } = props;

  // Render
  //--------------------------------------------------------------------------
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <div className="relative text-faded-gray">
          <Button
            color="invisible"
            title="Reload the challenge"
            size="sm"
            onClick={nextChallenge}
            leftIcon={<ReloadIcon />}
          />
          <Button
            color="invisible"
            title="Invite your friends to race"
            size="sm"
            onClick={() => {
              copyToClipboard(window.location.href, "URL copied to clipboard");
            }}
            leftIcon={<LinkIcon />}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
