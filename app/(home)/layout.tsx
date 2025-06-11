import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react"; // Added import for React
import ScrollToTopButton from "@/components/ScrollToTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Køllegutta",
  description: "work in progress",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Navbar />
      <div className="mt-20">{children}</div>
      <ScrollToTopButton /> {/* Skal vises på alle "sider" */}
    </main>
  );
}
