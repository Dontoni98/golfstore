import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { KeycloakProvider } from '../sign-in/provider/KeycloakProvider'; // Juster path
import type React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NavBar with Sticky Search',
  description: 'A demo of a navigation bar with a sticky search component',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <KeycloakProvider>
      <main className={inter.className}>{children}</main>
    </KeycloakProvider>
  );
}
