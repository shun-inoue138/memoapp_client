import create from "zustand";

type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

type UserStoreType = {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  resetCurrentUser: () => void;
};

const useUserStore = create<UserStoreType>((set) => ({
  currentUser: {
    id: 0,
    username: "",
    email: "",
    password: "",
  },
  setCurrentUser: (user) => {
    set(() => ({ currentUser: user }));
  },
  resetCurrentUser: () => {
    set(() => ({
      currentUser: { id: 0, username: "", email: "", password: "" },
    }));
  },
}));

export default useUserStore;
