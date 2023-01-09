import { useEffect } from "react";
import create from "zustand";

export interface User {
  id: string;
  username: string;
  avatarUrl: string;
  isAnonymous: boolean;
}

export const useUserStore = create<User>((_set, _get) => ({
  id: "",
  username: "",
  avatarUrl: "",
  isAnonymous: true,
}));

export const useInitializeUserStore = (user: User) => {
  useEffect(() => {
    useUserStore.setState((userStore) => ({
      ...userStore,
      ...user,
    }));
  }, [user]);
};
