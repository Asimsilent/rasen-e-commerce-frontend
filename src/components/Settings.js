"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
// import { Settings, X } from "lucide-react";

export default function SettingsDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className=" w-9 h-9 flex items-center bg-blue-600  hover:scale-110 hover:bg-blue-700 rounded-full"
      >
        <Image
          src="/setting1.png"
          alt="setting"
          fill
          className="object-cover"
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded-lg shadow-lg z-50">
          <div className="flex justify-between items-center px-4 py-2 border-b">
            <span className="font-semibold">Settings</span>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-gray-800"
            >
              X
            </button>
          </div>

          <ul className="flex flex-col">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Edit Profile
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Edit Email
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Edit Password
            </li>
            <li className="px-4 py-2 text-red-600 hover:bg-red-100 cursor-pointer">
              Delete Account
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
