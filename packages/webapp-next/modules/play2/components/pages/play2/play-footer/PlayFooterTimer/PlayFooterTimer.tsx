/*
| Filename : PlayFooterTimer.tsx
| Author : Calixte DE TOURRIS (Discord: Ovoda#3529)
*/

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toHumanReadableTime } from "../../../../../../../common/utils/toHumanReadableTime";

/*
|--------------------------------------------------------------------------
| Contracts
|--------------------------------------------------------------------------
*/
export interface PlayFooterTimerProps {
  seconds: number;
}

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/
export const PlayFooterTimer: React.FC<PlayFooterTimerProps> = (props) => {
  const { seconds } = props;

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
        <div className="relative">
          <div className="absolute text-3xl ml-4 font-bold text-purple-300">
            {toHumanReadableTime(seconds)}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
