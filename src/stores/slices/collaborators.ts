import { StoreApi } from "zustand";
import { RootStore } from "../root-store";

type Collaborators = {
  id: string;
  name: string;
  role: string;
  profile: string | null;
  phrase: string;
};

export type CollaboratorsState = {
  collaborators: Collaborators[];
  revalidateDate: number | null;
  setCollaborators: (collaborators: Collaborators[]) => void;
  setRevalidateDate: (date: number | null) => void;
};

export const createCollaboratorsStore = (
  set: StoreApi<RootStore>["setState"],
  get: StoreApi<RootStore>["getState"],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ..._: StoreApi<RootStore>[]
) => ({
  collaborators: [],
  revalidateDate: null,
  setCollaborators: (collaborators: Collaborators[]) =>
    set((state) => ({ ...state, collaborators })),
  setRevalidateDate: (revalidateDate: number | null) =>
    set((state) => ({ ...state, revalidateDate })),
  isDateExpired: () => {
    const revalidateDate = get().revalidateDate;
    if (revalidateDate) {
      return new Date() > new Date(revalidateDate);
    }
    return true;
  },
});
