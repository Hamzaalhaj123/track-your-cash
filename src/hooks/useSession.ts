import { sessionContext } from "@/components/wrappers/SessionProvider";
import { useContext } from "react";

export function useSession() {
  const context = useContext(sessionContext);
  if (!context) {
    throw new Error("useSession must be used inside of a session provider");
  }
  return context;
}
