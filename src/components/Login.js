"use client";

import { loginUser } from "@/store/authSlice";
import { closeModal } from "@/store/modalSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const resultAction = await dispatch(loginUser(formData));
    if (loginUser.fulfilled.match(resultAction)) {
      dispatch(closeModal()); // close modal after success
      router.push("./products");
    } else {
      console.error("Login failed:", resultAction.payload);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="email"
        required
        className="flex-1 px-3 py-2 rounded-lg text-gray-700 placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 "

        // className="border px-3 py-2 rounded"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
        className="flex-1 px-3 py-2 rounded-lg text-gray-700 placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 "

        // className="border px-3 py-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Log In
      </button>
    </form>
  );
}
