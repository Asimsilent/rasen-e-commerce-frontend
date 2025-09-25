"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { presistedAuth } from "@/store/authSlice";

export default function AuthInitializer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(presistedAuth());
  }, [dispatch]);

  return <>{children}</>;
}
