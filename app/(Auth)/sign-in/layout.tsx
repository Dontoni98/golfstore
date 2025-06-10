import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { KeycloakProvider } from "../sign-in/provider/KeycloakProvider"; // Adjust path as needed

import type React from "react";

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
    <html lang="en">
      <body className={inter.className}>
        <KeycloakProvider>
          <main>{children}</main>
        </KeycloakProvider>
      </body>
    </html>
  );
}
