"use server";

import { deleteSessionTokenCookie } from "@/actions/auth/deleteSessionTokenCookie";
import { getCurrentSession } from "@/actions/auth/getCurrentSession";
import { invalidateSession } from "@/actions/auth/invalidateSession";
import { redirect } from "next/navigation";


export async function logout() {
  const { session } = await getCurrentSession();
  if (!session) {
    throw new Error("No session found");
  }
  await invalidateSession(session.id);
  deleteSessionTokenCookie();

  return redirect("/signin");
}
