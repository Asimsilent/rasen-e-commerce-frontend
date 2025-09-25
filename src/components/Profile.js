"use client";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProfileBadge() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className="flex items-center gap-3 bg-blue-500 p-2 rounded-lg shadow">
      {/* Profile circle */}
      <div className="relative w-10 h-10">
        <Image
          src="/solo6.jpg"
          alt="Profile"
          fill
          className="rounded-full object-cover border-2 border-gray-300"
        />
      </div>

      {/* Username */}
      <span className="text-sm font-medium text-gray-700">
        {user.firstName}
      </span>

      {/* Logout button */}
      <button
        onClick={() => {
          dispatch(logout());
          router.push("/signup");
        }}
        className="ml-auto px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
}
