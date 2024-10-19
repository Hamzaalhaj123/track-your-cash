import { getCurrentSession } from "@/actions/auth/getCurrentSession";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {const {user} = await getCurrentSession()
  if(user){
    redirect("/")
  }
  return (
    <div className="flex h-screen items-center justify-center">
      {children}</div>
  );
}
