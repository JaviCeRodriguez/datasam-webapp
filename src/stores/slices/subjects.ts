import { StoreApi } from "zustand";
import { RootStore } from "../root-store";

export type SubjectStatus =
  | "Por hacer"
  | "Cursando"
  | "Aprobado"
  | "Aprobado con Final";

type SubjectStatuses = {
  [code: string]: SubjectStatus;
};

export type SubjectsState = {
  subjectStatuses: SubjectStatuses;
  setSubjectStatuses: (code: string, estado: SubjectStatus) => void;
};

export const createSubjectsStore = (
  set: StoreApi<RootStore>["setState"],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _get: StoreApi<RootStore>["getState"],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ..._: StoreApi<RootStore>[]
) => ({
  subjectStatuses: {},
  setSubjectStatuses: (code: string, estado: SubjectStatus) =>
    set((state) => ({
      subjectStatuses: { ...state.subjectStatuses, [code]: estado },
    })),
});
