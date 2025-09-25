import { useDispatch } from "react-redux";

const { openModal } = require("@/store/modalSlice");
const { default: Link } = require("next/link");

export default function GuestLinks() {
  const dispatch = useDispatch();

  return (
    <>
      <Link href="/signup" className="hover:text-gray-300">
        Sign Up
      </Link>
      <Link
        href="/login"
        onClick={(e) => {
          e.preventDefault();
          dispatch(openModal({ title: "login" }));
        }}
        className="hover:text-gray-300"
      >
        Log In
      </Link>
    </>
  );
}
