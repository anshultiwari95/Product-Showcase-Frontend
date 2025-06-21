"use client";

import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar/Navbar.jsx";
import "./globals.css";
import Footer from "./components/Footer/Footer.jsx";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <AnimatePresence mode="wait">
          <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
        </AnimatePresence>
      </body>
      <Footer/>
    </html>
  );
}
