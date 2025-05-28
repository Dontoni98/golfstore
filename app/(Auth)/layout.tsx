import type { Metadata } from 'next';
import type React from 'react'; // Added import for React

export const metadata: Metadata = {
  title: 'NavBar with Sticky Search',
  description: 'A demo of a navigation bar with a sticky search component',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
