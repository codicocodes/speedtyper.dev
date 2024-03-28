import { useEffect } from "react";
import create from "zustand";
import { fetchUser } from "../api/user";

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

export const useInitializeUserStore = (user: User | null) => {
  useEffect(() => {
    if (user) {
      useUserStore.setState((userStore) => ({
        ...userStore,
        ...user,
      }));
    }
  }, [user]);
};

export const updateUserInStore = async () => {
  const user = await fetchUser();
  useUserStore.setState((userStore) => ({
    ...userStore,
    ...user,
  }));
};
