import { useEffect } from "react";
import create from "zustand";

export interface UserState {
  id: string;
  username: string;
  avatarUrl: string;
  isAnonymous: boolean;
}

export const useUserStore = create<UserState>((_set, _get) => ({
  id: "",
  username: "",
  avatarUrl: "",
  isAnonymous: true,
}));

export const useInitializeUserStore = (user: UserState) => {
  useEffect(() => {
    useUserStore.setState((userStore) => ({
      ...userStore,
      ...user,
    }));
  }, [user]);
};
