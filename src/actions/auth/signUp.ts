"use server";
import { hash } from "@node-rs/argon2";

import { createSession } from "@/actions/auth/createSession";
import { generateSessionToken } from "@/actions/auth/generateSessionToken";
import { setSessionTokenCookie } from "@/actions/auth/setSessionTokenCookie";
import { db } from "@/db/db";
import { userTable } from "@/db/schemas/userTable";
import { verificationCodeTable } from "@/db/schemas/verificationCodeTable";
import { signUpSchema, SignUpValues } from "@/validators/authValidator";
import { eq, or } from "drizzle-orm";
import { isRedirectError, redirect } from "next/dist/client/components/redirect";

export async function signUp(credentials: SignUpValues) {
  let isError = false;

  try {
    const { email, username, password } = signUpSchema.parse(credentials);
    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });
    console.log("passwordHash", passwordHash);

    const existingUser = await db
      .select()
      .from(userTable)
      .where(or(eq(userTable.email, email), eq(userTable.name, username)));

    console.log("existing user", existingUser);

    if (existingUser.length)
      throw new Error("username_or_email_already_exists");
    const insertedUser = await db
      .insert(userTable)
      .values({
        email,
        name: username,
        password: passwordHash,
      })
      .returning()
      .then((res) => res[0]);

    console.log("ID IS  ", insertedUser.id);

    const verificationCode = await db
      .insert(verificationCodeTable)
      .values({
        id: insertedUser.id,
      })
      .returning();
    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, insertedUser.id);
    setSessionTokenCookie(sessionToken, session.expiresAt);
  } catch (error) {
    isError = true;
    if (isRedirectError(error)) throw new Error("redirect error");
    console.error(error);
    throw error;
  } finally {
    if (isError === false) return redirect("/signup");
  }
}
