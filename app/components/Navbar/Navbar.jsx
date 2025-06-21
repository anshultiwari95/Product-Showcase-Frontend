'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white text-text px-8 py-4 shadow-md flex justify-between items-center">
      <div className="text-2xl font-bold text-accent tracking-wide"><Link href='/'>MyStore</Link></div>
      <ul className="flex gap-8 font-medium text-gray-700">
        <li><Link href="/" className="hover:text-accent transition">Home</Link></li>
        <li><Link href="/" className="hover:text-accent transition">Products</Link></li>
        <li><Link href="/" className="hover:text-accent transition">About</Link></li>
      </ul>
    </nav>
  );
}
