'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 border-t pt-6 pb-4 text-center text-sm text-gray-600">
      <p className="mb-2">© {new Date().getFullYear()} Anshul Tiwari</p>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6 text-indigo-600 font-medium">
        <Link
          href="https://anshul-tiwari-portfolio.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Portfolio
        </Link>

        <Link
          href="https://github.com/anshultiwari95/Product-Showcase-Frontend"
          target="_blank"
          rel="noopener noreferrer"
        >
          Frontend GitHub
        </Link>

        <Link
          href="https://github.com/anshultiwari95/Product-Showcase-Backend"
          target="_blank"
          rel="noopener noreferrer"
        >
          Backend GitHub
        </Link>

        <Link
          href="https://www.linkedin.com/in/tiwari-anshul12"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </Link>
      </div>
    </footer>
  );
}
