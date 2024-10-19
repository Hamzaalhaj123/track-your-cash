import { getCurrentSession } from "@/actions/auth/getCurrentSession";
import SignInForm from "@/components/auth/SignInForm";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const { user } = await getCurrentSession();
  if (user) {
    redirect("/");
  }
  return <SignInForm />;
}
