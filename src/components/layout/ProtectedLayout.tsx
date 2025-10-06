import { selectAccessToken } from "@/features/auth/selectors";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const accessToken = useSelector(selectAccessToken);

  if (!accessToken) {
    redirect("/login");
  }

  return <>{children}</>;
}
