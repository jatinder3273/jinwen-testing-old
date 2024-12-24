import { create } from "zustand";

export const useStore = create((set) => ({
  // functions and values for states
  states: [],
  updateStates: (data) => set(() => ({ states: data })),

  // functions and values for investor type
  investor_types: [],
  updateInvestorTypes: (data) => set(() => ({ investor_types: data })),
}));
