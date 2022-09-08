import { useEffect } from "react";
import { IAction, IChallenge, IUserGameState } from "../types/";

export default (
  dispatch: React.Dispatch<IAction>,
  selectedUserState: IUserGameState,
  challenge: IChallenge
) => {
  const isCompleted =
    selectedUserState &&
    challenge &&
    selectedUserState?.input === challenge?.strippedCode;

  useEffect(() => {
    if (isCompleted) {
      dispatch({
        type: "challenge_completed",
        payload: { endTime: new Date().getTime() },
      });
    }
  }, [isCompleted]);

  return isCompleted;
};
