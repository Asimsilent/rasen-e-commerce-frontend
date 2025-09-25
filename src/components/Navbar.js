"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import SettingsDropdown from "./Settings";
import ProfileBadge from "./Profile";
import GuestLinks from "./GuestLinks";

export default function Navbar() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <nav className="bg-blue-500 shadow p-4 mb-6">
      <div className="container mx-auto flex justify-around items-center">
        <Link href="/" className="font-bold text-xl">
          My Store
        </Link>
        <div className="space-x-4">
          <Link href="/products" className=" hover:text-gray-300">
            Products
          </Link>

          <Link
            href={isAuthenticated ? "/cart" : "/signup"}
            className=" hover:text-gray-300"
          >
            Cart
          </Link>

          {!isAuthenticated && <GuestLinks />}
        </div>

        {isAuthenticated && (
          <div className="flex items-center gap-4">
            <ProfileBadge />
            <SettingsDropdown />
          </div>
        )}
      </div>
    </nav>
  );
}
