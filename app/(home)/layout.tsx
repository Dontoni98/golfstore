import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import type { Metadata } from 'next';
import type React from 'react'; // Added import for React

export const metadata: Metadata = {
  title: 'NavBar with Sticky Search',
  description: 'A demo of a navigation bar with a sticky search component',
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='w-full bg-gray-100 text-gray-900 h-screen'>
      <Navbar />
      <div className='mt-20 container mx-auto h-full'>{children}</div>
      <Footer />
    </main>
  );
}
