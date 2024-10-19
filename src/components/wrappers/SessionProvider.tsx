"use client";

import { Session } from "@/db/schemas/sessionTable";
import { User } from "@/db/schemas/userTable";
import React, { createContext, useContext } from "react";

interface SessionContext {
  user: User | null;
  session: Session | null;
}

export const sessionContext = createContext<SessionContext | null>(null);

export default function SessionProvider({
  children,
  value,
}: React.PropsWithChildren<{ value: SessionContext }>) {
  return (
    <sessionContext.Provider value={value}>{children}</sessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(sessionContext);
  if (!context) {
    throw new Error("useSession must be used inside of a session provider");
  }
  return context;
}
