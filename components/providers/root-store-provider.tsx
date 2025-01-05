"use client";

import React, { createContext, useContext } from "react";
import { useRootStore } from "@/store/root-store";

const RootStoreContext = createContext<ReturnType<typeof useRootStore> | null>(
  null
);

export const RootStoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const store = useRootStore();
  return <RootStoreContext value={store}>{children}</RootStoreContext>;
};

export const useRootStoreContext = () => {
  const context = useContext(RootStoreContext);
  if (!context) {
    throw new Error(
      "useRootStoreContext must be used within a RootStoreProvider"
    );
  }
  return context;
};
