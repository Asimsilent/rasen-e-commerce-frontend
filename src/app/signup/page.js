"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { signupUser } from "@/store/authSlice";

export default function SignupPage() {
  const dispatch = useDispatch();
  const router = useRouter();

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
    // console.log(resultAction);
    // console.dir(signupUser);

    if (signupUser.fulfilled.match(resultAction)) {
      router.push("/products");
      toast.success("Account created!");
    }
  }

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   try {
  //     const data = await axios.post(
  //       "http://localhost:5000/user/create",
  //       formData
  //     );
  //     console.log(data);

  //     dispatch(signup(formData));
  //     router.push("/products");
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // }
  // finally {
  //   setFormData({
  //     firstName: "",
  //     lastName: "",
  //     email: "",
  //     password: "",
  //   });
  // }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="firstname"
        required
        // autoComplete="given-name"
        className="flex-1 px-3 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="lastname"
        required
        // autoComplete="family-name"
        className="flex-1 px-3 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="email"
        required
        // autoComplete="email"
        className="flex-1 px-3 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="********"
        required
        autoComplete="new-password"
        className="flex-1 px-3 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition delay-150 duration-300 hover:scale-110 hover:-translate-y-1"
      >
        Register
      </button>
    </form>
  );
}
