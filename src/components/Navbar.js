"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
// import SettingsDropdown from "./Settings";
import ProfileBadge from "./Profile";
import GuestLinks from "./GuestLinks";
import Image from "next/image";

export default function Navbar() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <nav className="bg-blue-500 shadow-md">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-3">
        <Link
          href="/products"
          className="font-bold text-2xl text-white mb-2 sm:mb-0"
        >
          <div className="relative w-12 h-12 flex-shrink-0">
            <Image
              src="/seal.webp"
              alt="Profile"
              fill
              className=" object-contain "
            />
          </div>
        </Link>

        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-white">
          <Link
            href="/products"
            className="hover:text-gray-200 transition-colors duration-200"
          >
            Products
          </Link>

          <Link
            href={isAuthenticated ? "/cart" : "/signup"}
            className="hover:text-gray-200 transition-colors duration-200"
          >
            Cart
          </Link>

          {!isAuthenticated && <GuestLinks />}
        </div>

        {isAuthenticated && (
          <div className="mt-2 sm:mt-0">
            <ProfileBadge />
          </div>
        )}
      </div>
    </nav>
  );
}
