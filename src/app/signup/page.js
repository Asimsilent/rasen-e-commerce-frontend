"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { signupUser } from "@/store/authSlice";

export default function SignupPage() {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  // console.log(auth);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const resultAction = await dispatch(signupUser(formData));
    console.log("resultAction", resultAction);
    console.dir("signupUser", signupUser);

    if (signupUser.fulfilled.match(resultAction)) {
      router.push("/products");
      toast.success("Account created!");
    } else {
      toast.error("sign up failed");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto p-6 flex flex-col gap-6
             bg-gray-900 rounded-2xl shadow-xl
             sm:p-8 md:p-10"
    >
      <h2 className="text-2xl font-bold text-white text-center mb-2">
        Sign Up Here
      </h2>
      <p className="text-gray-400 text-center text-sm">
        Create your account to get started
      </p>

      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First Name"
        required
        disabled={loading}
        className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700
               focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last Name"
        required
        disabled={loading}
        className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700
               focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
        disabled={loading}
        className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700
               focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="********"
        required
        disabled={loading}
        autoComplete="new-password"
        className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700
               focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      <button
        disabled={loading}
        type="submit"
        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg
               hover:bg-blue-800 transition transform duration-300 hover:scale-105 hover:-translate-y-1 font-semibold"
      >
        {loading ? "Signing up, please wait..." : "Register"}
      </button>
    </form>
  );
}
