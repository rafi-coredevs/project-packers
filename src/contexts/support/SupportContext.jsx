import  { createContext, useContext } from "react";
import useSupport from "../../Util/useSupport";

const SupportContext = createContext();

export function useSupportContext() {
  return useContext(SupportContext);
}

export function SupportProvider({ children }) {
  const supportData = useSupport();
  return (
    <SupportContext.Provider value={supportData}>
      {children}
    </SupportContext.Provider>
  );
}
export const useSupportCtx = () => useContext(SupportContext)