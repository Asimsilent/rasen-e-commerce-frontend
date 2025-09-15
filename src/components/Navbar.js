"use client";

import Link from "next/link";
import { useSelector } from "react-redux";

export default function Navbar() {
  const user = useSelector((state) => state.auth.user);

  return (
    <nav className="bg-blue-500 shadow p-4 mb-6">
      <div className="container mx-auto flex justify-between">
        <Link href="/" className="font-bold text-xl">
          My Store
        </Link>
        <div className="space-x-4">
          <Link href="/products" className=" hover:text-gray-300">
            Products
          </Link>
          {user ? (
            <Link href="/cart" className=" hover:text-gray-300">
              Cart
            </Link>
          ) : (
            <Link href="/login" className=" hover:text-gray-300">
              Cart
            </Link>
          )}
          <Link href="/login" className=" hover:text-gray-300">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
