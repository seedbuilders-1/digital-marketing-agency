import { ServiceRequestProvider } from "@/context/ServiceRequestContext";

export default function RequestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ServiceRequestProvider>{children}</ServiceRequestProvider>;
}
