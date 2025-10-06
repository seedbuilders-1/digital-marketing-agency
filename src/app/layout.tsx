import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "@/components/ReduxProvider";
import { Toaster } from "sonner";
import { SocketProvider } from "@/context/SocketProvider";

export const metadata: Metadata = {
  title: "Digital Marketing Agency",
  description: "Digital Marketing Agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <SocketProvider>{children}</SocketProvider>
        </ReduxProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
