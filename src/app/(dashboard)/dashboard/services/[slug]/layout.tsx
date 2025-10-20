import { ServiceRequestProvider } from "@/context/ServiceRequestContext";

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ServiceRequestProvider>{children}</ServiceRequestProvider>;
}
