"use client";
import { useStore } from "@/store";
import { useEffect } from "react";

const AppWrapperClient = ({ children, data }) => {
  const storeData = useStore((state: any) => state);
  const { states, updateStates, investor_types, updateInvestorTypes } =
    storeData;

  useEffect(() => {
    if (!states.length) {
      updateStates(data?.states);
    }
    if (!investor_types.length) {
      updateInvestorTypes(data?.investorType);
    }
  }, []);

  return <>{children}</>;
};

export default AppWrapperClient;
