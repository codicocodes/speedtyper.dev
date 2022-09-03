import React, { useContext } from "react";
import { IUser } from "../types/";
import useUser from "./hooks/useUser";
import useSmoothCaret from "./hooks/useSmoothCaret";

const AppContext = React.createContext<Partial<AppContextProps>>({});

type AppContextProps = {
  user: IUser;
  logout: () => void;
  smoothCaret: boolean;
  toggleSmoothCaret: () => void;
};

const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const [user, logout] = useUser();
  const [smoothCaret, toggleSmoothCaret] = useSmoothCaret();

  const value = {
    user,
    logout,
    smoothCaret,
    toggleSmoothCaret,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppProvider, useAppContext };
