import { z } from "zod";

const requiredInput = z.string().trim().min(1, "Required");
const emailValidator = requiredInput.email("Invalid email");
const usernameValidator = requiredInput.regex(
  /^[a-zA-Z0-9_]+$/,
  "Only letters, numbers, and underscores",
);
const passwordValidator = requiredInput.min(
  8,
  "Password must be at least 8 characters",
);

const usernameOrEmailValidator = z.union([emailValidator, usernameValidator]);

export const signUpSchema = z.object({
  email: emailValidator,
  username: usernameValidator,
  password: passwordValidator,
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  usernameOrEmail: usernameOrEmailValidator,
  password: passwordValidator,
});

export type SignInValues = z.infer<typeof signInSchema>;
