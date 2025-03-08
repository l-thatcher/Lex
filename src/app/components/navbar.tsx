"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-900"
          : "bg-gradient-to-b from-gray-900 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="text-teal-400 font-bold text-2xl">
              Lex
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/tvshows">TV Shows</NavLink>
              <NavLink href="/films">Films</NavLink>
              <NavLink href="/mylist">My List</NavLink>
            </div>
          </div>
          <div className="flex items-center">
            <button className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-full transition">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition"
    >
      {children}
    </Link>
  );
};

export default Navbar;
