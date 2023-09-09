import React from "react";
import { BsPatchExclamationFill } from "react-icons/bs";
import { useAppContext } from "./context/store";
import { Link } from "react-router-dom";

function NotFound() {
  const { dark } = useAppContext();
  return (
    <div className="min-h-screen">
      <div className="min-h-screen flex flex-col items-center">
        <div className="flex flex-col items-center  my-auto">
          <BsPatchExclamationFill className="text-5xl mb-5" />
          <p className="text-3xl font-semibold mb-5">Page Not Found</p>
          <Link to={"/"}>
            <button
              className={
                dark
                  ? "bg-gray-600 px-4 py-1 rounded-lg"
                  : "bg-gray-200 px-4 py-1 rounded-lg"
              }
            >
              Go Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
