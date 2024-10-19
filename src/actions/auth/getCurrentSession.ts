import {
  SessionValidationResult,
  validateSessionToken,
} from "@/actions/auth/validateSessionToken";
import { cookies } from "next/headers";
import { cache } from "react";

export const getCurrentSession = cache(
  async (): Promise<SessionValidationResult> => {
    const token = cookies().get("session")?.value ?? null;
    if (token === null) {
      return { session: null, user: null };
    }
    const result = await validateSessionToken(token);
    return result;
  },
);
