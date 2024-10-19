import { getCurrentSession } from "@/actions/auth/getCurrentSession";
import SignUpForm from "@/components/auth/SignUpForm";

export default async function SignupPage() {
  const { user } = await getCurrentSession();
  // if (user) {
  //   redirect("/");
  // }
  return <SignUpForm />;
}
