import { create } from "zustand";

const createStore = create((set) => ({
  adTheme: localStorage.getItem("adTheme") ?? "dark",
  user: JSON.parse(localStorage.getItem("user")),

  setAdTheme: (value) => set({ adTheme: value }),
  setCredentials: (user) => set({ user }),
  singOut: () => set({ user: null }),
}));

export default createStore;
