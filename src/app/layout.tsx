import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import StringBackground from "@/components/background";
import { Progress } from "@/components/ui/progress"
import { Toaster } from "@/components/ui/sonner"
export const metadata: Metadata = {
  title: "TripleWin",
  description: "This is TripleWin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
      <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <StringBackground />
      </div>
      <div className="relative z-10">
      <Header />
      {children}
      <Toaster />
        </div>
      </div>

      </body>
    </html>
  );
}
