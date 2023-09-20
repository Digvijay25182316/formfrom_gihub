import React from "react";
import { Link } from "react-router-dom";
import {
  PiArrowFatLinesLeftFill,
  PiArrowFatLinesRightFill,
} from "react-icons/pi";
import { useAppContext } from "../context/store";

function Pagination({ length }) {
  const { dark } = useAppContext();
  return (
    <div className="flex items-center justify-center mt-10 mb-5">
      <div
        className={`mr-20 ${
          dark ? "bg-gray-700" : "bg-gray-200"
        } flex gap-3 px-4 italic text-gray-400 rounded-full`}
      >
        Total <p className="text-purple-400">{length.toString()}</p> enrollments
      </div>
      <div className="flex items-center gap-3 justify-center">
        <Link to={"/admin/dashboard"}>
          <button
            className={`p-2 rounded-full text-xl ${
              dark ? "bg-gray-700" : "bg-gray-200"
            }`}
          >
            <PiArrowFatLinesLeftFill />
          </button>
        </Link>
        <Link to={"/admin/dashboard/page2"}>
          <button
            className={`p-2 rounded-full text-xl ${
              dark ? `bg-gray-700` : "bg-gray-200"
            }`}
          >
            <PiArrowFatLinesRightFill />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Pagination;
