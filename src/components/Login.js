"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { closeModal } from "@/store/modalSlice";
import { loginUser } from "@/store/authSlice";

export default function LoginForm() {
  const { loading } = useSelector((state) => state.auth);

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
      dispatch(closeModal());
      router.push("./products");
      toast.success("successfually login!");
    } else {
      console.error("Login failed:", resultAction.payload);
      toast.error("login failed!");
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
        disabled={loading}
        className="flex-1 px-3 py-2 rounded-lg text-gray-700 placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 "
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
        disabled={loading}
        className="flex-1 px-3 py-2 rounded-lg text-gray-700 placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 "
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "wait for login..." : "Log In"}
      </button>
    </form>
  );
}
